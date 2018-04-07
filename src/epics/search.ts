import { SearchResponse } from 'elasticsearch';
import { Action } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { empty } from 'rxjs/observable/empty';
import { of as obs } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';

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
      const { query, id } = action.payload;
      if (!query) {
        return empty();
      }
      const url = `${process.env.REACT_APP_API_ROOT}/search`;
      return ajax
        .getJSON<SearchResponse<IPlayer>>(
          `${url}?query=${encodeURIComponent(query)}`
        )
        .pipe(
          map(res =>
            res.hits.hits.map(hit => {
              const player = hit._source;
              player.id = hit._id;
              return player;
            })
          ),
          map(players => search.searchSuccess(players, id)),
          catchError(err => obs(search.searchError(err)))
        );
    })
  );

export const epics = combineEpics(search$);
