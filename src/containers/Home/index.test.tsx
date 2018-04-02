import * as React from 'react';
import { render } from 'react-dom';

import { Home } from '.';
import { StaticRouter } from '../../__test__';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <StaticRouter>
      <Home />
    </StaticRouter>,
    div
  );
});
