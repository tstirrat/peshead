import { Action, Reducer } from 'redux';

export interface State {}
const INITIAL_STATE: State = {};

export const reducer: Reducer<State> = (
  state = INITIAL_STATE,
  action: Action
) => {
  switch (action.type) {
    default:
      return state;
  }
};
