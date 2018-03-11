import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { ConnectedApp } from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider } from 'material-ui/styles';
import store, { history } from './configureStore';
import { createMuiTheme } from 'material-ui/styles';
import { teal, red, blueGrey } from 'material-ui/colors';
import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: {
      ...teal,
      A400: '#00e677'
    },
    error: red
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ConnectedApp />
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
