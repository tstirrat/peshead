import * as React from 'react';
import { render } from 'react-dom';

import { League } from '.';

describe('<League>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<League />, div);
  });
});
