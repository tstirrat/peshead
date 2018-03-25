import RemoveCircleIcon from 'material-ui-icons/RemoveCircle';
import ButtonBase from 'material-ui/ButtonBase';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListSubheader } from 'material-ui/List';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { IPlayerAbilities, Player } from '../../shared/service/api';
import { AbilityFlags } from '../../shared/utils/player';
import { PlayerStat } from '../PlayerStat';

export interface Props {
  player: Player;
  highlights?: AbilityFlags;
  onDelete?: (id: string) => void;
}

const Header = styled(ListSubheader)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .link {
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

const StyledStat = styled.div`
  background-color: ${props =>
    props.role === 'highest' ? 'rgba(0, 238, 171, 0.08)' : ''};

  li {
    justify-content: center;
  }
`;

/** Stats which have max value of 99 */
const SIMPLE_ABILITIES: Array<keyof IPlayerAbilities> = [
  'attackingProwess',
  'ballControl',
  'dribbling',
  'lowPass',
  'loftedPass',
  'finishing',
  'placeKicking',
  'swerve',
  'header',
  'defensiveProwess',
  'ballWinning',
  'kickingPower',
  'speed',
  'explosivePower',
  'bodyControl',
  'physicalContact',
  'jump',
  'goalkeeping',
  'catching',
  'clearing',
  'reflexes',
  'coverage',
  'stamina'
];

export class ComparePlayersStatColumn extends React.PureComponent<Props> {
  render() {
    const { player, highlights = {} } = this.props;
    return (
      <List>
        <Header>
          <Link className="link" to={`/players/${player.id}`}>
            {player.name}
          </Link>
          <ButtonBase
            aria-label="Delete"
            onClick={this.handleDelete}
            disableRipple={true}
          >
            <RemoveCircleIcon />
          </ButtonBase>
        </Header>
        <Divider />

        {SIMPLE_ABILITIES.map(key => (
          <StyledStat key={key} role={highlights[key] ? 'highest' : ''}>
            <ListItem>
              <PlayerStat value={player.abilities![key]!} />
            </ListItem>
            <Divider />
          </StyledStat>
        ))}

        <StyledStat role={highlights.weakFootUsage ? 'highest' : ''}>
          <ListItem>
            <PlayerStat value={player.abilities!.weakFootUsage!} maxValue={4} />
          </ListItem>
          <Divider />
        </StyledStat>

        <StyledStat role={highlights.weakFootAccuracy ? 'highest' : ''}>
          <ListItem>
            <PlayerStat
              value={player.abilities!.weakFootAccuracy!}
              maxValue={4}
            />
          </ListItem>
          <Divider />
        </StyledStat>

        <StyledStat role={highlights.form ? 'highest' : ''}>
          <ListItem>
            <PlayerStat value={player.abilities!.form!} maxValue={8} />
          </ListItem>
          <Divider />
        </StyledStat>

        <StyledStat role={highlights.injuryResistance ? 'highest' : ''}>
          <ListItem>
            <PlayerStat
              value={player.abilities!.injuryResistance!}
              maxValue={4}
            />
          </ListItem>
        </StyledStat>
      </List>
    );
  }

  private handleDelete = () => {
    const { player, onDelete } = this.props;
    if (onDelete) {
      onDelete(player.id);
    }
  };
}
