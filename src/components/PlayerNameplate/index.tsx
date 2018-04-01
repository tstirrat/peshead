import Typography from 'material-ui/Typography';
import * as React from 'react';
import { pure } from 'recompose';
import styled from 'styled-components';

import { Player } from '../../shared/service/api';
import { PlayingStyleLabel, PositionLabel } from '../../shared/utils/player';
import { PlayerPositionRating } from '../PlayerPositionRating';

export interface Props {
  player: Player;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .image {
    max-height: 48px;
  }

  .details {
    flex: 1;
    color: rgba(0, 0, 0, 0.54);
  }
`;

export const PlayerNameplate = pure<Props>(({ player }) => (
  <Wrapper>
    <img className="image" src="/player-avatar.png" alt="player image" />
    <div className="details">
      <Typography type="title" className="name">
        {player.name}
      </Typography>
      <Typography className="details">
        <span className="position">
          {PositionLabel[player.registeredPosition]}
        </span>{' '}
        <PlayerPositionRating
          player={player}
          position={player.registeredPosition}
          render={rating => <span className="Player-rating">{rating}</span>}
        />
        {' | '}
        {PlayingStyleLabel[player.playingStyle]}
      </Typography>
    </div>
  </Wrapper>
));
