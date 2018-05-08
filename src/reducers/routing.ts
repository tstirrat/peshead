import { Location } from 'redux-little-router';

import { assert } from '../shared/assert';
import {
  DEFAULT_PLAYER_FORM,
  DEFAULT_PLAYER_LEVEL,
  parseForm,
  PlayerForm,
  PlayerFormValue,
} from '../shared/utils/player';

export type State = Location;

const WILDCARD_PARAM = '_';

export interface RouteWithId {
  id: string;
}

export interface PlayerCompareOption {
  id: string;
  level?: number;
  form?: PlayerForm;
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

  const level = levelString ? Number(levelString) : undefined;
  return {
    id,
    form: parseForm(form),
    level
  };
}

export function buildPlayerCompareUrl(players: PlayerCompareOption[]) {
  const slugs = players.map(p => buildPlayerSlug(p)).join('/');
  return `/players/compare/${slugs}`;
}

function buildPlayerSlug({ id, form, level }: PlayerCompareOption): string {
  if ((!form && !level) || (form === PlayerForm.C && level === 30)) {
    return id;
  }
  const f = form || DEFAULT_PLAYER_FORM;
  const l = level || DEFAULT_PLAYER_LEVEL;
  return `${id}-${PlayerFormValue[f]}-L${l}`;
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
