import {routerReducer, RouterState} from 'react-router-redux';
import {combineReducers} from 'redux';

import * as leagues from './leagues';
import * as players from './players';
import * as search from './search';
import * as teams from './teams';
import * as app from './ui/app';

export interface State {
  /** canonical server data */
  data: {
    leagues: leagues.State;  // clang-format
    teams: teams.State;      //
    players: players.State;  //
    search: search.State;    //
  };
  /** ui state */
  ui: {
    app: app.State;        // clang-format
    routing: RouterState;  //
  };
}

export const reducer = combineReducers({
  data: combineReducers({
    leagues: leagues.reducer,
    teams: teams.reducer,
    players: players.reducer,
    search: search.reducer,
  }),
  ui: combineReducers({
    app: app.reducer,
    routing: routerReducer,
  }),
});
