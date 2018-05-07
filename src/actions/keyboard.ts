import { ActionCreator } from 'react-redux';
import { Action } from 'redux';

export const HOME = '[keyboard] HOME';
export class HomeAction implements Action {
  type: typeof HOME = HOME;
}
export const home: ActionCreator<HomeAction> = () => {
  return { type: HOME };
};

export const SEARCH = '[keyboard] SEARCH';
export class SearchAction implements Action {
  type: typeof SEARCH = SEARCH;
}
export const search: ActionCreator<SearchAction> = () => {
  return { type: SEARCH };
};

export type Actions =
  | HomeAction // alignment
  | SearchAction;
