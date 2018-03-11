import * as React from 'react';
import { render } from 'react-dom';
import { Team } from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Team />, div);
});
