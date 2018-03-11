import { Reducer } from 'redux';

import * as search from '../actions/search';
import { Player } from '../shared/service/api';

export interface State {
  ui: {
    isLoading: boolean;
    error?: Error;
  };
  data: {
    results: Player[]; // for now, should be something else here
  };
}

export const INITIAL_STATE: State = {
  ui: {
    isLoading: false
  },
  data: {
    results: []
  }
};

export const reducer: Reducer<State> = (
  state = INITIAL_STATE,
  action: search.Actions
) => {
  switch (action.type) {
    case search.SEARCH: {
      return {
        ui: {
          isLoading: true
        },
        data: {
          results: []
        }
      };
    }

    case search.SEARCH_SUCCESS: {
      const { results } = action.payload;
      return {
        ui: {
          isLoading: false
        },
        data: {
          results
        }
      };
    }

    case search.SEARCH_ERROR: {
      const error = action.payload;
      return {
        ui: {
          isLoading: false,
          error
        },
        data: {
          results: []
        }
      };
    }
    default:
      return state;
  }
};

export const getIsLoading = (state: State) => state.ui.isLoading;
export const getError = (state: State) => state.ui.error;
export const getResults = (state: State) => state.data.results;
