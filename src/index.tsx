import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { ConnectedApp } from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider } from 'material-ui/styles';
import store, { history } from './configureStore';
import './index.css';

// const theme = createMuiTheme({
//   palette: {
//     primary: purple, // Purple and green play nicely together.
//     secondary: {
//       ...green,
//       A400: '#00e677',
//     },
//     error: red,
//   },
// });

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ConnectedApp />
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
