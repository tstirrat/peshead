import * as React from 'react';
import { render } from 'react-dom';

import { base } from '../../__test__/fixtures';
import { Player } from '../../shared/service/api';

import { PlayerBasics } from './index';

const player = Player.create(base);

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <PlayerBasics player={player} />,
    div);
});
