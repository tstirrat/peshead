import * as React from 'react';
import { render } from 'react-dom';
import { Home } from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <Home />,
    div);
});
