import * as React from 'react';
import { render } from 'react-dom';

import { CalculatePositionRating, Props } from '.';
import { base } from '../../shared/__test__/fixtures';
import { Player, Position } from '../../shared/service/api';

const player = Player.create(base);

const props: Props = {
  player,
  position: Position.CF,
  render: rating => <div>{rating}</div>
};

describe('<CalculatePositionRating>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<CalculatePositionRating {...props} />, div);
  });
});
