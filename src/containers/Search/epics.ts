import {firestore} from 'firebase';
import {Epic} from 'redux-observable';
import {switchMap} from 'rxjs/operators/switchMap';

import {EpicDependencies} from '../../epics';
import {State as GlobalState} from '../../reducers';
import {Player} from '../../shared/service/api';

import * as search from './actions';

export const doSearch: Epic<search.Actions, GlobalState, EpicDependencies> =
    (action$, store, deps) =>
        action$.ofType(search.SEARCH_REQUEST)
            .pipe(switchMap((action: search.SearchRequestAction) => {
              const app = deps.firebaseApp;
              const db: firestore.Firestore =
                  (app as any).firestore();  // TODO: fix when d.ts is fixed
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
