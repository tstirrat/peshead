import * as React from 'react';
import { render } from 'react-dom';

import { Actions, ComparePlayers, ViewModel } from '.';
import { getPlayer } from '../../actions/players';
import { PlayerForm } from '../../shared/utils/player';

const props: ViewModel = {
  players: [
    { id: '1', form: PlayerForm.A, level: 30, isLoading: true },
    { id: '2', form: PlayerForm.B, level: 31, isLoading: true }
  ]
};

const dispatch = jasmine.createSpy('dispatch');

const actions: Actions = {
  getPlayer,
  pushUrl: jest.fn(),
  replaceUrl: jest.fn(),
  dispatch
};

describe('<ComparePlayers>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<ComparePlayers {...props} {...actions} />, div);
  });
});
