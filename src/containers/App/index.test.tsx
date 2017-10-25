import * as React from 'react';
import configureMockStore from 'redux-mock-store';
import { render } from 'react-dom';
import { App } from './index';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const DEFAULT_PROPS = {
  app: {},
};

const context = {};

const mockStore = configureMockStore();

it('renders without crashing', () => {
  const store = mockStore({ search: {} });
  const div = document.createElement('div');
  render(
    <Provider store={store}>
      <StaticRouter location="/" context={context}>
        <App {...DEFAULT_PROPS} />
      </StaticRouter>
    </Provider>,
    div);
});
