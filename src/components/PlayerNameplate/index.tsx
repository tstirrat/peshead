import Typography from 'material-ui/Typography';
import * as React from 'react';
import { pure } from 'recompose';

import { Player } from '../../shared/service/api';
import { PlayingStyleLabel } from '../../shared/utils/player';
import { PlayerPositionRatingBadge } from '../PlayerPositionRatingBadge';
import { Wrapper } from './styles';

export interface Props {
  player: Player;
}

export const PlayerNameplate = pure<Props>(({ player }) => (
  <Wrapper>
    <img className="image" src="/player-avatar.png" alt="player image" />
    <div className="details">
      <Typography type="title" className="name">
        {player.name}
      </Typography>
      <div className="vitals">
        <PlayerPositionRatingBadge player={player} showRating={true} />{' '}
        {player.playingStyle ? (
          <span>{PlayingStyleLabel[player.playingStyle]}</span>
        ) : null}
      </div>
    </div>
  </Wrapper>
));
