import { ActionCreator } from 'react-redux';
import { Action } from 'redux';

import { IPlayer } from '../shared/service/api';

export const SEARCH = 'SEARCH';
export class SearchRequestAction implements Action {
  public type: typeof SEARCH = SEARCH;
  constructor(public payload: SearchRequestPayload) {}
}
export interface SearchRequestPayload {
  query: string;
  sortField?: string;
  sortDirection?: string;
}
export const search: ActionCreator<SearchRequestAction> = ({
  query,
  sortField,
  sortDirection
}: SearchRequestPayload) => {
  return {
    type: SEARCH,
    payload: {
      query,
      sortField,
      sortDirection
    }
  };
};

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export class SearchSuccessAction implements Action {
  public type: typeof SEARCH_SUCCESS = SEARCH_SUCCESS;
  constructor(public payload: SearchSuccessPayload) {}
}
export interface SearchSuccessPayload {
  results: IPlayer[];
}
export const searchSuccess: ActionCreator<SearchSuccessAction> = (
  results: IPlayer[]
) => {
  return {
    type: SEARCH_SUCCESS,
    payload: { results }
  };
};

export const SEARCH_ERROR = 'SEARCH_ERROR';
export class SearchErrorAction implements Action {
  public type: typeof SEARCH_ERROR = SEARCH_ERROR;
  constructor(public payload: Error) {}
}
export const searchError: ActionCreator<SearchErrorAction> = (error: Error) => {
  return {
    type: SEARCH_ERROR,
    payload: error
  };
};

export type Actions =
  | SearchRequestAction
  | SearchSuccessAction
  | SearchErrorAction;
