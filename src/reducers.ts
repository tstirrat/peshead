import { combineReducers } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import * as app from './containers/App/reducer';
import * as league from './containers/League/reducer';
import * as team from './containers/Team/reducer';
import * as player from './containers/Player/reducer';
import * as search from './containers/Search/reducer';

export interface State {
  app: app.State;
  league: league.State;
  team: team.State;
  player: player.State;
  search: search.State;
  routing: RouterState;
}

export default combineReducers({
  app: app.reducer,
  league: league.reducer,
  team: team.reducer,
  player: player.reducer,
  search: search.reducer,
  routing: routerReducer,
});
