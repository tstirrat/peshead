import * as React from 'react';
import { pure } from 'recompose';

import { Player, Position } from '../../shared/service/api';
import { getPositionWeights } from '../../shared/utils/player';
import { PlayerRating } from '../PlayerRating';

export interface Props {
  player: Player;
  position: Position;
  render: (rating: number) => JSX.Element;
}

/**
 * Renders a player rating at a specific position.
 */
export const PlayerPositionRating = pure<Props>(
  ({ player, position, render }) => {
    const weights = getPositionWeights(position);
    return <PlayerRating player={player} weights={weights} render={render} />;
  }
);
