import {ActionCreator} from 'react-redux';
import {Action} from 'redux';

import {User} from '../models/user';

export const LOGIN = '[app] LOGIN';
export const LOGIN_SUCCESS = '[app] LOGIN_SUCCESS';
export const LOGIN_ERROR = '[app] LOGIN_ERROR';
export const LOGOUT = '[app] LOGOUT';
export const LOGOUT_SUCCESS = '[app] LOGOUT_SUCCESS';
export const LOAD_SESSION = '[app] SESSION_LISTEN';

export class AppLoginAction implements Action {
  public type: typeof LOGIN = LOGIN;
  constructor(public payload: AppLoginPayload) {}
}

interface AppLoginPayload {
  provider: string;
  id?: string;
  password?: string;
}

export class AppLoginSuccessAction implements Action {
  public type: typeof LOGIN_SUCCESS = LOGIN_SUCCESS;
  constructor(public payload: User) {}
}

export class AppLoginErrorAction implements Action {
  public type: typeof LOGIN_ERROR = LOGIN_ERROR;
  constructor(public payload: Error) {}
}

export class AppLogoutAction implements Action {
  public type: typeof LOGOUT = LOGOUT;
}

export class AppLogoutSuccessAction implements Action {
  public type: typeof LOGOUT_SUCCESS = LOGOUT_SUCCESS;
}

export class AppLoadSessionAction implements Action {
  public type: typeof LOAD_SESSION = LOAD_SESSION;
}

// Action creators

export const login =
    (provider: string, id?: string, password?: string): AppLoginAction => {
      return {
        type: LOGIN,
        payload: {
          provider,
          id,
          password,
        },
      };
    };

export const loginSuccess = (user: User): AppLoginSuccessAction => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginError = (error: Error): AppLoginErrorAction => {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
};

export const logout: ActionCreator<AppLogoutAction> = (): AppLogoutAction => {
  return {
    type: LOGOUT,
  };
};

export const logoutSuccess = (): AppLogoutSuccessAction => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const loadSession = (): AppLoadSessionAction => {
  return {
    type: LOAD_SESSION,
  };
};

export type Actions = AppLoginAction | AppLoginSuccessAction |
    AppLoginErrorAction | AppLogoutAction | AppLogoutSuccessAction |
    AppLoadSessionAction;
