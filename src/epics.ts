import {app} from 'firebase';
import {combineEpics} from 'redux-observable';


// import * as app from './containers/App/epics';
// import * as league from './containers/League/epics';
// import * as player from './containers/Player/epics';
import {doSearch} from './containers/Search/epics';
// import * as team from './containers/Team/epics';
/**
 * Common deps supplied to all Epics.
 */
export interface EpicDependencies { firebaseApp: app.App; }

export const epics = combineEpics(doSearch);
