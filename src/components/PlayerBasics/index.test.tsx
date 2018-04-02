import * as React from 'react';
import { render } from 'react-dom';

import { PlayerBasics } from '.';
import { base } from '../../__test__/fixtures';
import { Player } from '../../shared/service/api';

const player = Player.create(base);

describe('<PlayerBasics>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<PlayerBasics player={player} />, div);
  });
});
