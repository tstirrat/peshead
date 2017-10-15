import * as functions from 'firebase-functions';

import './test/convert';

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});
