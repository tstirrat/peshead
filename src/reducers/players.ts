import { Reducer } from 'redux';

import * as players from '../actions/players';
import { IPlayer, Player } from '../shared/service/api';
import { MapLike } from '../shared/types';

export interface State {
  byId: MapLike<IPlayer>;
  isLoading: MapLike<boolean>;
  error: MapLike<Error>;
}

export const INITIAL_STATE: State = {
  byId: {},
  isLoading: {},
  error: {}
};

export const reducer: Reducer<State> = (
  state = INITIAL_STATE,
  action: players.Actions
) => {
  switch (action.type) {
    // Multiple players
    case players.GET_PLAYERS_SUCCESS: {
      const { results } = action.payload;
      return setPlayers(state, results);
    }

    // Single player
    case players.GET_PLAYER: {
      const id = action.payload;
      return setLoading(state, id);
    }

    case players.GET_PLAYER_SUCCESS: {
      const player = action.payload;
      return setPlayers(state, [player]);
    }

    case players.GET_PLAYER_ERROR: {
      const { id, error } = action.payload;
      return setError(state, id, error);
    }

    default:
      return state;
  }
};

/** Set players into state, return new state ref. */
function setPlayers(state: State, results: IPlayer[]): State {
  const byId = { ...state.byId }; // clone
  const isLoading = { ...state.isLoading }; // clone

  results.forEach(player => {
    byId[player.id] = player;
    delete isLoading[player.id];
  });

  return {
    ...state,
    byId,
    isLoading
  };
}

function setLoading(state: State, id: string): State {
  return { ...state, isLoading: { ...state.isLoading, [id]: true } };
}

function setError(state: State, id: string, error: Error): State {
  return { ...state, error: { ...state.error, [id]: error } };
}

// Selectors
export const getPlayerById = (
  state: State,
  id: string
): IPlayer | undefined => {
  return state.byId[id];
};

export const getPlayerIsLoading = (state: State, id: string): boolean => {
  return !!state.isLoading[id];
};

export const getPlayerError = (state: State, id: string): Error | undefined => {
  return state.error[id];
};

/** Common attributes for multiple views */
export interface BaseViewModel {
  id: string;
  player?: Player;
  isLoading: boolean;
  error?: Error;
}

/** Used as a basis for multiple view models. */
export const getPlayerBaseView = (state: State, id: string): BaseViewModel => {
  const playerData = getPlayerById(state, id);
  let player = playerData ? Player.fromObject(playerData) : undefined;
  return {
    id,
    player,
    isLoading: getPlayerIsLoading(state, id),
    error: getPlayerError(state, id)
  };
};
