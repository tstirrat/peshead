import * as React from 'react';
import { render } from 'react-dom';

import { ComparePlayersStatColumn } from '.';
import { StaticRouter } from '../../__test__';
import { base } from '../../shared/__test__/fixtures';
import { Player } from '../../shared/service/api';

const player = Player.create(base);

describe('<ComparePlayersStatColumn>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(
      <StaticRouter url="/players/compare/1/2">
        <ComparePlayersStatColumn player={player} />
      </StaticRouter>,
      div
    );
  });
});
