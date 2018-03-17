import { Player } from '../../shared/service/api';
import { PlayerStat } from '../PlayerStat';
import Table, { TableCell, TableRow, TableBody } from 'material-ui/Table';
import ArrowDropUpIcon from 'material-ui-icons/ArrowDropUp';
import * as React from 'react';
import { getChangedAbilitiesForLevel } from '../../shared/utils/player';

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
              {changed.attackingProwess ? <ArrowDropUpIcon /> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ball Control</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.ballControl!} />
              {changed.ballControl ? <ArrowDropUpIcon /> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Dribbling</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.dribbling!} />
              {changed.dribbling ? <ArrowDropUpIcon /> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Low Pass</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.lowPass!} />
              {changed.lowPass ? <ArrowDropUpIcon /> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Lofted Pass</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.loftedPass!} />
              {changed.loftedPass ? <ArrowDropUpIcon /> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Finishing</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.finishing!} />
              {changed.finishing ? <ArrowDropUpIcon /> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Set Piece Taking</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.placeKicking!} />
              {changed.placeKicking ? <ArrowDropUpIcon /> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Curve</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.swerve!} />
              {changed.swerve ? <ArrowDropUpIcon /> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Header</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.header!} />
              {changed.header ? <ArrowDropUpIcon /> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Defensive Prowess</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.defensiveProwess!} />
              {changed.defensiveProwess ? <ArrowDropUpIcon /> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ball Winning</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.ballWinning!} />
              {changed.ballWinning ? <ArrowDropUpIcon /> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Kicking Power</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.kickingPower!} />
              {changed.kickingPower ? <ArrowDropUpIcon /> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Speed</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.speed!} />
              {changed.speed ? <ArrowDropUpIcon /> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Explosive Power</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.explosivePower!} />
              {changed.explosivePower ? <ArrowDropUpIcon /> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Body Control</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.bodyControl!} />
              {changed.bodyControl ? <ArrowDropUpIcon /> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Physical Contact</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.physicalContact!} />
              {changed.physicalContact ? <ArrowDropUpIcon /> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jump</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.jump!} />
              {changed.jump ? <ArrowDropUpIcon /> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Goalkeeping</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.goalkeeping!} />
              {changed.goalkeeping ? <ArrowDropUpIcon /> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Catching</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.catching!} />
              {changed.catching ? <ArrowDropUpIcon /> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Clearing</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.clearing!} />
              {changed.clearing ? <ArrowDropUpIcon /> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Reflexes</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.reflexes!} />
              {changed.reflexes ? <ArrowDropUpIcon /> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Coverage</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.coverage!} />
              {changed.coverage ? <ArrowDropUpIcon /> : null}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Stamina</TableCell>
            <TableCell>
              <PlayerStat value={player.abilities!.stamina!} />
              {changed.stamina ? <ArrowDropUpIcon /> : null}
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
