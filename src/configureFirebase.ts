import 'firebase/firestore'; // required for side-effects

import * as firebase from 'firebase';

export function configureFirebase() {
  // TODO: use firebase hosting config implicit init here.
  return firebase.initializeApp({
    apiKey: 'AIzaSyDsbhqBkiHxAjJfrlhXtZhBoUjjbYdDc9g',
    authDomain: 'pesleagues-dev.firebaseapp.com',
    projectId: 'pesleagues-dev',
    storageBucket: 'pesleagues-dev.appspot.com',
    messagingSenderId: '483322023704'
  });
}
