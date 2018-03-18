import * as React from 'react';
import { render } from 'react-dom';
import { push } from 'react-router-redux';

import { Player } from '.';
import { base } from '../../__test__/fixtures';
import * as players from '../../actions/players';
import { Player as PlayerModel } from '../../shared/service/api';

const player = PlayerModel.create(base);

const props = {
  id: '1',
  player,
  isLoading: false
};

const dispatch = jasmine.createSpy('dispatch');

const actions = {
  getPlayer: players.getPlayer,
  push,
  dispatch
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Player {...props} {...actions} />, div);
});
