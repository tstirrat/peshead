import { Action, Reducer } from 'redux';

export interface State {}
const initialState: State = {};

export const reducer: Reducer<State> =
    (state = initialState, action: Action) => {
      switch (action.type) {
        default:
          return state;
      }
    };
