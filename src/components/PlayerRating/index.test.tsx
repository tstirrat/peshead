import * as React from 'react';
import { render } from 'react-dom';

import { PlayerRating, Props } from '.';
import { base } from '../../shared/__test__/fixtures';
import { Player } from '../../shared/service/api';

const player = Player.create(base);

const props: Props = {
  player,
  weights: {
    kickingPower: 0.6,
    finishing: 0.4
  },
  render: rating => <div>{rating}</div>
};

describe('<PlayerRating>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<PlayerRating {...props} />, div);
  });
});
