import {routerReducer, RouterState} from 'react-router-redux';
import {combineReducers} from 'redux';

import * as app from './containers/App/reducer';
import * as league from './containers/League/reducer';
import * as player from './containers/Player/reducer';
import * as search from './containers/Search/reducer';
import * as team from './containers/Team/reducer';

export interface State {
  app: app.State;
  league: league.State;
  team: team.State;
  player: player.State;
  search: search.State;
  routing: RouterState;
}

export const reducer = combineReducers({
  app: app.reducer,
  league: league.reducer,
  team: team.reducer,
  player: player.reducer,
  search: search.reducer,
  routing: routerReducer,
});
