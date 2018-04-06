import * as React from 'react';
import { Fragment, Routes } from 'redux-little-router';

import { NotFound } from './containers/../components/NotFound';
import { ConnectedComparePlayers } from './containers/ComparePlayers';
import { Home } from './containers/Home';
import { League } from './containers/League';
import { ConnectedPlayer } from './containers/Player';
import { ConnectedSearch } from './containers/Search';
import { Team } from './containers/Team';

export const routes = (
  <Fragment forRoute="/">
    <div>
      <Fragment forRoute="/">
        <Home />
      </Fragment>
      <Fragment forRoute="/search">
        <ConnectedSearch />
      </Fragment>
      <Fragment forRoute="/leagues/:id">
        <League />
      </Fragment>
      <Fragment forRoute="/players/compare/(:player1)(/:player2)(/:player3)">
        <ConnectedComparePlayers />
      </Fragment>
      <Fragment forRoute="/players/:id">
        <ConnectedPlayer />
      </Fragment>
      <Fragment forRoute="/teams/:id">
        <Team />
      </Fragment>
      <Fragment forNoMatch={true}>
        <NotFound />
      </Fragment>
    </div>
  </Fragment>
);

export const routeDefinition: Routes = {
  '/': {
    title: 'Home',

    '/search': { title: 'Search' },

    '/players': {
      '/compare/(:player1)(/:player2)(/:player3)': {
        title: 'Compare players'
      },
      '/:id': { title: 'Player' }
    },

    '/leagues': { title: 'Leagues' },
    '/teams': { title: 'Teams' }
  }
};
