import * as ReactGA from 'react-ga';
import { createMiddleware } from 'redux-beacon';
import { GoogleAnalytics, PageView } from 'redux-beacon/targets/google-analytics';
import { LOCATION_CHANGED, LocationChangedAction } from 'redux-little-router';

import { assert } from './shared/assert';

/** Standard router location change -> pageview */
const pageView = (action: LocationChangedAction): PageView => {
  const location = action.payload;
  const page = location.pathname + location.search;
  const routeExtra = (location.result ? location.result : {}) as {
    title?: string;
  };
  const { title = 'Unknown' } = routeExtra;
  return {
    hitType: 'pageview',
    page,
    title: `PESto - ${title}`
  };
};

// Map the event to a Redux action
const eventsMap = {
  [LOCATION_CHANGED]: pageView
};

export const analyticsMiddleware = () => {
  const propertyId = `${process.env.REACT_APP_GA_PROPERTY_ID}`;
  assert(propertyId, 'GA property id is missing');
  ReactGA.initialize(propertyId);
  return createMiddleware(eventsMap, GoogleAnalytics);
};
