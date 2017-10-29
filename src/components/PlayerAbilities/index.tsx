import { Player } from '../../shared/service/api';
import { PlayerStat } from '../PlayerStat';
import Table, { TableCell, TableRow, TableBody } from 'material-ui/Table';
import * as React from 'react';

export interface Props {
  player: Player;
}

export class PlayerAbilities extends React.PureComponent<Props> {
  render() {
    const { player } = this.props;
    return (
      <Table className="player-abilities">
        <TableBody>
          <TableRow>
            <TableCell>Attacking Prowess</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.attackingProwess!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ball Control</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.ballControl!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Dribbling</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.dribbling!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Low Pass</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.lowPass!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Lofted Pass</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.loftedPass!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Finishing</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.finishing!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Set Piece Taking</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.placeKicking!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Curve</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.swerve!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Header</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.header!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Defensive Prowess</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.defensiveProwess!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ball Winning</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.ballWinning!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Kicking Power</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.kickingPower!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Speed</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.speed!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Explosive Power</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.explosivePower!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Body Control</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.bodyControl!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Physical Contact</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.physicalContact!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jump</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.jump!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Goalkeeping</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.goalkeeping!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Catching</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.catching!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Clearing</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.clearing!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Reflexes</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.reflexes!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Coverage</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.coverage!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Stamina</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.stamina!} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>NonDom Leg Usage</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.weakFootUsage!} maxValue={4} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>NonDom Leg Prec.</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.weakFootAccuracy!} maxValue={4} />
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
              <PlayerStat value={player.abilities!.injuryResistance!} maxValue={4} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}
