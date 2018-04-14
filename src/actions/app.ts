import { ActionCreator } from 'react-redux';
import { Action } from 'redux';

import { User } from '../models/user';

export const LOGIN = '[app] LOGIN';
export class AppLoginAction implements Action {
  public type: typeof LOGIN = LOGIN;
  constructor(public payload: AppLoginPayload) {}
}
interface AppLoginPayload {
  provider: string;
  id?: string;
  password?: string;
}
export const login = (
  provider: string,
  id?: string,
  password?: string
): AppLoginAction => {
  return new AppLoginAction({
    provider,
    id,
    password
  });
};

export const LOGIN_SUCCESS = '[app] LOGIN_SUCCESS';
export class AppLoginSuccessAction implements Action {
  public type: typeof LOGIN_SUCCESS = LOGIN_SUCCESS;
  constructor(public payload: User) {}
}
export const loginSuccess = (user: User): AppLoginSuccessAction => {
  return new AppLoginSuccessAction(user);
};

export const LOGIN_ERROR = '[app] LOGIN_ERROR';
export class AppLoginErrorAction implements Action {
  public type: typeof LOGIN_ERROR = LOGIN_ERROR;
  constructor(public payload: Error) {}
}
export const loginError = (error: Error): AppLoginErrorAction => {
  return new AppLoginErrorAction(error);
};

export const LOGOUT = '[app] LOGOUT';
export class AppLogoutAction implements Action {
  public type: typeof LOGOUT = LOGOUT;
}
export const logout: ActionCreator<AppLogoutAction> = (): AppLogoutAction => {
  return new AppLogoutAction();
};

export const LOGOUT_SUCCESS = '[app] LOGOUT_SUCCESS';
export class AppLogoutSuccessAction implements Action {
  public type: typeof LOGOUT_SUCCESS = LOGOUT_SUCCESS;
}
export const logoutSuccess = (): AppLogoutSuccessAction => {
  return new AppLogoutSuccessAction();
};

export const LOAD_SESSION = '[app] SESSION_LISTEN';
export class AppLoadSessionAction implements Action {
  public type: typeof LOAD_SESSION = LOAD_SESSION;
}
export const loadSession = (): AppLoadSessionAction => {
  return new AppLoadSessionAction();
};

export type Actions =
  | AppLoginAction
  | AppLoginSuccessAction
  | AppLoginErrorAction
  | AppLogoutAction
  | AppLogoutSuccessAction
  | AppLoadSessionAction;
