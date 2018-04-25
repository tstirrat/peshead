import { Action } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { of as obs } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import * as players from '../actions/players';
import { EpicDependencies } from '../epics';
import { State as GlobalState } from '../reducers';
import { assert } from '../shared/assert';
import { IPlayer } from '../shared/service/api';

export const getPlayer: Epic<Action, GlobalState, EpicDependencies> = (
  action$,
  store,
  deps
) =>
  action$.ofType(players.GET_PLAYER).pipe(
    concatMap((action: players.GetPlayerAction) => {
      const id = assert(action.payload, 'Player id should be supplied');
      const url = `${process.env.REACT_APP_API_ROOT}/players/${id}`;
      return deps
        .fetch<IPlayer>(url)
        .pipe(
          map(player => players.getPlayerSuccess(player)),
          catchError(err => obs(players.getPlayerError(id, err)))
        );
    })
  );

export const epics = combineEpics(getPlayer);
