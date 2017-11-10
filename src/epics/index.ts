import {app} from 'firebase';
import {combineEpics} from 'redux-observable';

// import * as league from './league';
import * as players from './players';
import * as search from './search';
import * as session from './session';
// import * as team from './team';

/**
 * Common deps supplied to all Epics.
 */
export interface EpicDependencies { firebaseApp: app.App; }

export const epics = combineEpics(players.epics, search.epics, session.epics);
