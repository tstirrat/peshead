import * as React from 'react';
import { render } from 'react-dom';

import { Actions, ComparePlayers, ViewModel } from '.';
import { getPlayer } from '../../actions/players';

const props: ViewModel = {
  players: [
    { id: '1', form: 'A', level: 30, isLoading: true },
    { id: '2', form: 'B', level: 31, isLoading: true }
  ]
};

const dispatch = jasmine.createSpy('dispatch');

const actions: Actions = {
  getPlayer,
  dispatch
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<ComparePlayers {...props} {...actions} />, div);
});
