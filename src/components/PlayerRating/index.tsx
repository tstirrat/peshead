import * as React from 'react';

import { Player, IPlayerAbilities } from '../../shared/service/api';

export interface Props {
  player: Player;
  weights: IPlayerAbilities;
  render: (rating: number) => JSX.Element;
}

/**
 * Renders a player rating at a specific position.
 */
export class PlayerRating extends React.PureComponent<Props> {
  render() {
    const { player, weights } = this.props;

    const rating = calcRating(player, weights);
    return this.props.render(rating);
  }
}

/** calculate a rating given a set of stat weights. */
function calcRating(player: Player, weights: IPlayerAbilities): number {
  const BASE = 7;  // ?
  const rating = Object.keys(weights).reduce(
    (sum, stat) => {
      if (!player.abilities || !weights) {
        throw new Error('Player or weights are undefined');
      }
      if (stat in player.abilities) {
        const weight = (player.abilities[stat] - 25) * weights[stat];
        return sum + weight;
      }
      throw new Error(`Unknown stat: ${stat}`);
    },
    BASE
  );

  return Math.floor(rating);
}
