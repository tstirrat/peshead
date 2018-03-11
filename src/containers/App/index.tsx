import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect, Dispatch } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import MenuIcon from 'material-ui-icons/Menu';
import { History } from 'history';

import * as fromApp from '../../actions/app';
import { SuggestPlayer } from '../../components/SuggestPlayer';
import { User } from '../../models/user';
import * as fromRoot from '../../reducers';
import { routes } from '../../routes';

import './App.css';
import { RouteComponentProps } from 'react-router';

interface ViewModel {
  user?: User;
  history: History;
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
    open: false
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
            <IconButton color="accent">
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit">
              PES League Manager
            </Typography>
            <div className="search-input flex">
              <SuggestPlayer onSelect={this.handlePlayerSelect} />
            </div>
            {user ? this.renderUser(user) : this.renderLoginButtons()}
          </Toolbar>
        </AppBar>
        <div className="App-container">{routes}</div>
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
    this.props.history.push(`/players/${id}`);
  };
}

const getViewModel = (
  state: fromRoot.State,
  // tslint:disable-next-line:no-any
  ownProps: RouteComponentProps<any>
): ViewModel => {
  const user = fromRoot.getCurrentUser(state);
  return {
    user,
    history: ownProps.history
  };
};

const getActions = (dispatch: Dispatch<fromRoot.State>): Actions => {
  return {
    login: (provider: string, id?: string, password?: string) =>
      dispatch(fromApp.login(provider, id, password)),
    logout: () => dispatch(fromApp.logout()),
    loadSession: () => dispatch(fromApp.loadSession()),
    dispatch
  };
};

// tslint:disable-next-line:variable-name
export const ConnectedApp = withRouter(connect(getViewModel, getActions)(App));
