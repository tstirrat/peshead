import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { State as GlobalState } from '../../reducers';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import MenuIcon from 'material-ui-icons/Menu';

import * as app from '../../reducers/ui/app';
import { League } from '../League';
import { Team } from '../Team';
import { Player } from '../Player';
import { ConnectedSearch } from '../Search';

import './App.css';

export interface Props {
  app: app.State;
}

export interface State {
  showUserMenu: boolean;
}

export class App extends React.Component<Props & RouteProps, State> {
  render() {
    return (
      <div className="App">
        <AppBar>
          <Toolbar>
            <IconButton href="/players/7511" color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit">PES League Manager</Typography>
            <Button href="/players/7511" color="contrast">
              L. Messi
            </Button>
          </Toolbar>
        </AppBar>
        <div className="App-container">
          <Route exact={true} path="/" component={ConnectedSearch} />
          <Route exact={true} path="/leagues/:id" component={League} />
          <Route exact={true} path="/players/:id" component={Player} />
          <Route exact={true} path="/teams/:id" component={Team} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: GlobalState) {
  return { app: state.ui.app };
}

export const ConnectedApp = connect(mapStateToProps)(App);
