import { Player } from '../../shared/service/api';
import { PlayerStat } from '../PlayerStat';
import Table, { TableCell, TableRow, TableBody, TableHead, TableCellProps } from 'material-ui/Table';
import * as React from 'react';

export interface Props {
  players: Player[];
}

export class PlayerTable extends React.PureComponent<Props> {
  render() {
    const { players } = this.props;
    const cellProps: TableCellProps = {
      padding: 'none'
    };
    return (
      <Table className="PlayerTable">
        <TableHead>
          <TableRow>
            <TableCell {...cellProps}>Name</TableCell>
            <TableCell {...cellProps}>Pos.</TableCell>
            <TableCell {...cellProps}>Age</TableCell>
            {/* Team */}
            <TableCell {...cellProps}>Nationality</TableCell>
            <TableCell {...cellProps}>OVR</TableCell>
            <TableCell {...cellProps}>SHT</TableCell>
            <TableCell {...cellProps}>PAS</TableCell>
            <TableCell {...cellProps}>DRI</TableCell>
            <TableCell {...cellProps}>DEF</TableCell>
            <TableCell {...cellProps}>PHY</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map(player => (
            <TableRow key={player.id} id={player.id} onClick={this.goToPlayer} hover={true}>
              <TableCell {...cellProps} className="name">{player.name}</TableCell>
              <TableCell {...cellProps} className="pos">{player.registeredPosition}</TableCell>
              <TableCell {...cellProps} className="age">{player.age}</TableCell>
              {/* Team */}
              <TableCell {...cellProps} className="nation">{player.nationality}</TableCell>
              {/* TODO: calculate OVR, SHT, PAS, DEF, PHY, DRI  */}
              <TableCell {...cellProps} className="ovr">
                <PlayerStat value={player.abilities!.attackingProwess!} />
              </TableCell>
              <TableCell {...cellProps} className="sht">
                <PlayerStat value={player.abilities!.finishing!} />
              </TableCell>
              <TableCell {...cellProps} className="pas">
                <PlayerStat value={player.abilities!.lowPass!} />
              </TableCell>
              <TableCell {...cellProps} className="dri">
                <PlayerStat value={player.abilities!.dribbling!} />
              </TableCell>
              <TableCell {...cellProps} className="def">
                <PlayerStat value={player.abilities!.defensiveProwess!} />
              </TableCell>
              <TableCell {...cellProps} className="phy">
                <PlayerStat value={player.abilities!.physicalContact!} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  // tslint:disable-next-line:no-any possible confusion between node and DOM
  private goToPlayer = (e: any) => {
    e.preventDefault();
    // const row = e.currentTarget as HTMLTableRowElement;
    // TODO: use router to nav to player
  }
}
