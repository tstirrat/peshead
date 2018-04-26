import * as functions from 'firebase-functions';

import { createClient, removePlayer } from './elasticsearch';

/** Checks for deleted players and updates/removes the search index entry */
export const removePlayerIndex = functions.firestore
  .document('/players/{id}')
  .onDelete(async (change, context) => {
    const playerId: string = context!.params.id;
    const client = createClient(functions.config().es);

    console.log('[index] removing player', playerId);
    return await removePlayer(client, playerId);
  });
