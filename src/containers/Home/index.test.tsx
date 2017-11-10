import * as React from 'react';
import { render } from 'react-dom';
import { StaticRouter } from 'react-router';
import { Home } from './index';

const context = {};

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <StaticRouter location="/" context={context}>
      <Home />
    </StaticRouter>,
    div);
});
