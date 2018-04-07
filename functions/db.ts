import { firestore } from 'firebase-admin';
import * as functions from 'firebase-functions';

import { addPlayer, createClient, removePlayer } from './elasticsearch';
import { IPlayer } from './shared/service/api';

enum IndexingState {
  INDEXING = 'INDEXING',
  INDEXED = 'INDEXED',
  ERROR = 'ERROR'
}

/** Checks for changes to players and updates/removes the search index entry */
export const updatePlayerIndex = functions.firestore
  .document('/players/{id}')
  .onWrite(async (change, context) => {
    const playerId: string = context!.params.id;
    const client = createClient(functions.config().es);

    // removal
    if (!change.after.exists) {
      console.log('[index] removing player', playerId);
      return await removePlayer(client, playerId);
    }

    const player = change.after.data() as IPlayer;

    // prevent infinite loop
    if (player.indexState) {
      console.info('[index] player already indexed/indexing', playerId);
      return;
    }

    // add to index
    console.log('[index] indexing player', playerId);
    await change.after.ref.update({
      indexState: IndexingState.INDEXING,
      indexError: firestore.FieldValue.delete()
    });
    try {
      await addPlayer(client, playerId, player);
      await change.after.ref.update({ indexState: IndexingState.INDEXED });
      console.log('[index] indexing complete', playerId);
    } catch (e) {
      console.error('[index] indexing error', e);
      return change.after.ref.update({
        indexState: IndexingState.ERROR,
        indexError: e.message
      });
    }
    return;
  });
