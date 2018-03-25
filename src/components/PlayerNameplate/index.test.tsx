import * as React from 'react';
import { render } from 'react-dom';

import { PlayerNameplate } from '.';
import { base } from '../../__test__/fixtures';
import { Player } from '../../shared/service/api';

const player = Player.create(base);

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<PlayerNameplate player={player} />, div);
});
