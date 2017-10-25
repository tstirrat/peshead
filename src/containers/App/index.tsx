import * as React from 'react';
import { Route, Link, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { State as GlobalState } from '../../reducers';
import * as app from './reducer';

import { League } from '../League';
import { Team } from '../Team';
import { Player } from '../Player';
import { ConnectedSearch } from '../Search';

import './App.css';

export interface Props {
  app: app.State;
}

export class App extends React.Component<Props & RouteProps, {}> {
  render() {
    return (
      <div className="App">
        <header>
          <Link to="/">Search</Link>
        </header>
        <Route exact={true} path="/" component={ConnectedSearch} />
        <Route exact={true} path="/league/:id" component={League} />
        <Route exact={true} path="/player/:id" component={Player} />
        <Route exact={true} path="/team/:id" component={Team} />
      </div>
    );
  }
}

function mapStateToProps(state: GlobalState) {
  return { app: state.app };
}

export const ConnectedApp = connect(mapStateToProps)(App);
