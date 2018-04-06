import { Reducer } from 'redux';

import * as search from '../actions/search';
import { IPlayer } from '../shared/service/api';

export interface State {
  home: SearchState;
  search: SearchState;
}

export interface SearchState {
  isLoading: boolean;
  error?: Error;
  results: IPlayer[]; // for now, should be something else here
}

const INITIAL_STATE: State = {
  home: {
    isLoading: false,
    results: []
  },
  search: { isLoading: false, results: [] }
};

export const reducer: Reducer<State> = (
  state = INITIAL_STATE,
  action: search.Actions
): State => {
  switch (action.type) {
    case search.SEARCH: {
      const { id } = action.payload;
      return {
        ...state,
        [id]: {
          isLoading: true,
          results: []
        }
      };
    }

    case search.SEARCH_SUCCESS: {
      const { id, results } = action.payload;
      return { ...state, [id]: { isLoading: false, results: results } };
    }

    case search.SEARCH_ERROR: {
      const { error, id } = action.payload;
      return { ...state, [id]: { isLoading: false, error } };
    }
    default:
      return state;
  }
};

export const getIsLoading = (state: State) => state.search.isLoading;
export const getError = (state: State) => state.search.error;
export const getResults = (state: State) => state.search.results;

export const getHomeIsLoading = (state: State) => state.home.isLoading;
export const getHomeError = (state: State) => state.home.error;
export const getHomeResults = (state: State) => state.home.results;
