import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import { Link } from 'redux-little-router';

import { Playable, Player } from '../../shared/service/api';
import {
  AbilityFlags,
  getPositionRating,
  getTotalStats,
  PlayingStyleLabel,
  SIMPLE_ABILITIES,
} from '../../shared/utils/player';
import { PlayableLabel, POSITION_LIST, PositionLabel } from '../../shared/utils/position';
import { CalculatePositionRating } from '../CalculatePositionRating';
import { ColoredPositionLabel } from '../ColoredPositionLabel';
import { Column } from '../ComparePlayersLabelColumn/styles';
import { CountryFlag } from '../CountryFlag';
import { FootChart } from '../FootChart';
import { PlayerStat } from '../PlayerStat';
import { Avatar, EllipsizedLink, Header, StyledStat } from './styles';

export interface Props {
  player: Player;
  highlights?: AbilityFlags;
  onDelete?: (id: string) => void;
}

export class ComparePlayersStatColumn extends React.PureComponent<Props> {
  render() {
    const { player, highlights = {} } = this.props;
    return (
      <Column>
        <StyledStat>
          <ListItem>
            <IconButton
              aria-label="Delete"
              onClick={this.handleDelete}
              disableRipple={true}
            >
              <Icon>remove_circle</Icon>
            </IconButton>
          </ListItem>
        </StyledStat>

        <Divider />
        <Header>
          <Link href={`/players/${player.id}`}>
            <Avatar src="/player-avatar.png" alt="player image" />
          </Link>
          <EllipsizedLink href={`/players/${player.id}`}>
            {player.name}
          </EllipsizedLink>
        </Header>

        <StyledStat>
          <Divider />
          <ListItem>
            <Typography variant="subheading">{player.age}</Typography>
          </ListItem>
        </StyledStat>
        <Divider />

        <StyledStat>
          <ListItem>
            <CountryFlag countryId={player.nationality} />
          </ListItem>
        </StyledStat>

        <StyledStat>
          <Divider />
          <ListItem>
            <Typography variant="subheading">
              {player.physique.height}cm
            </Typography>
          </ListItem>
        </StyledStat>

        <StyledStat>
          <Divider />
          <ListItem>
            <Typography variant="subheading">
              {player.physique.weight}kg
            </Typography>
          </ListItem>
        </StyledStat>

        <StyledStat>
          <Divider />
          <ListItem>
            <Typography variant="subheading">
              <FootChart player={player} />
            </Typography>
          </ListItem>
        </StyledStat>

        <StyledStat>
          <Divider />
          <ListItem>
            <Typography variant="subheading">
              <ColoredPositionLabel position={player.registeredPosition} />
            </Typography>
          </ListItem>
        </StyledStat>

        <StyledStat>
          <Divider />
          <ListItem>
            <Typography variant="subheading">
              {PlayingStyleLabel[player.playingStyle] || '-'}
            </Typography>
          </ListItem>
        </StyledStat>

        <StyledStat>
          <Divider />
          <ListItem>
            <CalculatePositionRating
              player={player}
              position={player.registeredPosition}
              render={rating => <PlayerStat value={rating} />}
            />
          </ListItem>
        </StyledStat>

        <StyledStat>
          <Divider />
          <ListItem>
            <Typography variant="subheading">
              {getTotalStats(player)}
            </Typography>
          </ListItem>
        </StyledStat>

        {SIMPLE_ABILITIES.map(key => (
          <StyledStat key={key} role={highlights[key] ? 'highest' : ''}>
            <Divider />
            <ListItem>
              <PlayerStat value={player.abilities![key]!} />
            </ListItem>
          </StyledStat>
        ))}

        <StyledStat role={highlights.weakFootUsage ? 'highest' : ''}>
          <Divider />
          <ListItem>
            <PlayerStat value={player.abilities!.weakFootUsage!} maxValue={4} />
          </ListItem>
        </StyledStat>

        <StyledStat role={highlights.weakFootAccuracy ? 'highest' : ''}>
          <Divider />
          <ListItem>
            <PlayerStat
              value={player.abilities!.weakFootAccuracy!}
              maxValue={4}
            />
          </ListItem>
        </StyledStat>

        <StyledStat role={highlights.form ? 'highest' : ''}>
          <Divider />
          <ListItem>
            <PlayerStat value={player.abilities!.form!} maxValue={8} />
          </ListItem>
        </StyledStat>

        <StyledStat role={highlights.injuryResistance ? 'highest' : ''}>
          <Divider />
          <ListItem>
            <PlayerStat
              value={player.abilities!.injuryResistance!}
              maxValue={4}
            />
          </ListItem>
        </StyledStat>

        {/* Positions heading == blank */}
        <StyledStat>
          <Divider />
          <ListItem />
        </StyledStat>

        {this.renderPositionRatings()}
      </Column>
    );
  }

  private renderPositionRatings() {
    const { player } = this.props;
    return POSITION_LIST.map(position => {
      const rating = getPositionRating(player, position);

      const key = PositionLabel[position].toLowerCase();
      const strength: Playable =
        player.playablePositions && player.playablePositions[key]
          ? player.playablePositions[key]
          : Playable.C;
      const strLabel =
        strength > Playable.C ? PlayableLabel[strength] : undefined;
      const isFaded = strength < Playable.B;

      return (
        <StyledStat key={key}>
          <Divider />
          <ListItem>
            <Typography variant="subheading">
              <PlayerStat value={rating} fade={isFaded} badgeText={strLabel} />
            </Typography>
          </ListItem>
        </StyledStat>
      );
    });
  }

  private handleDelete = () => {
    const { player, onDelete } = this.props;
    if (onDelete) {
      onDelete(player.id);
    }
  };
}
