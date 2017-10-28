import {Action} from 'redux';
import {combineEpics, Epic} from 'redux-observable';
import {of as observableOf} from 'rxjs/Observable/of';
import {delay} from 'rxjs/operators/delay';
import {map} from 'rxjs/operators/map';
import {switchMap} from 'rxjs/operators/switchMap';

import {make} from '../__test__/fixtures';
import * as players from '../actions/players';
import {EpicDependencies} from '../epics';
import {State as GlobalState} from '../reducers';
import {IPlayer} from '../shared/service/api';


export const getPlayers: Epic<Action, GlobalState, EpicDependencies> =
    (action$, store, deps) =>
        action$.ofType(players.PLAYERS_REQUEST)
            .pipe(switchMap((action: players.PlayersRequestAction) => {
              const fakePlayers = new Array(20).fill(null).map((_, i) => {
                return make.player({
                  id: i,
                  name: `Player ${i}`,
                });
              });
              return observableOf(fakePlayers)
                  .pipe(
                      delay(500),
                      map((results: IPlayer[]) =>
                              new players.PlayersSuccessAction({results})));
            }));


export const epics = combineEpics(getPlayers);
