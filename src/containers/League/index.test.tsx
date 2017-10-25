import * as React from 'react';
import { render } from 'react-dom';
import { League } from './index';
import { StaticRouter } from 'react-router-dom';

const context = {};

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <StaticRouter location="/" context={context}>
      <League />
    </StaticRouter>,
    div);
});
