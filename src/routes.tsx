import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import { League } from './containers/League';
import { Team } from './containers/Team';
import { Home } from './containers/Home';
import { NotFound } from './containers/../components/NotFound';
import { ConnectedPlayer } from './containers/Player';
import { ConnectedSearch } from './containers/Search';

export const routes = (
  <Switch>
    <Route exact={true} path="/" component={Home} />
    <Route exact={true} path="/search" component={ConnectedSearch} />
    <Route exact={true} path="/leagues/:id" component={League} />
    <Route exact={true} path="/players/:id" component={ConnectedPlayer} />
    <Route exact={true} path="/teams/:id" component={Team} />
    <Route exact={true} component={NotFound} />
  </Switch>
);
