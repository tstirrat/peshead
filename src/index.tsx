import './index.css';

import { blue, red, teal } from 'material-ui/colors';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './configureStore';
import { ConnectedApp } from './containers/App';
import registerServiceWorker from './registerServiceWorker';

const theme = createMuiTheme({
  palette: {
    primary: blue,
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
      <ConnectedApp />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
