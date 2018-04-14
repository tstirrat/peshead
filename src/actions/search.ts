import { Action } from 'redux';

import { IPlayer } from '../shared/service/api';

export const SEARCH = 'SEARCH';
export class SearchRequestAction implements Action {
  public type: typeof SEARCH = SEARCH;
  constructor(public payload: SearchRequestPayload) {}
}
export interface SearchRequestPayload {
  query: string;
  /** Used to differentiate between user searches and hard coded (e.g. home) */
  id: string;
  sortField?: string;
  sortDirection?: string;
}
// To make id optional
export type SearchRequestParams = Partial<SearchRequestPayload> &
  Pick<SearchRequestPayload, 'query'>;
export const search = ({
  query,
  sortField,
  sortDirection,
  id = 'search'
}: SearchRequestParams): SearchRequestAction => {
  return new SearchRequestAction({ query, id, sortField, sortDirection });
};

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export class SearchSuccessAction implements Action {
  public type: typeof SEARCH_SUCCESS = SEARCH_SUCCESS;
  constructor(public payload: SearchSuccessPayload) {}
}
export interface SearchSuccessPayload {
  id: string;
  results: IPlayer[];
}
export const searchSuccess = (
  results: IPlayer[],
  id = 'search'
): SearchSuccessAction => {
  return new SearchSuccessAction({ results, id });
};

export const SEARCH_ERROR = 'SEARCH_ERROR';
export class SearchErrorAction implements Action {
  public type: typeof SEARCH_ERROR = SEARCH_ERROR;
  constructor(public payload: { error: Error; id: string }) {}
}
export const searchError = (error: Error, id = 'search'): SearchErrorAction => {
  return new SearchErrorAction({ error, id });
};

export type Actions =
  | SearchRequestAction
  | SearchSuccessAction
  | SearchErrorAction;
