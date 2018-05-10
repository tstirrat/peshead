import Hidden from 'material-ui/Hidden';
import { TableBody, TableCell, TableCellProps, TableHead, TableRow } from 'material-ui/Table';
import * as React from 'react';
import { Trans } from 'react-i18next';
import { compose, pure, withHandlers, withState } from 'recompose';
import { Link } from 'redux-little-router';

import { Player } from '../../shared/service/api';
import { PlayerPositionRatingBadge } from '../PlayerPositionRatingBadge';
import { PlayerStat } from '../PlayerStat';
import { Shortcut } from '../Shortcut';
import { Avatar, Flag, NameLink, StyledTable } from './styles';

export interface Props {
  list: Player[];
  selectedIndex: number;
}

const leftAlign: TableCellProps = {
  padding: 'none'
};

const center: TableCellProps = {
  ...leftAlign,
  className: 'center'
};

export const PlayerTable = pure<Props>(({ list, selectedIndex }) => (
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
      {list.map((player, i) => (
        <TableRow
          key={player.id}
          id={player.id}
          hover={true}
          selected={i === selectedIndex}
        >
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

export interface Outer {
  list: Player[];
  onSelect?: (item: Player) => void;
}

export interface Inner extends Outer {
  selectedIndex: number;
  setSelectedIndex: (f: (n: number) => number) => void;
}

export interface Handlers {
  up: () => void;
  down: () => void;
  reset: () => void;
  enter: () => void;
}

export const InteractivePlayerTable = compose<Props, Outer>(
  withState<Outer, number, 'selectedIndex', 'setSelectedIndex'>(
    'selectedIndex',
    'setSelectedIndex',
    -1
  ),
  withHandlers<Inner, Handlers>({
    up: ({ setSelectedIndex, list }) => () => setSelectedIndex(i => i - 1),
    down: ({ setSelectedIndex, list }) => () => setSelectedIndex(i => i + 1),
    reset: ({ setSelectedIndex, list }) => () => setSelectedIndex(i => -1),
    enter: ({ selectedIndex, list, onSelect }) => () =>
      onSelect && onSelect(list[selectedIndex])
  })
)(
  pure<Props & Handlers>(({ up, down, reset, enter, ...props }) => (
    <>
      <Shortcut keys="j" handler={down} />
      <Shortcut keys="k" handler={up} />
      <Shortcut keys="escape" handler={reset} />
      <Shortcut keys="enter" handler={enter} />
      <PlayerTable {...props} />
    </>
  ))
);
