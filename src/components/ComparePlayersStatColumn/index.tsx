import './ComparePlayersStatColumn.css';

import { Divider, ListSubheader } from 'material-ui';
import List, { ListItem } from 'material-ui/List';
import * as React from 'react';

import { Player } from '../../shared/service/api';
import { PlayerStat } from '../PlayerStat';

export interface Props {
  player: Player;
}

export class ComparePlayersStatColumn extends React.PureComponent<Props> {
  render() {
    const { player } = this.props;
    return (
      <List className="ComparePlayersStatColumn">
        <ListSubheader className="player-name">{player.name}</ListSubheader>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.attackingProwess!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.ballControl!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.dribbling!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.lowPass!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.loftedPass!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.finishing!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.placeKicking!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.swerve!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.header!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.defensiveProwess!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.ballWinning!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.kickingPower!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.speed!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.explosivePower!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.bodyControl!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.physicalContact!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.jump!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.goalkeeping!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.catching!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.clearing!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.reflexes!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.coverage!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.stamina!} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.weakFootUsage!} maxValue={4} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat
            value={player.abilities!.weakFootAccuracy!}
            maxValue={4}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat value={player.abilities!.form!} maxValue={8} />
        </ListItem>
        <Divider />
        <ListItem>
          <PlayerStat
            value={player.abilities!.injuryResistance!}
            maxValue={4}
          />
        </ListItem>
      </List>
    );
  }
}
