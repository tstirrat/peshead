import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import {API, GetPlayerRequest, Player} from './service/api';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

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
