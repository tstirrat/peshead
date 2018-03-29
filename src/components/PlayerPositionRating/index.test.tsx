import * as React from 'react';
import { render } from 'react-dom';

import { PlayerPositionRating, Props } from '.';
import { base } from '../../__test__/fixtures';
import { Player, Position } from '../../shared/service/api';

const player = Player.create(base);

const props: Props = {
  player,
  position: Position.CF,
  render: rating => <div>{rating}</div>
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<PlayerPositionRating {...props} />, div);
});
