import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import { Player } from '../shared/service/api';
import * as leagues from './leagues';
import * as players from './players';
import * as routing from './routing';
import * as search from './search';
import * as teams from './teams';
import * as app from './ui/app';

export interface State {
  /** canonical server data */
  data: {
    leagues: leagues.State;
    players: players.State;
    search: search.State;
    teams: teams.State;
  };
  /** ui state */
  ui: {
    app: app.State;
  };
  router: routing.State;
}

export const reducer = {
  data: combineReducers({
    leagues: leagues.reducer,
    players: players.reducer,
    search: search.reducer,
    teams: teams.reducer
  }),
  ui: combineReducers({
    app: app.reducer
  })
};

// selector for each sub state, to find it from root
export const getPlayersState = (state: State) => state.data.players;
export const getLeaguesState = (state: State) => state.data.leagues;
export const getTeamsState = (state: State) => state.data.teams;
export const getSearchState = (state: State) => state.data.search;
export const getRoutingState = (state: State) => state.router;
export const getAppState = (state: State) => state.ui.app;

// Routing

export const getRouteId = (state: State) =>
  routing.getId(getRoutingState(state));
export const getQueryParams = <T>(state: State) =>
  routing.getQueryParams<T>(getRoutingState(state));

export const getRoutePlayerCompareOptions = (state: State) =>
  routing.getPlayerCompareOptions(getRoutingState(state));

// App

export const getCurrentUser = (state: State) =>
  app.getCurrentUser(getAppState(state));

// Player

export const getSelectedPlayer = createSelector(
  [getRouteId, getPlayersState],
  (id: string, state: players.State): Player | undefined => {
    const playerData = players.getPlayerById(state, id);
    return playerData ? Player.fromObject(playerData) : undefined;
  }
);

export const getSelectedPlayerView = createSelector(
  [getRouteId, getPlayersState],
  (id: string, state: players.State) => players.getPlayerBaseView(state, id)
);

// Search

export const getSearchResults = createSelector(getSearchState, searchState => {
  const results = search.getResults(searchState);
  return results.map(p => Player.fromObject(p));
});
export const getSearchIsLoading = (state: State) =>
  search.getIsLoading(getSearchState(state));
export const getSearchError = (state: State) =>
  search.getError(getSearchState(state));
