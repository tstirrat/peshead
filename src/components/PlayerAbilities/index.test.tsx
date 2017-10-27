import * as React from 'react';
import { render } from 'react-dom';

import { player } from '../../__test__/fixtures';

import { PlayerAbilities } from './index';


it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <PlayerAbilities player={player} />,
    div);
});
