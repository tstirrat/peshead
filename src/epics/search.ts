import {SearchResponse} from 'elasticsearch';
import {Action} from 'redux';
import {combineEpics, Epic} from 'redux-observable';
import {ajax} from 'rxjs/observable/dom/ajax';
import {empty} from 'rxjs/observable/empty';
import {of } from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {switchMap} from 'rxjs/operators/switchMap';

import * as search from '../actions/search';
import {EpicDependencies} from '../epics';
import {State as GlobalState} from '../reducers';
import {Player} from '../shared/service/api';

export const search$: Epic<Action, GlobalState, EpicDependencies> =
    (action$, store, deps) =>
        action$.ofType(search.SEARCH_REQUEST)
            .pipe(switchMap((action: search.SearchRequestAction) => {
              const {query} = action.payload;
              if (!query) {
                return empty();
              }
              const url = `${process.env.REACT_APP_API_ROOT}/search`;
              return ajax
                  .getJSON<SearchResponse<Player>>(
                      `${url}?query=${encodeURIComponent(query)}`)
                  .pipe(
                      map(res => res.hits.hits.map(hit => {
                        // Search results strip the player.id and
                        // surface it in hit._id
                        return {
                          ...hit._source,
                          id: hit._id,
                        } as Player;
                      })),
                      map(players => search.searchSuccess(players)),
                      catchError(err => of (search.searchError(err))));
            }));

export const epics = combineEpics(search$);
