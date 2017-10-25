import * as React from 'react';
import { render } from 'react-dom';
import { League } from './index';
import { StaticRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <StaticRouter>
      <League />
    </StaticRouter>,
    div);
});
