import { Location } from 'redux-little-router';

import { assert } from '../shared/assert';

export type State = Location;

export interface RouteWithId {
  id: string;
}

export interface RouteWithPlayerIds {
  player1?: string;
  player2?: string;
  player3?: string;
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

/** Get :player1, :player2, :player3 from the route  */
export const getPlayerCompareOptions = (
  state: State
): PlayerCompareOption[] => {
  return ['player1', 'player2', 'player3']
    .map(key => state.params![key])
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
