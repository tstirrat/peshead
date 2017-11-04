import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import {addPlayer, createClient, removePlayer, search} from './search';
import {API, GetPlayerRequest, Player} from './service/api';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// API

exports.getPlayer = functions.https.onRequest(async (request, response) => {
  const api = API.create((method, request, callback) => {
    callback(null, new Uint8Array([]));
  });
  const playerId = '811';  // TODO: get this from url params
  const req = GetPlayerRequest.create({playerId});
  api.getPlayer(req, () => console.log('getPlayer rpc callback'));

  const snapshot = await db.collection('players').doc(playerId).get();
  const player = snapshot.data();
  console.log('got player from db:', player);

  const rpcPlayer = Player.create({
    id: playerId,
  });
  console.log('created rpc player', rpcPlayer.toJSON());
  response.send(JSON.stringify(player, null, 2));
});

// SEARCH

enum IndexingState {
  INDEXING = 'INDEXING',
  INDEXED = 'INDEXED',
  ERROR = 'ERROR',
}

/** Checks for changes to players and updates/removes the search index entry */
exports.updatePlayerIndex =
    functions.firestore.document('players/{id}').onWrite(async (event) => {
      const player = event.data.data();
      const playerId: string = event.params!.id;
      const client = createClient(functions.config().es);

      // removal
      if (player === null) {
        console.log('[search] removing player', playerId);
        return await removePlayer(client, playerId);
      }

      // prevent infinite loop
      if (player.indexState) {
        console.info('[search] player already indexed/indexing', playerId);
        return;
      }

      // add to index
      console.log('[search] indexing player', playerId);
      await event.data.ref.update({indexState: IndexingState.INDEXING});
      try {
        await addPlayer(client, playerId, player);
        await event.data.ref.update({indexState: IndexingState.INDEXED});
        console.log('[search] indexing complete', playerId);
      } catch (e) {
        console.error('[search] indexing error', e);
        return event.data.ref.update({
          indexState: IndexingState.ERROR,
          indexError: e.message,
        });
      }
      return;
    });

/** Perform a search, mounted at /api/v1/search */
exports.search = functions.https.onRequest(async (req, res) => {
  const query: string = req.query.query;
  if (query) {
    try {
      console.log('[search] searching:', query);
      const client = createClient(functions.config().es);
      const response = await search(client, query);
      console.log('[search] search complete', response);
      return res.send(response);
    } catch (e) {
      return res.status(400).send(e);
    }
  }
  console.warn('[search] search with empty query');
  return res.send({});
});
