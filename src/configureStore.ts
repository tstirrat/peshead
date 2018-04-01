import { applyMiddleware, combineReducers, compose, createStore, GenericStoreEnhancer, Middleware, Store } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import { initializeCurrentLocation, routerForBrowser } from 'redux-little-router';
import { createEpicMiddleware } from 'redux-observable';

import { analyticsMiddleware } from './configureAnalytics';
import { configureFirebase } from './configureFirebase';
import { EpicDependencies, epics as rootEpic } from './epics';
import * as fromRoot from './reducers';
import { routeDefinition } from './routes';

const router = routerForBrowser({
  routes: routeDefinition
});

const enhancers: GenericStoreEnhancer[] = [devToolsEnhancer({})];

const epicDependencies: EpicDependencies = {
  firebaseApp: configureFirebase()
};

const middleware: Middleware[] = [
  router.middleware,
  createEpicMiddleware(rootEpic, {
    dependencies: epicDependencies
  }),
  analyticsMiddleware()
];

const composedEnhancers = compose(
  router.enhancer,
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  combineReducers({ router: router.reducer, ...fromRoot.reducer }),
  composedEnhancers
);

// Initialize the current location of redux-little-router.
const initialLocation = (store as Store<fromRoot.State>).getState().router;
if (initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation));
}

export default store;
