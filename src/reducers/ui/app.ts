import { Reducer } from 'redux';

import * as app from '../../actions/app';
import { User } from '../../models/user';

export interface State {
  user: {
    value?: User;
    error?: Error;
  };
}

export const INITIAL_STATE: State = {
  user: {}
};

export const reducer: Reducer<State> = (
  state = INITIAL_STATE,
  action: app.Actions
) => {
  switch (action.type) {
    // Also called after successful SESSION_LISTEN
    case app.LOGIN_SUCCESS: {
      const user = action.payload;
      return {
        ...state,
        user: {
          value: user
        }
      };
    }

    case app.LOGIN_ERROR: {
      const error = action.payload;
      return {
        ...state,
        user: {
          error
        }
      };
    }

    // Also called after user is null in SESSION_LISTEN
    case app.LOGOUT_SUCCESS: {
      return {
        ...state,
        user: {}
      };
    }

    default:
      return state;
  }
};

export const getCurrentUser = (state: State): User | undefined => {
  return state.user.value;
};
