import * as React from 'react';
import configureMockStore from 'redux-mock-store';
import { render } from 'react-dom';
import { Search, Props } from './index';
import { initialState } from '../../reducers/search';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const DEFAULT_PROPS: Props = {
  search: initialState,
};

const mockStore = configureMockStore();

const context = {};

it('renders without crashing', () => {
  const store = mockStore({ search: {} });
  const div = document.createElement('div');
  render(
    <Provider store={store}>
      <StaticRouter location="/" context={context}>
        <Search {...DEFAULT_PROPS} />
      </StaticRouter>
    </Provider>,
    div);
});
