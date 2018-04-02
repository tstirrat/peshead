import * as React from 'react';
import { render } from 'react-dom';

import { App } from '.';
import { StaticRouter } from '../../__test__/StaticRouter';

const props = {
  login: jasmine.createSpy('login'),
  logout: jasmine.createSpy('logout'),
  loadSession: jasmine.createSpy('loadSession'),
  dispatch: jasmine.createSpy('dispatch'),
  pushUrl: jasmine.createSpy('history.push')
};

describe('<App>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(
      <StaticRouter>
        <App {...props} />
      </StaticRouter>,
      div
    );
  });
});
