import {Action} from 'redux';

import {IPlayer} from '../shared/service/api';

export const PLAYERS_REQUEST = 'PLAYERS_REQUEST';
export const PLAYERS_SUCCESS = 'PLAYERS_SUCCESS';
export const PLAYERS_ERROR = 'PLAYERS_ERROR';

export class PlayersRequestAction implements Action {
  public type: typeof PLAYERS_REQUEST = PLAYERS_REQUEST;
  constructor(public payload: PlayersRequestPayload) {}
}

export class PlayersSuccessAction implements Action {
  public type: typeof PLAYERS_SUCCESS = PLAYERS_SUCCESS;
  constructor(public payload: PlayersSuccessPayload) {}
}

export class PlayersErrorAction implements Action {
  public type: typeof PLAYERS_ERROR = PLAYERS_ERROR;
  constructor(public payload: Error) {}
}

export interface PlayersRequestPayload {
  sortField: string;
  sortDirection: string;
}

export interface PlayersSuccessPayload { results: IPlayer[]; }

export type Actions =
    PlayersRequestAction | PlayersSuccessAction | PlayersErrorAction;
