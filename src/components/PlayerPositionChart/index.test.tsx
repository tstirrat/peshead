import * as React from 'react';
import { render } from 'react-dom';

import { PlayerPositionChart, Props } from '.';
import { base } from '../../__test__/fixtures';
import { Player } from '../../shared/service/api';

const player = Player.create(base);

const props: Props = {
  player
};

describe('<PlayerPositionChart>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<PlayerPositionChart {...props} />, div);
  });
});
