import * as React from 'react';
import { render } from 'react-dom';

import { base } from '../../__test__/fixtures';
import { Player } from '../../shared/service/api';

import { PlayerPositionChart, Props } from './index';

const player = Player.create(base);

const props: Props = {
  player,
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <PlayerPositionChart {...props} />,
    div);
});
