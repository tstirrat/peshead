import Table, { TableBody, TableCell, TableCellProps, TableHead, TableRow } from 'material-ui/Table';
import * as React from 'react';
import { pure } from 'recompose';
import { Link } from 'redux-little-router';

import { Player } from '../../shared/service/api';
import { PositionLabel } from '../../shared/utils/player';
import { PlayerStat } from '../PlayerStat';

export interface Props {
  players: Player[];
}

const cellProps: TableCellProps = {
  padding: 'none'
};

export const PlayerTable = pure<Props>(({ players }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell {...cellProps}>Name</TableCell>
        <TableCell {...cellProps}>Pos.</TableCell>
        <TableCell {...cellProps}>Age</TableCell>
        {/* Team */}
        <TableCell {...cellProps}>Country</TableCell>
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
        <TableRow key={player.id} id={player.id} hover={true}>
          <TableCell {...cellProps} className="name">
            <Link href={`/players/${player.id}`}>{player.name}</Link>
          </TableCell>
          <TableCell {...cellProps} className="pos">
            {PositionLabel[player.registeredPosition]}
          </TableCell>
          <TableCell {...cellProps} className="age">
            {player.age}
          </TableCell>
          {/* Team */}
          <TableCell {...cellProps} className="nation">
            {player.nationality}
          </TableCell>
          {/* TODO: calculate OVR, SHT, PAS, DEF, PHY, DRI  */}
          <TableCell {...cellProps} className="ovr">
            <PlayerStat value={player.ovr} />
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
));
