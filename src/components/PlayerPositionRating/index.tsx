import * as React from 'react';

import { IPlayerAbilities, Player, Position } from '../../shared/service/api';
import { PlayerRating } from '../PlayerRating';

export interface Props {
  player: Player;
  position: Position;
  render: (rating: number) => JSX.Element;
}

/**
 * Renders a player rating at a specific position.
 */
export class PlayerPositionRating extends React.PureComponent<Props> {
  render() {
    const { player, position, render } = this.props;

    const weights = getPositionWeights(position);
    return <PlayerRating player={player} weights={weights} render={render} />;
  }
}

const POSITION_WEIGHTS: { [pos: string]: Partial<IPlayerAbilities> } = {
  [Position.CENTRE_FORWARD]: {
    attackingProwess: 0.33,
    ballControl: 0.25,
    dribbling: 0.15,
    finishing: 0.38,
    header: 0.03,
    speed: 0.05,
    explosivePower: 0.05,
    bodyControl: 0.1,
    jump: 0.03
  },

  [Position.GOALKEEPER]: {
    goalkeeping: 0.52,
    reflexes: 0.52,
    bodyControl: 0.12,
    jump: 0.12
  },

  [Position.SECOND_STRIKER]: {
    attackingProwess: 0.16,
    ballControl: 0.2,
    dribbling: 0.2,
    lowPass: 0.1,
    loftedPass: 0.1,
    finishing: 0.15,
    kickingPower: 0.06,
    speed: 0.1,
    explosivePower: 0.2,
    bodyControl: 0.07,
    stamina: 0.04
  },

  [Position.CENTRE_BACK]: {
    header: 0.2,
    defensiveProwess: 0.27,
    ballWinning: 0.27,
    speed: 0.11,
    bodyControl: 0.21,
    jump: 0.21,
    stamina: 0.1
  },

  [Position.DEFENSIVE_MIDFIELDER]: {
    attackingProwess: 0.07,
    ballControl: 0.19,
    dribbling: 0.16,
    lowPass: 0.19,
    loftedPass: 0.2,
    swerve: 0.13,
    defensiveProwess: 0.07,
    ballWinning: 0.03,
    speed: 0.03,
    explosivePower: 0.03,
    bodyControl: 0.14,
    jump: 0.05,
    stamina: 0.15
  },

  [Position.CENTRE_MIDFIELDER]: {
    attackingProwess: 0.05,
    ballControl: 0.25,
    dribbling: 0.25,
    lowPass: 0.25,
    loftedPass: 0.22,
    defensiveProwess: 0.03,
    speed: 0.04,
    explosivePower: 0.06,
    bodyControl: 0.05,
    stamina: 0.18
  },

  [Position.ATTACKING_MIDFIELDER]: {
    attackingProwess: 0.15,
    ballControl: 0.23,
    dribbling: 0.23,
    lowPass: 0.23,
    loftedPass: 0.15,
    finishing: 0.18,
    speed: 0.05,
    explosivePower: 0.07,
    bodyControl: 0.05,
    stamina: 0.03
  },

  [Position.RIGHT_MIDFIELDER]: {
    attackingProwess: 0.07,
    ballControl: 0.16,
    dribbling: 0.26,
    lowPass: 0.07,
    loftedPass: 0.13,
    swerve: 0.04,
    speed: 0.26,
    explosivePower: 0.23,
    stamina: 0.14
  },

  [Position.RIGHT_BACK]: {
    attackingProwess: 0.06,
    ballControl: 0.1,
    dribbling: 0.15,
    loftedPass: 0.15,
    defensiveProwess: 0.15,
    ballWinning: 0.14,
    speed: 0.15,
    explosivePower: 0.15,
    bodyControl: 0.12,
    jump: 0.12,
    stamina: 0.13
  },

  [Position.RIGHT_WING_FORWARD]: {
    attackingProwess: 0.18,
    ballControl: 0.22,
    dribbling: 0.22,
    lowPass: 0.05,
    loftedPass: 0.1,
    finishing: 0.12,
    kickingPower: 0.05,
    speed: 0.16,
    explosivePower: 0.16,
    bodyControl: 0.06,
    stamina: 0.06
  }
};

POSITION_WEIGHTS[Position.LEFT_MIDFIELDER] =
  POSITION_WEIGHTS[Position.RIGHT_MIDFIELDER];
POSITION_WEIGHTS[Position.LEFT_WING_FORWARD] =
  POSITION_WEIGHTS[Position.RIGHT_WING_FORWARD];
POSITION_WEIGHTS[Position.LEFT_BACK] = POSITION_WEIGHTS[Position.RIGHT_BACK];

/** Return raw stat weights for a position. */
function getPositionWeights(position: Position): Partial<IPlayerAbilities> {
  if (position in POSITION_WEIGHTS) {
    return POSITION_WEIGHTS[position];
  } else {
    throw new Error(`Unknown position: ${position}`);
  }
}
