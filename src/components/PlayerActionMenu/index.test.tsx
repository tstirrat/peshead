import * as React from 'react';
import { render } from 'react-dom';

import { PlayerActionMenu } from '.';
import { StaticRouter } from '../../__test__';
import { base } from '../../__test__/fixtures';
import { Player } from '../../shared/service/api';

const player = Player.create(base);

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <StaticRouter url="/players/1">
      <PlayerActionMenu player={player} />
    </StaticRouter>,
    div
  );
});
