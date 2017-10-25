import * as React from 'react';
import configureMockStore from 'redux-mock-store';
import { render } from 'react-dom';
import { Search, Props } from './index';
import { initialState } from './reducer';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const DEFAULT_PROPS: Props = {
  search: initialState,
};

const mockStore = configureMockStore();

it('renders without crashing', () => {
  const store = mockStore({ search: {} });
  const div = document.createElement('div');
  render(
    <Provider store={store}>
      <StaticRouter>
        <Search {...DEFAULT_PROPS} />
      </StaticRouter>
    </Provider>,
    div);
});
