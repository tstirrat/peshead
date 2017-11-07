import * as React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import MenuIcon from 'material-ui-icons/Menu';

import { League } from '../League';
import { Team } from '../Team';
import { Home } from '../Home';
import { NotFound } from '../../components/NotFound';
import { ConnectedPlayer } from '../Player';
import { ConnectedSearch } from '../Search';

import './App.css';

export class App extends React.PureComponent {
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
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/search" component={ConnectedSearch} />
            <Route exact={true} path="/leagues/:id" component={League} />
            <Route exact={true} path="/players/:id" component={ConnectedPlayer} />
            <Route exact={true} path="/teams/:id" component={Team} />
            <Route exact={true} component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

// tslint:disable-next-line:variable-name
export const ConnectedApp = withRouter(App);
