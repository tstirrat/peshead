import { Action } from 'redux';

import { IPlayer } from '../shared/service/api';

// Single player
export const GET_PLAYER = 'GET_PLAYER';
export class GetPlayerAction implements Action {
  public type: typeof GET_PLAYER = GET_PLAYER;
  constructor(
    /** player id */
    public payload: string
  ) {}
}
export const getPlayer = (id: string): GetPlayerAction => {
  return {
    type: GET_PLAYER,
    payload: id
  };
};

export const GET_PLAYER_SUCCESS = 'GET_PLAYER_SUCCESS';
export class GetPlayerSuccessAction implements Action {
  public type: typeof GET_PLAYER_SUCCESS = GET_PLAYER_SUCCESS;
  constructor(public payload: IPlayer) {}
}
export const getPlayerSuccess = (player: IPlayer): GetPlayerSuccessAction => {
  return { type: GET_PLAYER_SUCCESS, payload: player };
};

export const GET_PLAYER_ERROR = 'GET_PLAYER_ERROR';
export class GetPlayerErrorAction implements Action {
  public type: typeof GET_PLAYER_ERROR = GET_PLAYER_ERROR;
  constructor(public payload: PlayerErrorPayload) {}
}
export interface PlayerErrorPayload {
  id: string;
  error: Error;
}
export const getPlayerError = (
  id: string,
  error: Error
): GetPlayerErrorAction => {
  return {
    type: GET_PLAYER_ERROR,
    payload: { id, error }
  };
};

export type Actions =
  | GetPlayerAction
  | GetPlayerSuccessAction
  | GetPlayerErrorAction;
