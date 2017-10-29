import { Player } from '../../shared/service/api';
import Table, { TableCell, TableRow, TableBody } from 'material-ui/Table';
import * as React from 'react';

export interface Props {
  player: Player;
}

export class PlayerBasics extends React.PureComponent<Props> {
  render() {
    const { player } = this.props;
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>{player.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Commentary ID</TableCell>
            <TableCell>{player.commentaryId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Nationality</TableCell>
            <TableCell>{player.nationality}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Height</TableCell>
            <TableCell>{/* player.physique!.height */} cm</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Weight</TableCell>
            <TableCell>{/* player.physique!.weight */} kg</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Age</TableCell>
            <TableCell>{player.age}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Print name</TableCell>
            <TableCell>{player.kitName}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}
