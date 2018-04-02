import * as React from 'react';
import { render } from 'react-dom';

import { Actions, Search, ViewModel } from '.';

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

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Search {...props} {...actions} />, div);
});
