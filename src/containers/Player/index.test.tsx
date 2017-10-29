import * as React from 'react';
import { render } from 'react-dom';
import { Player } from './index';
import { Player as PlayerModel } from '../../shared/service/api';
import * as players from '../../actions/players';

import { base } from '../../__test__/fixtures';

const player = PlayerModel.create(base);

const props = {
  id: '1',
  player,
  isLoading: false,
};

const dispatch = jasmine.createSpy('dispatch');

const actions = {
  getPlayer: players.getPlayer,
  dispatch,
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <Player {...props} {...actions} />,
    div);
});
