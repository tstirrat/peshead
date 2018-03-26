import './App.css';

import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import HomeIcon from 'material-ui-icons/Home';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Toolbar from 'material-ui/Toolbar';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { connect, Dispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';

import * as fromApp from '../../actions/app';
import { SuggestPlayer } from '../../components/SuggestPlayer';
import { User } from '../../models/user';
import * as fromRoot from '../../reducers';
import { routes } from '../../routes';

interface ViewModel {
  user?: User;
}

interface Actions {
  login: typeof fromApp.login;
  logout: typeof fromApp.logout;
  loadSession: typeof fromApp.loadSession;
  pushUrl: typeof push;
  dispatch: Dispatch<fromRoot.State>;
}

interface State {
  anchorEl?: HTMLElement;
  open: boolean;
}

export class App extends React.PureComponent<ViewModel & Actions, State> {
  state: State = {
    open: false
  };

  componentDidMount() {
    this.props.loadSession();
  }

  render() {
    const { user } = this.props;
    return (
      <div className="App">
        <Helmet>
          <title>PESto</title>
        </Helmet>
        <AppBar>
          <Toolbar>
            <IconButton color="inherit" onClick={this.goHome}>
              <HomeIcon />
            </IconButton>
            <div className="search-input flex">
              <SuggestPlayer
                onSelect={this.handlePlayerSelect}
                onSearch={this.handleSearch}
              />
            </div>
            {user ? this.renderUser(user) : this.renderLoginButtons()}
          </Toolbar>
        </AppBar>
        <div className="App-container">
          <div>{routes}</div>
          <small className="canvas-controls center">
            Icons made by{' '}
            <a href="http://www.freepik.com" title="Freepik">
              Freepik
            </a>{' '}
            from{' '}
            <a href="https://www.flaticon.com/" title="Flaticon">
              flaticon.com
            </a>{' '}
            is licensed by{' '}
            <a
              href="http://creativecommons.org/licenses/by/3.0/"
              title="Creative Commons BY 3.0"
              target="_blank"
            >
              CC 3.0 BY
            </a>
          </small>
        </div>
      </div>
    );
  }

  renderUser(user: User) {
    return (
      <div className="session">
        <IconButton
          color="contrast"
          aria-owns={this.state.open ? 'user-menu' : null}
          aria-haspopup="true"
          onClick={this.openMenu}
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="user-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.closeMenu}
        >
          <MenuItem onClick={this.closeMenu}>{user.displayName}</MenuItem>
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

  private openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ open: true, anchorEl: event.currentTarget as HTMLElement });
  };

  private closeMenu = () => {
    this.setState({ open: false });
  };

  private login = (provider: string) => {
    this.props.login(provider);
  };

  private handlePlayerSelect = (id: string) => {
    this.props.pushUrl(`/players/${id}`);
  };

  private handleSearch = (query: string) => {
    this.props.pushUrl(`/search?query=${query}`);
  };

  private goHome = () => {
    this.props.pushUrl(`/`);
  };
}

const getViewModel = (
  state: fromRoot.State,
  // tslint:disable-next-line:no-any
  ownProps: RouteComponentProps<any>
): ViewModel => {
  const user = fromRoot.getCurrentUser(state);
  return {
    user
  };
};

const getActions = (dispatch: Dispatch<fromRoot.State>): Actions => {
  return {
    login: (provider: string, id?: string, password?: string) =>
      dispatch(fromApp.login(provider, id, password)),
    logout: () => dispatch(fromApp.logout()),
    loadSession: () => dispatch(fromApp.loadSession()),
    pushUrl: (location: string) => dispatch(push(location)),
    dispatch
  };
};

// tslint:disable-next-line:variable-name
export const ConnectedApp = withRouter(connect(getViewModel, getActions)(App));
