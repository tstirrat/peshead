import {ActionCreator} from 'react-redux';
import {Action} from 'redux';

import {Player} from '../shared/service/api';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';

export class SearchRequestAction implements Action {
  public type: typeof SEARCH_REQUEST = SEARCH_REQUEST;
  constructor(public payload: SearchRequestPayload) {}
}

export class SearchSuccessAction implements Action {
  public type: typeof SEARCH_SUCCESS = SEARCH_SUCCESS;
  constructor(public payload: SearchSuccessPayload) {}
}

export class SearchErrorAction implements Action {
  public type: typeof SEARCH_ERROR = SEARCH_ERROR;
  constructor(public payload: Error) {}
}

export interface SearchRequestPayload {
  query: string;
  sortField?: string;
  sortDirection?: string;
}

export interface SearchSuccessPayload { results: Player[]; }

// Action creators

export const search: ActionCreator<SearchRequestAction> =
    ({query, sortField, sortDirection}: SearchRequestPayload) => {
      return {
        type: SEARCH_REQUEST,
        payload: {
          query,
          sortField,
          sortDirection,
        },
      };
    };

export const searchSuccess: ActionCreator<SearchSuccessAction> =
    (results: Player[]) => {
      return {
        type: SEARCH_SUCCESS,
        payload: {results},
      };
    };

export const searchError: ActionCreator<SearchErrorAction> = (error: Error) => {
  return {
    type: SEARCH_ERROR,
    payload: error,
  };
};

export type Actions =
    SearchRequestAction | SearchSuccessAction | SearchErrorAction;
