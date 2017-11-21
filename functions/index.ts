import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import {addPlayer, createClient, removePlayer, search, suggest} from './search';
import {API, GetPlayerRequest, Player} from './service/api';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// TODO: make this into reusable middleware
const CORS_HEADERS_DEV = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Headers': 'X-Requested-With'
};

const CORS_HEADERS =
    process.env.NODE_ENV === 'production' ? {} : CORS_HEADERS_DEV;

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
  response.set(CORS_HEADERS).send(JSON.stringify(player, null, 2));
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
      if (event.data === null) {
        console.log('[index] removing player', playerId);
        return await removePlayer(client, playerId);
      }

      // prevent infinite loop
      if (player.indexState) {
        console.info('[index] player already indexed/indexing', playerId);
        return;
      }

      // add to index
      console.log('[index] indexing player', playerId);
      await event.data.ref.update({
        indexState: IndexingState.INDEXING,
        indexError: admin.firestore.FieldValue.delete(),
      });
      try {
        await addPlayer(client, playerId, player);
        await event.data.ref.update({indexState: IndexingState.INDEXED});
        console.log('[index] indexing complete', playerId);
      } catch (e) {
        console.error('[index] indexing error', e);
        return event.data.ref.update({
          indexState: IndexingState.ERROR,
          indexError: e.message,
        });
      }
      return;
    });

/** Perform a search, mounted at /api/v1/search */
exports.search = functions.https.onRequest(async (req, res) => {
  if (req.method === 'OPTIONS') {
    return res.set(CORS_HEADERS).send('');
  }
  const query: string = req.query.query;
  if (query) {
    try {
      console.log('[search] searching:', query);
      const client = createClient(functions.config().es);
      const response = await search(client, query);
      console.log('[search] search complete', response);
      console.log('updated with cors');
      return res.set(CORS_HEADERS).send(response);
    } catch (e) {
      console.warn('[search] search failed with', e);
      return res.set(CORS_HEADERS).status(400).send(e);
    }
  }
  console.warn('[search] search with empty query');
  return res.set(CORS_HEADERS)
      .status(400)
      .send(new Error('Must supply query params'));
});

/** Autocomplete suggest based on name or kitName, returns minimal fields. */
exports.suggest = functions.https.onRequest(async (req, res) => {
  if (req.method === 'OPTIONS') {
    return res.set(CORS_HEADERS).send('');
  }
  const query: string = req.query.query;
  if (query) {
    try {
      console.log('[suggest] suggesting:', query);
      const client = createClient(functions.config().es);
      const response = await suggest(client, query);
      console.log('[suggest] suggest complete', response);
      console.log('updated with cors');
      return res.set(CORS_HEADERS).send(response);
    } catch (e) {
      console.warn('[suggest] suggest failed with', e);
      return res.set(CORS_HEADERS).status(400).send(e);
    }
  }
  console.warn('[suggest] suggest with empty query');
  return res.set(CORS_HEADERS)
      .status(400)
      .send(new Error('Must supply query params'));
});
