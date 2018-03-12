import { match } from 'react-router';
import { Store } from 'redux';

import { State } from '../reducers';
import { RouteGuard, RouteGuardResultType } from './react-route-guard';

export abstract class PreloadRouteGuard<P> implements RouteGuard {
  constructor(protected readonly store: Store<State>) {}

  shouldRoute(routeMatch: match<P>): RouteGuardResultType {
    return this.doPreload(routeMatch);
  }

  doPreload(router: match<P>): boolean {
    return true;
  }
}
