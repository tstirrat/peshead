import * as React from 'react';
import { render } from 'react-dom';

import { base } from '../../__test__/fixtures';
import { Player } from '../../shared/service/api';

import { PlayerRating, Props } from './index';

const player = Player.create(base);

const props: Props = {
  player,
  weights: {
    kickingPower: 0.60,
    finishing: 0.40,
  },
  render: rating => <div>{rating}</div>,
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <PlayerRating {...props} />,
    div);
});
