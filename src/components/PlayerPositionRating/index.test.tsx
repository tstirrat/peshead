import * as React from 'react';
import { render } from 'react-dom';

import { base } from '../../__test__/fixtures';
import { Player, Position } from '../../shared/service/api';

import { PlayerPositionRating, Props } from './index';

const player = Player.create(base);

const props: Props = {
  player,
  position: Position.CENTRE_FORWARD,
  render: rating => <div>{rating}</div>,
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <PlayerPositionRating {...props} />,
    div);
});
