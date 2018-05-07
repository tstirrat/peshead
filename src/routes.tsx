import { CircularProgress } from 'material-ui/Progress';
import * as React from 'react';
import { LoadingComponentProps } from 'react-loadable';
import * as Loadable from 'react-loadable';
import { pure } from 'recompose';
import { Fragment, Routes } from 'redux-little-router';

import { NotFound } from './containers/../components/NotFound';

const Loading = pure<LoadingComponentProps>(
  ({ error, pastDelay }) =>
    error ? <div>Error!</div> : pastDelay ? <CircularProgress /> : null
);

const AsyncHome = Loadable({
  loader: () => import('./containers/Home').then(mod => mod.ConnectedHome),
  loading: Loading
});

const AsyncSearch = Loadable({
  loader: () => import('./containers/Search').then(mod => mod.ConnectedSearch),
  loading: Loading
});

const AsyncPlayer = Loadable({
  loader: () => import('./containers/Player').then(mod => mod.ConnectedPlayer),
  loading: Loading
});

const AsyncComparePlayers = Loadable({
  loader: () =>
    import('./containers/ComparePlayers').then(
      mod => mod.ConnectedComparePlayers
    ),
  loading: Loading
});

const AsyncLeague = Loadable({
  loader: () => import('./containers/League').then(mod => mod.League),
  loading: Loading
});

const AsyncTeam = Loadable({
  loader: () => import('./containers/Team').then(mod => mod.Team),
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
        <AsyncLeague />
      </Fragment>
      <Fragment forRoute="/players/compare/*">
        <AsyncComparePlayers />
      </Fragment>
      <Fragment forRoute="/players/:id">
        <AsyncPlayer />
      </Fragment>
      <Fragment forRoute="/teams/:id">
        <AsyncTeam />
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
      '/compare/*': {
        title: 'Compare players'
      },
      '/:id': { title: 'Player' }
    },

    '/leagues': { title: 'Leagues' },
    '/teams': { title: 'Teams' }
  }
};
