import { pure } from 'recompose';

import { IPlayerAbilities, Player } from '../../shared/service/api';
import { getWeightedRating } from '../../shared/utils/player';

export interface Props {
  player: Player;
  weights: Partial<IPlayerAbilities>;
  render: (rating: number) => JSX.Element;
}

/**
 * Renders a player rating at a specific position.
 */
export const PlayerRating = pure<Props>(({ player, weights, render }) => {
  const rating = getWeightedRating(player, weights);
  return render(rating);
});
