import { ActionCreator } from 'react-redux';
import { Action } from 'redux';

import { Player } from '../shared/service/api';

// Multiple players (e.g. get players in a team)
export const GET_PLAYERS = 'GET_PLAYERS';
export class GetPlayersAction implements Action {
  public type: typeof GET_PLAYERS = GET_PLAYERS;
  constructor(public payload: PlayersRequestPayload) {}
}

export const GET_PLAYERS_SUCCESS = 'GET_PLAYERS_SUCCESS';
export class GetPlayersSuccessAction implements Action {
  public type: typeof GET_PLAYERS_SUCCESS = GET_PLAYERS_SUCCESS;
  constructor(public payload: PlayersSuccessPayload) {}
}

export const GET_PLAYERS_ERROR = 'GET_PLAYERS_ERROR';
export class GetPlayersErrorAction implements Action {
  public type: typeof GET_PLAYERS_ERROR = GET_PLAYERS_ERROR;
  constructor(public payload: Error) {}
}

export interface PlayersRequestPayload {
  limit: number;
  sortField: string;
  sortDirection: string;
}

export interface PlayersSuccessPayload {
  results: Player[];
}

// Action creators
export const getPlayers: ActionCreator<GetPlayersAction> = () => {
  return {
    type: GET_PLAYERS,
    payload: {
      // TODO: make these configurable
      sortField: '__name__',
      sortDirection: 'asc',
      limit: 20
    }
  };
};

export const getPlayersSuccess: ActionCreator<GetPlayersSuccessAction> = (
  players: Player[]
) => {
  return {
    type: GET_PLAYERS_SUCCESS,
    payload: { results: players }
  };
};

export const getPlayersError: ActionCreator<GetPlayersErrorAction> = (
  error: Error
) => {
  return {
    type: GET_PLAYERS_ERROR,
    payload: error
  };
};

// Single player
export const GET_PLAYER = 'GET_PLAYER';
export class GetPlayerAction implements Action {
  public type: typeof GET_PLAYER = GET_PLAYER;
  constructor(
    /** player id */
    public payload: string
  ) {}
}

export const GET_PLAYER_SUCCESS = 'GET_PLAYER_SUCCESS';
export class GetPlayerSuccessAction implements Action {
  public type: typeof GET_PLAYER_SUCCESS = GET_PLAYER_SUCCESS;
  constructor(public payload: Player) {}
}

export const GET_PLAYER_ERROR = 'GET_PLAYER_ERROR';
export class GetPlayerErrorAction implements Action {
  public type: typeof GET_PLAYER_ERROR = GET_PLAYER_ERROR;
  constructor(public payload: PlayerErrorPayload) {}
}

export interface PlayerErrorPayload {
  id: string;
  error: Error;
}

// Action creators
export const getPlayer: ActionCreator<GetPlayerAction> = (id: string) => {
  return {
    type: GET_PLAYER,
    payload: id
  };
};

export const getPlayerSuccess: ActionCreator<GetPlayerSuccessAction> = (
  player: Player
) => {
  return {
    type: GET_PLAYER_SUCCESS,
    payload: player
  };
};

export const getPlayerError: ActionCreator<GetPlayerErrorAction> = (
  id: string,
  error: Error
) => {
  return {
    type: GET_PLAYER_ERROR,
    payload: { id, error }
  };
};

export type Actions =
  | GetPlayersAction
  | GetPlayersSuccessAction
  | GetPlayersErrorAction
  | GetPlayerAction
  | GetPlayerSuccessAction
  | GetPlayerErrorAction;
