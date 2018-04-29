import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import * as React from 'react';
import { pure } from 'recompose';

import { Player } from '../../shared/service/api';
import { CountryLabel } from '../../shared/utils/country';
import { ColoredPositionLabel } from '../ColoredPositionLabel';
import { CountryFlag } from '../CountryFlag';
import { FootChart } from '../FootChart';
import { PlayerPositionChart } from '../PlayerPositionChart';

export interface Props {
  player: Player;
}

export const PlayerBasics = pure<Props>(({ player }) => (
  <Table>
    <TableBody>
      <TableRow>
        <TableCell>Height</TableCell>
        <TableCell>{player.physique.height} cm</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Weight</TableCell>
        <TableCell>{player.physique.weight} kg</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Age</TableCell>
        <TableCell>{player.age}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Foot</TableCell>
        <TableCell>
          <FootChart player={player} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Nationality</TableCell>
        <TableCell>
          <CountryFlag countryId={player.nationality} />{' '}
          {CountryLabel[player.nationality]}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Print name</TableCell>
        <TableCell>{player.kitName}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Position</TableCell>
        <TableCell>
          <ColoredPositionLabel position={player.registeredPosition} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={2}>
          <PlayerPositionChart player={player} />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
));
