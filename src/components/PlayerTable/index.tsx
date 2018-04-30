import Hidden from 'material-ui/Hidden';
import { TableBody, TableCell, TableCellProps, TableHead, TableRow } from 'material-ui/Table';
import * as React from 'react';
import { Trans } from 'react-i18next';
import { pure } from 'recompose';
import { Link } from 'redux-little-router';

import { Player } from '../../shared/service/api';
import { PlayerPositionRatingBadge } from '../PlayerPositionRatingBadge';
import { PlayerStat } from '../PlayerStat';
import { Avatar, Flag, NameLink, StyledTable } from './styles';

export interface Props {
  players: Player[];
}

const leftAlign: TableCellProps = {
  padding: 'none'
};

const center: TableCellProps = {
  ...leftAlign,
  className: 'center'
};

export const PlayerTable = pure<Props>(({ players }) => (
  <StyledTable>
    <TableHead>
      <TableRow>
        {/* Avatar */}
        <TableCell {...center} />
        <TableCell {...leftAlign}>
          <Trans>Name</Trans>
        </TableCell>
        <TableCell {...center}>
          <Trans>Pos.</Trans>
        </TableCell>
        <TableCell {...center}>
          <Trans>Club</Trans>
        </TableCell>
        <TableCell {...center}>
          <Trans>Nat.</Trans>
        </TableCell>
        <TableCell {...center} sortDirection="desc">
          OVR
        </TableCell>
        <Hidden xsDown={true}>
          <TableCell {...center}>
            <Trans>SHT</Trans>
          </TableCell>
          <TableCell {...center}>
            <Trans>PAS</Trans>
          </TableCell>
          <TableCell {...center}>
            <Trans>DRI</Trans>
          </TableCell>
          <TableCell {...center}>
            <Trans>DEF</Trans>
          </TableCell>
          <TableCell {...center}>
            <Trans>PHY</Trans>
          </TableCell>
        </Hidden>
      </TableRow>
    </TableHead>
    <TableBody>
      {players.map(player => (
        <TableRow key={player.id} id={player.id} hover={true}>
          <TableCell {...center}>
            <Link href={`/players/${player.id}`}>
              <Avatar src="/player-avatar.png" alt="player image" />
            </Link>
          </TableCell>
          <TableCell {...leftAlign}>
            <NameLink href={`/players/${player.id}`}>{player.name}</NameLink>
          </TableCell>
          <TableCell {...center}>
            <PlayerPositionRatingBadge player={player} />
          </TableCell>

          {/* Team */}
          <TableCell {...center} />

          <TableCell {...center}>
            <Flag countryId={player.nationality} />
          </TableCell>
          <TableCell {...center}>
            <PlayerStat value={player.ovr} />
          </TableCell>

          <Hidden xsDown={true}>
            <TableCell {...center}>
              <PlayerStat value={player.abilities!.finishing!} />
            </TableCell>
            <TableCell {...center}>
              <PlayerStat value={player.abilities!.lowPass!} />
            </TableCell>
            <TableCell {...center}>
              <PlayerStat value={player.abilities!.dribbling!} />
            </TableCell>
            <TableCell {...center}>
              <PlayerStat value={player.abilities!.defensiveProwess!} />
            </TableCell>
            <TableCell {...center}>
              <PlayerStat value={player.abilities!.physicalContact!} />
            </TableCell>
          </Hidden>
        </TableRow>
      ))}
    </TableBody>
  </StyledTable>
));
