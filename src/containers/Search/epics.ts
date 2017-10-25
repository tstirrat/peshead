import 'firebase/firestore'; // required for side-effects

import * as firebase from 'firebase';
import {Epic} from 'redux-observable';
import {switchMap} from 'rxjs/operators/switchMap';

import {State as GlobalState} from '../../reducers';
import {Player} from '../../shared/service/api';

import * as search from './actions';

firebase.initializeApp({
  apiKey: 'AIzaSyDsbhqBkiHxAjJfrlhXtZhBoUjjbYdDc9g',
  authDomain: 'pesleagues-dev.firebaseapp.com',
  projectId: 'pesleagues-dev',
});

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

export const doSearch: Epic<search.Actions, GlobalState> = action$ =>
    action$.ofType(search.SEARCH_REQUEST)
        .pipe(switchMap((action: search.SearchRequestAction) => {
          // const {term} = action.payload;
          return db.collection('players')
              .get()
              .then(snapshot => snapshot.docs)
              .then(docs => docs.map(d => Player.create(d).toJSON()))
              .then(players => new search.SearchSuccessAction({
                results: players,
              }))
              .catch(err => new search.SearchErrorAction(err));
        }));
