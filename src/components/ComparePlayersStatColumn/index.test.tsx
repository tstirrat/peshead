import * as React from 'react';
import { render } from 'react-dom';

import { base } from '../../__test__/fixtures';
import { Player } from '../../shared/service/api';

import { ComparePlayersStatColumn } from './index';
import { StaticRouter } from 'react-router';

const player = Player.create(base);
const context = {};

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <StaticRouter location="/compare/players/1/2" context={context}>
      <ComparePlayersStatColumn player={player} />
    </StaticRouter>,
    div
  );
});
