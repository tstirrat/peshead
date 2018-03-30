import { Action } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { concatMap } from 'rxjs/operators/concatMap';

import * as players from '../actions/players';
import { EpicDependencies } from '../epics';
import { State as GlobalState } from '../reducers';
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
      const id = action.payload;
      const db = deps.firebaseApp.firestore();
      return db
        .doc(`players/${id}`)
        .get()
        .then(snapshot => snapshot.data() as IPlayer)
        .then(player => players.getPlayerSuccess(player))
        .catch(error => players.getPlayerError({ id, error }));
    })
  );

export const epics = combineEpics(getPlayers, getPlayer);
