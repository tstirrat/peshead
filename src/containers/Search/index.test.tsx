import * as React from 'react';
import { render } from 'react-dom';
import { Search, ViewModel, Actions } from './index';
import { StaticRouter } from 'react-router-dom';

const props: ViewModel = {
  isLoading: false,
  results: [],
  params: {
    query: 'test'
  }
};

const actions: Actions = {
  search: jasmine.createSpy('search'),
  dispatch: jasmine.createSpy('dispatch')
};

const context = {};

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <StaticRouter location="/" context={context}>
      <Search {...props} {...actions} />
    </StaticRouter>,
    div
  );
});
