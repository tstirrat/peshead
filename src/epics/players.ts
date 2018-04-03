import { Action } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { of as obs } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { concatMap } from 'rxjs/operators/concatMap';
import { map } from 'rxjs/operators/map';

import * as players from '../actions/players';
import { EpicDependencies } from '../epics';
import { State as GlobalState } from '../reducers';
import { assert } from '../shared/assert';
import { IPlayer } from '../shared/service/api';

export const getPlayers: Epic<Action, GlobalState, EpicDependencies> = (
  action$,
  store,
  deps
) =>
  action$.ofType(players.GET_PLAYERS).pipe(
    concatMap((action: players.GetPlayersAction) => {
      const { limit } = action.payload; // TODO: sorting
      const db = deps.firebaseApp.firestore();
      return db
        .collection('players')
        .limit(limit)
        .get()
        .then(snapshot => snapshot.docs.map(p => p.data() as IPlayer))
        .then(results => players.getPlayersSuccess(results))
        .catch(error => players.getPlayersError(error));
    })
  );

export const getPlayer: Epic<Action, GlobalState, EpicDependencies> = (
  action$,
  store,
  deps
) =>
  action$.ofType(players.GET_PLAYER).pipe(
    concatMap((action: players.GetPlayerAction) => {
      const id = assert(action.payload, 'Player id should be supplied');
      const url = `${process.env.REACT_APP_API_ROOT}/api/players/${id}`;
      return ajax
        .getJSON<IPlayer>(url)
        .pipe(
          map(player => players.getPlayerSuccess(player)),
          catchError(err => obs(players.getPlayerError(err)))
        );
    })
  );

export const epics = combineEpics(getPlayers, getPlayer);
