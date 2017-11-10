import {RouteComponentProps} from 'react-router';
import {combineReducers} from 'redux';
import {createSelector} from 'reselect';

import {Player} from '../shared/service/api';

import * as leagues from './leagues';
import * as players from './players';
import * as search from './search';
import * as teams from './teams';
import * as app from './ui/app';
import * as routing from './ui/routing';

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
    app: app.State;          // clang-format
    routing: routing.State;  //
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
    routing: routing.reducer,
  }),
});

// selector for each sub state, to find it from root
export const getPlayersState = (state: State) => state.data.players;
export const getLeaguesState = (state: State) => state.data.leagues;
export const getTeamsState = (state: State) => state.data.teams;
export const getSearchState = (state: State) => state.data.search;
export const getRoutingState = (state: State) => state.ui.routing;
export const getAppState = (state: State) => state.ui.app;

// Routing

export const getRouteId =
    (state: State, props: RouteComponentProps<routing.RouteWithId>) =>
        routing.getId(getRoutingState(state), props);
export const getQueryParams = <T>(state: State) =>
    routing.getQueryParams<T>(getRoutingState(state));

// App

export const getCurrentUser = (state: State) =>
    app.getCurrentUser(getAppState(state));

// Player

export const getSelectedPlayer = createSelector(
    [getRouteId, getPlayersState],
    (id: string, state: players.State): Player | undefined =>
        players.getPlayerById(state, id));

// Search

export const getSearchResults = (state: State) =>
    search.getResults(getSearchState(state));
export const getSearchIsLoading = (state: State) =>
    search.getIsLoading(getSearchState(state));
export const getSearchError = (state: State) =>
    search.getError(getSearchState(state));
