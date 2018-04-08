import * as React from 'react';
import { pure } from 'recompose';
import styled from 'styled-components';

import { Player } from '../../shared/service/api';
import { CalculatePositionRating } from '../CalculatePositionRating';
import { ColoredPositionLabel } from '../ColoredPositionLabel';

export interface Props {
  player: Player;
  /** Should the rating value be shown? Defaults to `true` */
  showRating?: boolean;
  className?: string;
}

/** Shows a dark badge with colored position and associated rating. */
const Badge = pure<Props>(({ player, className, showRating }) => (
  <div className={className}>
    <ColoredPositionLabel position={player.registeredPosition} />{' '}
    {showRating ? (
      <CalculatePositionRating
        player={player}
        position={player.registeredPosition}
        render={rating => <span className="rating">{rating}</span>}
      />
    ) : null}
  </div>
));

export const PlayerPositionRatingBadge = styled(Badge)`
  align-items: center;
  background-color: #283138;
  border-radius: 1px;
  color: white;
  display: inline-flex;
  font-size: 16px;
  justify-content: space-between;
  min-width: ${props => (props.showRating ? '64px' : '')};
  padding: 0 4px;
`;
