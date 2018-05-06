import AppBar from 'material-ui/AppBar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Toolbar from 'material-ui/Toolbar';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { connect, Dispatch } from 'react-redux';
import { push } from 'redux-little-router';

import * as fromApp from '../../actions/app';
import { SuggestPlayer } from '../../components/SuggestPlayer';
import { User } from '../../models/user';
import * as fromRoot from '../../reducers';
import { routes } from '../../routes';
import { AppContainer, AppRoot, CanvasControls, ToolbarSearchContainer } from './styles';

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
      <AppRoot>
        <Helmet>
          <title>PEShead</title>
        </Helmet>
        <AppBar>
          <Toolbar>
            <IconButton color="inherit" onClick={this.goHome}>
              <Icon>home</Icon>
            </IconButton>
            <ToolbarSearchContainer>
              <SuggestPlayer
                onSelect={this.handlePlayerSelect}
                onSearch={this.handleSearch}
              />
            </ToolbarSearchContainer>
            {user ? this.renderUser(user) : this.renderLoginButtons()}
          </Toolbar>
        </AppBar>
        <AppContainer>
          <div>{routes}</div>
          <CanvasControls className="center">
            <p>
              Volleyball icon by{' '}
              <a href="http://www.freepik.com" title="Freepik">
                Freepik
              </a>{' '}
              from{' '}
              <a
                href="https://www.flaticon.com/free-icon/volleyball_772289"
                title="Flaticon"
              >
                flaticon.com
              </a>{' '}
              is licensed under{' '}
              <a
                href="http://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
                target="_blank"
              >
                CC 3.0 BY
              </a>
            </p>
            <p>
              Free Country Flags by{' '}
              <a href="http://www.free-country-flags.com/">
                Gang of the Coconuts
              </a>{' '}
              is licensed under{' '}
              <a
                href="http://creativecommons.org/licenses/by-sa/3.0/"
                title="Creative Commons BY-SA 3.0"
                target="_blank"
              >
                CC 3.0 BY-SA
              </a>
            </p>
          </CanvasControls>
        </AppContainer>
      </AppRoot>
    );
  }

  private renderUser(user: User) {
    return (
      <div className="session">
        <IconButton
          aria-owns={this.state.open ? 'user-menu' : undefined}
          aria-haspopup="true"
          onClick={this.openMenu}
          color="inherit"
        >
          <Icon>account_circle</Icon>
        </IconButton>
        <Menu
          id="user-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.closeMenu}
        >
          <MenuItem onClick={this.closeMenu}>{user.displayName}</MenuItem>
          <MenuItem onClick={this.props.logout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }

  private renderLoginButtons() {
    return (
      <IconButton color="inherit" onClick={this.login.bind(this, 'google')}>
        <Icon>account_circle</Icon>
      </IconButton>
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
    this.props.pushUrl(`/players/${id}`, {});
  };

  private handleSearch = (query: string) => {
    this.props.pushUrl(`/search?query=${query}`, {});
  };

  private goHome = () => {
    this.props.pushUrl(`/`, {});
  };
}

const getViewModel = (state: fromRoot.State): ViewModel => {
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
    pushUrl: (location: string) => dispatch(push(location, {})),
    dispatch
  };
};

// tslint:disable-next-line:variable-name
export const ConnectedApp = connect(getViewModel, getActions)(App);
