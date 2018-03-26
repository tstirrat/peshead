import { Location } from 'history';
import * as ReactGA from 'react-ga';
import { LOCATION_CHANGE, LocationChangeAction } from 'react-router-redux';
import { createMiddleware } from 'redux-beacon';
import { GoogleAnalytics, PageView } from 'redux-beacon/targets/google-analytics';

import { assert } from './shared/assert';

/** Standard router location change -> pageview */
const pageView = (action: LocationChangeAction): PageView => {
  const location: Location = action.payload;
  const page = location.pathname + location.search;
  return {
    hitType: 'pageview',
    page,
    title: 'PESto' // TODO: incorrectly uses the page title before transition
  };
};

// Map the event to a Redux action
const eventsMap = {
  [LOCATION_CHANGE]: pageView
};

export const analyticsMiddleware = () => {
  const propertyId = `${process.env.REACT_APP_GA_PROPERTY_ID}`;
  assert(propertyId, 'GA property id is missing');
  ReactGA.initialize(propertyId);
  return createMiddleware(eventsMap, GoogleAnalytics);
};
