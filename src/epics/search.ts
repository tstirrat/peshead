import { SearchResponse } from 'elasticsearch';
import { stringify } from 'query-string';
import { Action } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { of as obs } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as search from '../actions/search';
import { EpicDependencies } from '../epics';
import { State as GlobalState } from '../reducers';
import { IPlayer } from '../shared/service/api';

export const search$: Epic<Action, GlobalState, EpicDependencies> = (
  action$,
  store,
  deps
) =>
  action$.ofType(search.SEARCH).pipe(
    switchMap((action: search.SearchRequestAction) => {
      const { query, id, sortDirection, sortField } = action.payload;
      if (query === undefined) {
        const err = new Error(
          `Tried to search with undefined 'query', did you mean ''?`
        );
        return obs(search.searchError(err));
      }
      const params = stringify({
        query,
        sortDirection,
        sortField
      });
      const url = `${process.env.REACT_APP_API_ROOT}/search?${params}`;
      return deps.fetch<SearchResponse<IPlayer>>(url).pipe(
        map(res =>
          res.hits.hits.map(hit => {
            const player = hit._source;
            player.id = hit._id;
            return player;
          })
        ),
        map(players => search.searchSuccess(players, id)),
        catchError(err => obs(search.searchError(err, id)))
      );
    })
  );

export const epics = combineEpics(search$);
