import * as React from 'react';
import { Route, withRouter, Switch, NavLink } from 'react-router-dom';
import { connect, Dispatch } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import MenuIcon from 'material-ui-icons/Menu';

import { League } from '../League';
import { Team } from '../Team';
import { Home } from '../Home';
import { User } from '../../models/user';
import * as fromRoot from '../../reducers';
import * as fromApp from '../../actions/app';
import { NotFound } from '../../components/NotFound';
import { ConnectedPlayer } from '../Player';
import { ConnectedSearch } from '../Search';

import './App.css';

interface ViewModel {
  user?: User;
}

interface Actions {
  login: typeof fromApp.login;
  logout: typeof fromApp.logout;
  loadSession: typeof fromApp.loadSession;
  dispatch: Dispatch<fromRoot.State>;
}

interface State {
  anchorEl?: HTMLElement;
  open: boolean;
}

export class App extends React.PureComponent<ViewModel & Actions, State> {
  state: State = {
    open: false,
  };

  componentDidMount() {
    this.props.loadSession();
  }

  render() {
    const { user } = this.props;
    return (
      <div className="App">
        <AppBar>
          <Toolbar>
            <IconButton color="contrast">
              <MenuIcon />
            </IconButton>
            <NavLink to="/">
              <Typography type="title" color="inherit">PES League Manager</Typography>
            </NavLink>
            <div className="flex" />
            {user ? this.renderUser(user) : this.renderLoginButtons()}
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

  renderUser(user: User) {
    return (
      <div className="session">
        <Button
          color="contrast"
          aria-owns={this.state.open ? 'user-menu' : null}
          aria-haspopup="true"
          onClick={this.openMenu}
        >
          {user.displayName}
        </Button>
        <Menu
          id="user-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.closeMenu}
        >
          <MenuItem onClick={this.closeMenu}>Profile</MenuItem>
          <MenuItem onClick={this.props.logout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }

  renderLoginButtons() {
    return (
      <Button color="contrast" onClick={this.login.bind(this, 'google')}>
        Google
      </Button>
    );
  }

  // tslint:disable-next-line:no-any ugh, fix this
  private openMenu = (event: any) => {
    this.setState({ open: true, anchorEl: event.currentTarget as HTMLElement });
  }

  private closeMenu = () => {
    this.setState({ open: false });
  }

  private login = (provider: string) => {
    this.props.login(provider);
  }
}

const getViewModel = (state: fromRoot.State): ViewModel => {
  const user = fromRoot.getCurrentUser(state);
  return {
    user,
  };
};

const getActions = (dispatch: Dispatch<fromRoot.State>): Actions => {
  return {
    login: (provider: string, id?: string, password?: string) =>
      dispatch(fromApp.login(provider, id, password)),
    logout: () => dispatch(fromApp.logout()),
    loadSession: () => dispatch(fromApp.loadSession()),
    dispatch,
  };
};

// tslint:disable-next-line:variable-name
export const ConnectedApp = withRouter(connect(getViewModel, getActions)(App));
