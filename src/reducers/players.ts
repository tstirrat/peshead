import {Action, Reducer} from 'redux';

import {Player} from '../shared/service/api';

export type MapLike<T> = {
  [key: string]: T
};

export interface State { byId: MapLike<Player>; }

const INITIAL_STATE: State = {
  byId: {},
};

export const reducer: Reducer<State> =
    (state = INITIAL_STATE, action: Action) => {
      switch (action.type) {
        default:
          return state;
      }
    };

export const getPlayerById = (state: State, id: string) => state.byId[id];
