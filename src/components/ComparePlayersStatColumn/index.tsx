import RemoveCircleIcon from 'material-ui-icons/RemoveCircle';
import ButtonBase from 'material-ui/ButtonBase';
import Divider from 'material-ui/Divider';
import List, { ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import { Link } from 'redux-little-router';

import { Player } from '../../shared/service/api';
import { AbilityFlags, getTotalStats, SIMPLE_ABILITIES } from '../../shared/utils/player';
import { CalculatePositionRating } from '../CalculatePositionRating';
import { ColoredPositionLabel } from '../ColoredPositionLabel';
import { PlayerStat } from '../PlayerStat';
import { Header, StyledStat } from './styles';

export interface Props {
  player: Player;
  highlights?: AbilityFlags;
  onDelete?: (id: string) => void;
}

export class ComparePlayersStatColumn extends React.PureComponent<Props> {
  render() {
    const { player, highlights = {} } = this.props;
    return (
      <List>
        <Header>
          <Link className="link" href={`/players/${player.id}`}>
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

        <StyledStat>
          <ListItem>
            <Typography type="subheading">{player.age}</Typography>
          </ListItem>
          <Divider />
        </StyledStat>

        <StyledStat>
          <ListItem>
            <Typography type="subheading">{0}</Typography>
          </ListItem>
          <Divider />
        </StyledStat>

        <StyledStat>
          <ListItem>
            <Typography type="subheading">{0}</Typography>
          </ListItem>
          <Divider />
        </StyledStat>

        <StyledStat>
          <ListItem>
            <Typography type="subheading">
              <ColoredPositionLabel position={player.registeredPosition} />
            </Typography>
          </ListItem>
          <Divider />
        </StyledStat>

        <StyledStat>
          <ListItem>
            <CalculatePositionRating
              player={player}
              position={player.registeredPosition}
              render={rating => <PlayerStat value={rating} />}
            />
          </ListItem>
          <Divider />
        </StyledStat>

        <StyledStat>
          <ListItem>
            <Typography type="subheading">{getTotalStats(player)}</Typography>
          </ListItem>
          <Divider />
        </StyledStat>

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
