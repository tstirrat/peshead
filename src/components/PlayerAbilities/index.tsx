import Icon from 'material-ui/Icon';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import * as React from 'react';

import { Player } from '../../shared/service/api';
import { getChangedAbilitiesForLevel } from '../../shared/utils/player';
import { PlayerStat } from '../PlayerStat';

export interface Props {
  player: Player;
  level?: number;
}

export class PlayerAbilities extends React.PureComponent<Props> {
  render() {
    const { player, level } = this.props;
    const changed = level ? getChangedAbilitiesForLevel(level) : {};
    return (
      <Table className="player-abilities">
        <TableBody>
          <TableRow>
            <TableCell>Attacking Prowess</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.attackingProwess!} />
              {changed.attackingProwess ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ball Control</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.ballControl!} />
              {changed.ballControl ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Dribbling</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.dribbling!} />
              {changed.dribbling ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Low Pass</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.lowPass!} />
              {changed.lowPass ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Lofted Pass</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.loftedPass!} />
              {changed.loftedPass ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Finishing</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.finishing!} />
              {changed.finishing ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Set Piece Taking</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.placeKicking!} />
              {changed.placeKicking ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Curve</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.swerve!} />
              {changed.swerve ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Header</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.header!} />
              {changed.header ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Defensive Prowess</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.defensiveProwess!} />
              {changed.defensiveProwess ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ball Winning</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.ballWinning!} />
              {changed.ballWinning ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Kicking Power</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.kickingPower!} />
              {changed.kickingPower ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Speed</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.speed!} />
              {changed.speed ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Explosive Power</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.explosivePower!} />
              {changed.explosivePower ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Body Control</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.bodyControl!} />
              {changed.bodyControl ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Physical Contact</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.physicalContact!} />
              {changed.physicalContact ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jump</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.jump!} />
              {changed.jump ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Goalkeeping</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.goalkeeping!} />
              {changed.goalkeeping ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Catching</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.catching!} />
              {changed.catching ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Clearing</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.clearing!} />
              {changed.clearing ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Reflexes</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.reflexes!} />
              {changed.reflexes ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Coverage</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.coverage!} />
              {changed.coverage ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Stamina</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.stamina!} />
              {changed.stamina ? <Icon>arrow_drop_up</Icon> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>NonDom Leg Usage</TableCell>
            <TableCell>
              <PlayerStat
                value={player.abilities!.weakFootUsage!}
                maxValue={4}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>NonDom Leg Prec.</TableCell>
            <TableCell>
              <PlayerStat
                value={player.abilities!.weakFootAccuracy!}
                maxValue={4}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Condition</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.form!} maxValue={8} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Injury Resistance</TableCell>
            <TableCell>
              <PlayerStat
                value={player.abilities!.injuryResistance!}
                maxValue={4}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}
