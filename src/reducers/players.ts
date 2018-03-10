import { Reducer } from 'redux';

import * as players from '../actions/players';
import { Player } from '../shared/service/api';

export type MapLike<T> = {
  [key: string]: T;
};

export interface State {
  byId: MapLike<Player>;
}

export const INITIAL_STATE: State = {
  byId: {}
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
    case players.GET_PLAYER_SUCCESS: {
      const player = action.payload;
      return setPlayers(state, [player]);
    }

    default:
      return state;
  }
};

/** Set players into state, return new state ref. */
function setPlayers(state: State, results: Player[]) {
  const newState: State = {
    byId: {
      ...state.byId
    }
  };
  results.forEach(p => (newState.byId['' + p.id] = p));
  return newState;
}

// Selectors
export const getPlayerById = (state: State, id: string): Player | undefined => {
  return state.byId[id];
};
