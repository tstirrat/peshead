// tslint:disable:no-console
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { addPlayer, createClient, removePlayer } from './search';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

enum IndexingState {
  INDEXING = 'INDEXING',
  INDEXED = 'INDEXED',
  ERROR = 'ERROR'
}

/** Checks for changes to players and updates/removes the search index entry */
export const updatePlayerIndex = functions.firestore
  .document('players/{id}')
  .onWrite(async event => {
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
      indexError: admin.firestore.FieldValue.delete()
    });
    try {
      await addPlayer(client, playerId, player);
      await event.data.ref.update({ indexState: IndexingState.INDEXED });
      console.log('[index] indexing complete', playerId);
    } catch (e) {
      console.error('[index] indexing error', e);
      return event.data.ref.update({
        indexState: IndexingState.ERROR,
        indexError: e.message
      });
    }
    return;
  });
