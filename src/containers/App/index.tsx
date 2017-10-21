import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';
import { State as GlobalState } from '../../reducers';

import League from '../League';
import Team from '../Team';
import Player from '../Player';
import Search from '../Search';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <Link to="/">Search</Link>
        </header>
        <Route exact={true} path="/" component={Search} />
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

export default connect(mapStateToProps, App);
