import {firestore} from 'firebase';
import {Epic} from 'redux-observable';
import {switchMap} from 'rxjs/operators/switchMap';

import * as search from '../actions/search';
import {EpicDependencies} from '../epics';
import {State as GlobalState} from '../reducers/search';
import {Player} from '../shared/service/api';

export const doSearch: Epic<search.Actions, GlobalState, EpicDependencies> =
    (action$, store, deps) =>
        action$.ofType(search.SEARCH_REQUEST)
            .pipe(switchMap((action: search.SearchRequestAction) => {
              const app = deps.firebaseApp;
              const db: firestore.Firestore =
                  // tslint:disable-next-line: no-any
                  (app as any).firestore();  // TODO: fix when d.ts is fixed
              // const {term} = action.payload;
              return db.collection('players')
                  .get()
                  .then(snapshot => snapshot.docs)
                  .then(docs => docs.map(d => d.data() as Player))
                  .then(results => new search.SearchSuccessAction({results}))
                  .catch(err => new search.SearchErrorAction(err));
            }));
