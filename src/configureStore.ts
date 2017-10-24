import createHistory from 'history/createBrowserHistory';
import {routerMiddleware} from 'react-router-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';

import {epics as rootEpic} from './epics';
import {reducer as rootReducer} from './reducers';

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [
  routerMiddleware(history),
  createEpicMiddleware(rootEpic),
];

interface MyWindow extends Window {
  devToolsExtension(): void;
}
declare var window: MyWindow;

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
