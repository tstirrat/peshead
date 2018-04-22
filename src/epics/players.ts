import fetch from 'observable-fetch';
import { Action } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { of as obs } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { concatMap } from 'rxjs/operators/concatMap';
import { map } from 'rxjs/operators/map';

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
      return fetch<IPlayer>(url).pipe(
        map(player => players.getPlayerSuccess(player)),
        catchError(err => obs(players.getPlayerError(id, err)))
      );
    })
  );

export const epics = combineEpics(getPlayer);
