import { app } from 'firebase';
import fetch from 'observable-fetch';
import { combineEpics } from 'redux-observable';

import * as players from './players';
import * as search from './search';
import * as session from './session';

/**
 * Common deps supplied to all Epics.
 */
export interface EpicDependencies {
  firebaseApp: app.App;
  fetch: typeof fetch;
}

export const epics = combineEpics(
  players.epics, // alignment
  search.epics,
  session.epics
);
