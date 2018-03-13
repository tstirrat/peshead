import * as React from 'react';
import { SecureRoute as GuardedRoute } from './guards/react-route-guard';
import { Route, RouterChildContext, Switch } from 'react-router-dom';
import { Store } from 'redux';

import { NotFound } from './containers/../components/NotFound';
import { ConnectedComparePlayers } from './containers/ComparePlayers';
import { Home } from './containers/Home';
import { League } from './containers/League';
import { ConnectedPlayer } from './containers/Player';
import { ConnectedSearch } from './containers/Search';
import { Team } from './containers/Team';
import { PlayerRouteGuard } from './guards/player_route_guard';
import * as fromRoot from './reducers';

// tslint:disable-next-line:no-any
type Router<T = any> = RouterChildContext<T>['router'];

export const routes = (store: Store<fromRoot.State>) => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
    <Route exact={true} path="/search" component={ConnectedSearch} />
    <Route exact={true} path="/leagues/:id" component={League} />
    <GuardedRoute
      exact={true}
      path="/players/:id"
      component={ConnectedPlayer}
      routeGuard={new PlayerRouteGuard(store)}
    />
    <Route
      exact={true}
      path="/players/compare/:player1?/:player2?/:player3?"
      component={ConnectedComparePlayers}
    />
    <Route exact={true} path="/teams/:id" component={Team} />
    <Route exact={true} component={NotFound} />
  </Switch>
);
