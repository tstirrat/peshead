import {Reducer} from 'redux';

import * as search from '../actions/search';
import {Player} from '../shared/service/api';

export interface State {
  ui: {
    isLoading: boolean;  // TODO: clang-format, tslint don't like each other
  };
  data: {
    results: Player[];  // for now, should be something else here
  };
}

export const initialState: State = {
  ui: {
    isLoading: true,
  },
  data: {results: []},
};

export const reducer: Reducer<State> =
    (state = initialState, action: search.Actions) => {
      switch (action.type) {
        case search.SEARCH_REQUEST: {
          return {
            ...state,
            isLoading: true,
          };
        }
        case search.SEARCH_SUCCESS: {
          const {results} = action.payload;
          return {
            ...state,
            isLoading: false,
            data: {
              results,
            }
          };
        }
        default:
          return state;
      }
    };
