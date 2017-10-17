import * as functions from 'firebase-functions';

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});
