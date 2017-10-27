import {routerReducer, RouterState} from 'react-router-redux';
import {combineReducers} from 'redux';

import * as leagues from './leagues';
import * as players from './players';
import * as search from './search';
import * as teams from './teams';
import * as app from './ui/app';

export interface State {
  app: app.State;
  leagues: leagues.State;
  teams: teams.State;
  players: players.State;
  search: search.State;
  routing: RouterState;
}

export const reducer = combineReducers({
  app: app.reducer,
  leagues: leagues.reducer,
  teams: teams.reducer,
  players: players.reducer,
  search: search.reducer,
  routing: routerReducer,
});
