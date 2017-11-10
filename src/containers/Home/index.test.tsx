import * as React from 'react';
import { render } from 'react-dom';
import { StaticRouter } from 'react-router';
import { Home, Props } from './index';

const context = {};
const props = {
  match: {},
} as Props;

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <StaticRouter location="/" context={context}>
      <Home {...props} />
    </StaticRouter>,
    div);
});
