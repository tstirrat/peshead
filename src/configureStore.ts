import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore, GenericStoreEnhancer, Middleware } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import { createEpicMiddleware } from 'redux-observable';

import { analyticsMiddleware } from './configureAnalytics';
import { configureFirebase } from './configureFirebase';
import { EpicDependencies, epics as rootEpic } from './epics';
import { INITIAL_STATE, reducer as rootReducer } from './reducers';

export const history = createHistory();

const enhancers: GenericStoreEnhancer[] = [devToolsEnhancer({})];
const middleware: Middleware[] = [
  routerMiddleware(history),
  createEpicMiddleware(rootEpic, {
    dependencies: {
      firebaseApp: configureFirebase()
    } as EpicDependencies
  }),
  analyticsMiddleware()
];

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, INITIAL_STATE, composedEnhancers);

export default store;
