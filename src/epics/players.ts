import {firestore} from 'firebase';
import {Action} from 'redux';
import {combineEpics, Epic} from 'redux-observable';
import {concatMap} from 'rxjs/operators/concatMap';

import * as players from '../actions/players';
import {EpicDependencies} from '../epics';
import {State as GlobalState} from '../reducers';
import {Player} from '../shared/service/api';

export const getPlayers: Epic<Action, GlobalState, EpicDependencies> =
    (action$, store, deps) =>
        action$.ofType(players.GET_PLAYERS)
            .pipe(concatMap((action: players.GetPlayersAction) => {
              const {limit} = action.payload;  // TODO: sorting
              const db: firestore.Firestore =
                  // tslint:disable-next-line:no-any
                  (deps.firebaseApp as any)  // firebase/firebase-js-sdk#264
                      .firestore();
              return db.collection('players')
                  .limit(limit)
                  .get()
                  .then(snapshot => {
                    const results: Player[] = [];
                    snapshot.forEach(
                        p => results.push(Player.create(p.data())));
                    return results;
                  })
                  .then(results => players.getPlayersSuccess(results))
                  .catch(error => players.getPlayersError(error));
            }));

export const getPlayer: Epic<Action, GlobalState, EpicDependencies> =
    (action$, store, deps) =>
        action$.ofType(players.GET_PLAYER)
            .pipe(concatMap((action: players.GetPlayerAction) => {
              const id = action.payload;
              const db: firestore.Firestore =
                  // tslint:disable-next-line:no-any
                  (deps.firebaseApp as any)  // firebase/firebase-js-sdk#264
                      .firestore();
              return db.doc(`players/${id}`)
                  .get()
                  .then(snapshot => Player.create(snapshot.data()))
                  .then(player => players.getPlayerSuccess(player))
                  .catch(error => players.getPlayerError({id, error}));
            }));

export const epics = combineEpics(getPlayers, getPlayer);
