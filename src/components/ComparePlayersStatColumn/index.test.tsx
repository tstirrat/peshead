import * as React from 'react';
import { render } from 'react-dom';

import { ComparePlayersStatColumn } from '.';
import { StaticRouter } from '../../__test__';
import { base } from '../../shared/__test__/fixtures';
import { AugmentedPlayer } from '../../shared/models/augmented_player';
import { Player } from '../../shared/service/api';

const player = new AugmentedPlayer(Player.create(base));
const compareTo = [player];

describe('<ComparePlayersStatColumn>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(
      <StaticRouter url="/players/compare/1/2">
        <ComparePlayersStatColumn player={player} compareTo={compareTo} />
      </StaticRouter>,
      div
    );
  });
});
