import * as React from 'react';
import { render } from 'react-dom';

import { Actions, Home, ViewModel } from '.';
import { StaticRouter } from '../../__test__';

const props: ViewModel & Actions = {
  results: [],
  isLoading: false,
  search: jasmine.createSpy('search'),
  dispatch: jasmine.createSpy('dispatch')
};

describe('<Home>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(
      <StaticRouter>
        <Home {...props} />
      </StaticRouter>,
      div
    );
  });
});
