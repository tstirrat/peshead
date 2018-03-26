import { Location } from 'history';
import * as ReactGA from 'react-ga';
import { LOCATION_CHANGE, LocationChangeAction } from 'react-router-redux';
import { createMiddleware } from 'redux-beacon';
import { GoogleAnalytics, PageView } from 'redux-beacon/targets/google-analytics';

/** Standard router location change -> pageview */
const pageView = (action: LocationChangeAction): PageView => {
  const location: Location = action.payload;
  const page = location.pathname + location.search;
  return {
    hitType: 'pageview',
    page
  };
};

// Map the event to a Redux action
const eventsMap = {
  [LOCATION_CHANGE]: pageView
};

export const analyticsMiddleware = () => {
  // tslint:disable-next-line:no-console
  console.log(`property: ${process.env.GA_PROPERTY_ID}`);
  ReactGA.initialize(`${process.env.GA_PROPERTY_ID}`);
  return createMiddleware(eventsMap, GoogleAnalytics);
};
