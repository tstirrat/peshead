import { CircularProgress } from 'material-ui/Progress';
import * as React from 'react';
import { LoadingComponentProps } from 'react-loadable';
import * as Loadable from 'react-loadable';
import { pure } from 'recompose';
import { Fragment, Routes } from 'redux-little-router';

import { NotFound } from './containers/../components/NotFound';
import { League } from './containers/League';
import { Team } from './containers/Team';

const Loading = pure<LoadingComponentProps>(
  ({ error, pastDelay }) =>
    error ? <div>Error!</div> : pastDelay ? <CircularProgress /> : null
);

const AsyncHome = Loadable({
  loader: () => import('./containers/Home'),
  render: (mod, props) => {
    const Component = mod.ConnectedHome;
    return <Component {...props} />;
  },
  loading: Loading
});

const AsyncSearch = Loadable({
  loader: () => import('./containers/Search'),
  render: (mod, props) => {
    const Component = mod.ConnectedSearch;
    return <Component {...props} />;
  },
  loading: Loading
});

const AsyncPlayer = Loadable({
  loader: () => import('./containers/Player'),
  render: (mod, props) => {
    const Component = mod.ConnectedPlayer;
    return <Component {...props} />;
  },
  loading: Loading
});

const AsyncComparePlayers = Loadable({
  loader: () => import('./containers/ComparePlayers'),
  render: (mod, props) => {
    const Component = mod.ConnectedComparePlayers;
    return <Component {...props} />;
  },
  loading: Loading
});

export const routes = (
  <Fragment forRoute="/">
    <div>
      <Fragment forRoute="/">
        <AsyncHome />
      </Fragment>
      <Fragment forRoute="/search">
        <AsyncSearch />
      </Fragment>
      <Fragment forRoute="/leagues/:id">
        <League />
      </Fragment>
      <Fragment forRoute="/players/compare/(:player1)(/:player2)(/:player3)">
        <AsyncComparePlayers />
      </Fragment>
      <Fragment forRoute="/players/:id">
        <AsyncPlayer />
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
