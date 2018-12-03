import { debounce, get } from 'lodash';
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import * as Sticky from 'react-stickynode';
import { Link } from 'redux-little-router';

import { AugmentedPlayer } from '../../shared/models/augmented_player';
import { Playable } from '../../shared/service/api';
import { getPositionRating, PlayerForm, PlayingStyleLabel, SIMPLE_ABILITIES } from '../../shared/utils/player';
import { PlayableLabel, POSITION_LIST, PositionLabel } from '../../shared/utils/position';
import { CalculatePositionRating } from '../CalculatePositionRating';
import { ColoredPositionLabel } from '../ColoredPositionLabel';
import { CountryFlag } from '../CountryFlag';
import { FootChart } from '../FootChart';
import { FormSlider } from '../FormSlider';
import { LevelSlider } from '../LevelSlider';
import { PlayerStat } from '../PlayerStat';
import {
  Avatar,
  BlockListItem,
  Column,
  EllipsizedLink,
  PlayerHeader,
  StyledStat,
} from './../../containers/ComparePlayers/styles';

export interface Props {
  player: AugmentedPlayer;
  compareTo: AugmentedPlayer[];
  level?: number;
  form?: PlayerForm;
  onDelete?: (id: string) => void;
  onLevelChanged?: (id: string, level: number) => void;
  onFormChanged?: (id: string, form: PlayerForm) => void;
}

export interface State {
  level?: number;
  form?: PlayerForm;
}

export class ComparePlayersStatColumn extends React.PureComponent<
  Props,
  State
> {
  state: State = { level: this.props.level, form: this.props.form };

  private debouncedChangeForm = debounce(
    // alignment
    (id: string, form: PlayerForm) => {
      if (this.props.onFormChanged) {
        this.props.onFormChanged(id, form);
      }
    },
    150
  );

  private debouncedChangeLevel = debounce(
    // alignment
    (id: string, level: number) => {
      if (this.props.onLevelChanged) {
        this.props.onLevelChanged(id, level);
      }
    },
    150
  );

  render() {
    const { player } = this.props;

    const { level = 30, form = PlayerForm.C } = this.state;
    return (
      <Column>
        <StyledStat>
          <ListItem>
            <IconButton
              aria-label="Remove player"
              onClick={this.handleDelete}
              disableRipple={true}
            >
              <Icon>remove_circle</Icon>
            </IconButton>
          </ListItem>
          <Divider />
        </StyledStat>

        <Sticky top={'.sticky-header'} innerZ="99">
          <PlayerHeader>
            <Link href={`/players/${player.id}`}>
              <Avatar src="/player-avatar.png" alt="player image" />
            </Link>
            <EllipsizedLink href={`/players/${player.id}`}>
              {player.name}
            </EllipsizedLink>
          </PlayerHeader>
          <Divider />
        </Sticky>

        <StyledStat isHighest={this.isHighestStat('age')}>
          <ListItem>
            <Typography variant="subheading">{player.age}</Typography>
          </ListItem>
        </StyledStat>

        <StyledStat>
          <Divider />
          <ListItem>
            <CountryFlag countryId={player.nationality} />
          </ListItem>
        </StyledStat>

        <StyledStat isHighest={this.isHighestStat('physique.height')}>
          <Divider />
          <ListItem>
            <Typography variant="subheading">
              {player.physique.height}cm
            </Typography>
          </ListItem>
        </StyledStat>

        <StyledStat isHighest={this.isHighestStat('physique.weight')}>
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
          <BlockListItem>
            <LevelSlider value={level} onChange={this.handleLevelChanged} />
          </BlockListItem>
        </StyledStat>

        <StyledStat>
          <Divider />
          <BlockListItem>
            <FormSlider value={form} onChange={this.handleFormChanged} />
          </BlockListItem>
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

        <StyledStat isHighest={this.isHighestStat('totalAbilities')}>
          <Divider />
          <ListItem>
            <Typography variant="subheading">
              {player.totalAbilities}
            </Typography>
          </ListItem>
        </StyledStat>

        {SIMPLE_ABILITIES.map(key => (
          <StyledStat
            key={key}
            isHighest={this.isHighestStat(`abilities.${key}`)}
          >
            <Divider />
            <ListItem>
              <PlayerStat value={player.abilities[key]} />
            </ListItem>
          </StyledStat>
        ))}

        <StyledStat isHighest={this.isHighestStat('abilities.weakFootUsage')}>
          <Divider />
          <ListItem>
            <PlayerStat value={player.abilities.weakFootUsage} maxValue={4} />
          </ListItem>
        </StyledStat>

        <StyledStat
          isHighest={this.isHighestStat('abilities.weakFootAccuracy')}
        >
          <Divider />
          <ListItem>
            <PlayerStat
              value={player.abilities.weakFootAccuracy}
              maxValue={4}
            />
          </ListItem>
        </StyledStat>

        <StyledStat isHighest={this.isHighestStat('abilities.form')}>
          <Divider />
          <ListItem>
            <PlayerStat value={player.abilities.form} maxValue={8} />
            {this.renderChangeAmount('abilities.form')}
          </ListItem>
        </StyledStat>

        <StyledStat
          isHighest={this.isHighestStat('abilities.injuryResistance')}
        >
          <Divider />
          <ListItem>
            <PlayerStat
              value={player.abilities.injuryResistance}
              maxValue={4}
            />
            {this.renderChangeAmount('abilities.injuryResistance')}
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

  /** Used in compare view to highlight the winning stat */
  private isHighestStat(statPath: string): boolean {
    const { player, compareTo } = this.props;
    const highestStat = compareTo
      .filter(p => p.id !== player.id)
      .reduce<number>(
        // for alignment
        (highest, comparedPlayer) => {
          const stat = get(comparedPlayer, statPath);
          return highest > stat ? highest : stat;
        },
        0
      );
    const playerStat: number = get(player, statPath);
    return playerStat >= highestStat;
  }

  private renderChangeAmount(statPath: string, index = 0) {
    const { player, compareTo } = this.props;
    const playerStat: number = get(player, statPath);
    const comparedStat: number = get(compareTo[index], statPath);
    const change = playerStat - comparedStat;
    return change > 0 ? <span className="change">+{change}</span> : null;
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
        <StyledStat
          key={key}
          isHighest={this.isHighestStat(`playablePositions.${key}`)}
        >
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

  private handleLevelChanged = (level: number) => {
    this.setState({ level });
    const { player } = this.props;
    this.debouncedChangeLevel(player.id, level);
  };

  private handleFormChanged = (form: PlayerForm) => {
    this.setState({ form });
    const { player } = this.props;
    this.debouncedChangeForm(player.id, form);
  };
}
