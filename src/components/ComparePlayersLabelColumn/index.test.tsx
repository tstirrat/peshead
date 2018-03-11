import * as React from 'react';
import { render } from 'react-dom';

import { ComparePlayersLabelColumn } from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<ComparePlayersLabelColumn />, div);
});
