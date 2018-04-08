import * as React from 'react';
import { render } from 'react-dom';

import { ColoredPositionLabel, Props } from '.';
import { Position } from '../../shared/service/api';

const props: Props = {
  position: Position.CF
};

describe('<ColoredPositionLabel>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<ColoredPositionLabel {...props} />, div);
  });
});
