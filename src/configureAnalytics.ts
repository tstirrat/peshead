import GoogleAnalytics, { trackPageView } from '@redux-beacon/google-analytics';
import { createMiddleware } from 'redux-beacon';
import { LOCATION_CHANGED, LocationChangedAction } from 'redux-little-router';

import { assert } from './shared/assert';

/** Standard router location change -> pageview */
const pageView = trackPageView((action: LocationChangedAction) => {
  const location = action.payload;
  const page = location.pathname + location.search;
  const routeExtra = (location.result ? location.result : {}) as {
    title?: string;
  };
  const { title = 'Unknown' } = routeExtra;
  return {
    hitType: 'pageview',
    page,
    title: `PEShead - ${title}`
  };
});

// Map the event to a Redux action
const eventsMap = {
  [LOCATION_CHANGED]: pageView
};

export const analyticsMiddleware = () => {
  const propertyId = `${process.env.REACT_APP_GA_PROPERTY_ID}`;
  assert(propertyId, 'GA property id is missing');
  return createMiddleware(eventsMap, GoogleAnalytics());
};
