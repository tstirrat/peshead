import {app} from 'firebase';
import {combineEpics} from 'redux-observable';

// import * as app from './app';
// import * as league from './league';
import * as players from './players';
import * as search from './search';
// import * as team from './team';

/**
 * Common deps supplied to all Epics.
 */
export interface EpicDependencies { firebaseApp: app.App; }

export const epics = combineEpics(players.epics, search.epics);
