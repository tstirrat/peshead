import * as React from 'react';
import { render } from 'react-dom';

import { PlayerPositionRatingBadge } from '.';
import { base } from '../../__test__/fixtures';
import { Player } from '../../shared/service/api';

const player = Player.create(base);

describe('<PlayerPositionRatingBadge>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<PlayerPositionRatingBadge player={player} />, div);
  });
});
