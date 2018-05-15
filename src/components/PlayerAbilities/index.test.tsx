import * as React from 'react';
import { render } from 'react-dom';

import { PlayerAbilities } from '.';
import { base } from '../../shared/__test__/fixtures';
import { Player } from '../../shared/service/api';

const player = Player.create(base);

describe('<PlayerAbilities>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<PlayerAbilities player={player} level={29} />, div);
  });
});
