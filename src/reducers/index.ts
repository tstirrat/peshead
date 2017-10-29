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
    players: players.State;  //
    search: search.State;    //
    teams: teams.State;      //
  };
  /** ui state */
  ui: {
    app: app.State;        // clang-format
    routing: RouterState;  //
  };
}

export const INITIAL_STATE: State = {
  data: {
    leagues: leagues.INITIAL_STATE,
    players: players.INITIAL_STATE,
    search: search.INITIAL_STATE,
    teams: teams.INITIAL_STATE,
  },
  ui: {
    app: app.INITIAL_STATE,
    routing: {
      location: null,
    }
  }
};

export const reducer = combineReducers({
  data: combineReducers({
    leagues: leagues.reducer,
    players: players.reducer,
    search: search.reducer,
    teams: teams.reducer,
  }),
  ui: combineReducers({
    app: app.reducer,
    routing: routerReducer,
  }),
});

// selector for each sub state, to find it from root
export const getPlayersState = (state: State): players.State =>
    state.data.players;
export const getLeaguesState = (state: State): leagues.State =>
    state.data.leagues;
export const getTeamsState = (state: State): teams.State => state.data.teams;
export const getSearchState = (state: State): search.State => state.data.search;

export const getPlayerById = (state: State, id: string) =>
    players.getPlayerById(getPlayersState(state), id);
