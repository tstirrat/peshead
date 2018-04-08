import * as React from 'react';
import { pure } from 'recompose';

import { Position } from '../../shared/service/api';
import { PositionLabel } from '../../shared/utils/player';
import { Wrapper } from './styles';

export interface Props {
  position: Position;
}

/**
 * Renders a player's position with the correct color.
 */
export const ColoredPositionLabel = pure<Props>(({ position }) => {
  const posLabel = PositionLabel[position];
  const positionClass = posLabel.toLowerCase();
  return (
    <Wrapper>
      <span className={positionClass}>{posLabel}</span>
    </Wrapper>
  );
});
