import { Location } from 'redux-little-router';

import { assert } from '../shared/assert';

export type State = Location;

const WILDCARD_PARAM = '_';

export interface RouteWithId {
  id: string;
}

export interface PlayerCompareOption {
  id: string;
  level?: number;
  form?: string; // TODO: make enum
}

/** Get :id from the, route, operates on component's ownProps  */
export const getId = (state: State) => {
  return state.params!.id;
};

/** Get player info from the route  */
export const getPlayerCompareOptions = (
  state: State
): PlayerCompareOption[] => {
  const playersParam = state.params![WILDCARD_PARAM];
  return playersParam
    .split('/')
    .filter(id => !!id)
    .map(playerString => extractPlayerOptions(playerString));
};

const PLAYER_ID_FORM_LEVEL_REGEX = /(\d+)(-([AaBbCcDd]))?(-L(\d{1,2}))?/;

function extractPlayerOptions(playerString: string): PlayerCompareOption {
  const match = playerString.match(PLAYER_ID_FORM_LEVEL_REGEX);
  const [, id, , form, , levelString] = assert(
    match,
    'Cannot find player id in url'
  );
  return {
    id,
    form,
    level: Number(levelString)
  };
}

/**
 * Get typed query params from the current url.
 */
export function getQueryParams<T>(state: State): T {
  const { query } = state;
  if (!query) {
    return {} as T;
  }
  // tslint:disable-next-line:no-any :(
  return query as any;
}
