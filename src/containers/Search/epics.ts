import 'firebase/firestore'; // required for side-effects

import * as firebase from 'firebase';
import {ActionsObservable, Epic} from 'redux-observable';
import {map} from 'rxjs/operators/map';
import {switchMap} from 'rxjs/operators/switchMap';

import {Player} from '../../../functions/service/api';
import {State as GlobalState} from '../../reducers';

import * as search from './actions';

firebase.initializeApp({
  apiKey: 'AIzaSyDsbhqBkiHxAjJfrlhXtZhBoUjjbYdDc9g',
  authDomain: 'pesleagues-dev.firebaseapp.com',
  projectId: 'pesleagues-dev',
});

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

// Epic<search.SearchRequestAction, GlobalState>
export const doSearch =
    (action$: ActionsObservable<search.SearchRequestAction>) =>
        action$.ofType(search.SEARCH_REQUEST)
            .pipe(switchMap((action: search.SearchRequestAction) => {
              // const {term} = action.payload;
              return db.collection('players')
                  .get()
                  .then(
                      snapshot =>
                          snapshot.docs.map(d => Player.create(d).toJSON()))
                  .then(players => new search.SearchSuccessAction({
                    results: players,
                  }))
                  .catch(err => new search.SearchErrorAction(err));

            }));
