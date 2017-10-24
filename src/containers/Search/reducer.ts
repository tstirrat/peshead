import {Reducer} from 'redux';

import {Player} from '../../../functions/@types/api';

import * as search from './actions';

export interface State {
  ui: {isLoading: boolean;};
  data: {
    results: Player[];  // for now, should be something else here
  };
}

const initialState: State = {
  ui: {isLoading: true},
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
