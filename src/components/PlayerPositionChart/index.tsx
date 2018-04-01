import * as React from 'react';
import { pure } from 'recompose';
import styled from 'styled-components';

import { Player, Position } from '../../shared/service/api';
import { PlayerPositionRating } from '../PlayerPositionRating';
import { PlayerStat } from '../PlayerStat';

export interface Props {
  player: Player;
}

const renderPlayerStat = (rating: number) => <PlayerStat value={rating} />;

const Table = styled.table`
  ${PlayerStat} {
    border-radius: 0;
    display: flex;
  }

  /** prettier hates this format */
  .lwf
    ${PlayerStat},
    .rwf
    ${PlayerStat},
    .lmf
    ${PlayerStat},
    .rmf
    ${PlayerStat},
    .lb
    ${PlayerStat},
    .rb
    ${PlayerStat} {
    height: 54px;
    width: 32px;
  }

  .cf
    ${PlayerStat},
    .ss
    ${PlayerStat},
    .amf
    ${PlayerStat},
    .cmf
    ${PlayerStat},
    .dmf
    ${PlayerStat},
    .cb
    ${PlayerStat},
    .gk
    ${PlayerStat} {
    width: 68px;
    height: 24px;
  }

  .amf ${PlayerStat}, .cmf ${PlayerStat}, .dmf ${PlayerStat} {
    height: 16px;
  }
`;

/**
 * Shows the ratings for a player at each position.
 */
export const PlayerPositionChart = pure<Props>(({ player }) => (
  <Table>
    <tbody>
      <tr>
        <td rowSpan={2} className="lwf">
          <PlayerPositionRating
            player={player}
            position={Position.LWF}
            render={renderPlayerStat}
          />
        </td>
        <td className="cf">
          <PlayerPositionRating
            player={player}
            position={Position.CF}
            render={renderPlayerStat}
          />
        </td>
        <td rowSpan={2} className="rwf">
          <PlayerPositionRating
            player={player}
            position={Position.RWF}
            render={renderPlayerStat}
          />
        </td>
      </tr>
      <tr>
        <td className="ss">
          <PlayerPositionRating
            player={player}
            position={Position.SS}
            render={renderPlayerStat}
          />
        </td>
      </tr>

      <tr>
        <td rowSpan={3} className="lmf">
          <PlayerPositionRating
            player={player}
            position={Position.LMF}
            render={renderPlayerStat}
          />
        </td>
        <td className="amf">
          <PlayerPositionRating
            player={player}
            position={Position.AMF}
            render={renderPlayerStat}
          />
        </td>
        <td rowSpan={3} className="rmf">
          <PlayerPositionRating
            player={player}
            position={Position.RMF}
            render={renderPlayerStat}
          />
        </td>
      </tr>
      <tr>
        <td className="cmf">
          <PlayerPositionRating
            player={player}
            position={Position.CMF}
            render={renderPlayerStat}
          />
        </td>
      </tr>
      <tr>
        <td className="dmf">
          <PlayerPositionRating
            player={player}
            position={Position.DMF}
            render={renderPlayerStat}
          />
        </td>
      </tr>

      <tr>
        <td rowSpan={2} className="lb">
          <PlayerPositionRating
            player={player}
            position={Position.LB}
            render={renderPlayerStat}
          />
        </td>
        <td className="cb">
          <PlayerPositionRating
            player={player}
            position={Position.CB}
            render={renderPlayerStat}
          />
        </td>
        <td rowSpan={2} className="rb">
          <PlayerPositionRating
            player={player}
            position={Position.RB}
            render={renderPlayerStat}
          />
        </td>
      </tr>
      <tr>
        <td className="gk">
          <PlayerPositionRating
            player={player}
            position={Position.GK}
            render={renderPlayerStat}
          />
        </td>
      </tr>
    </tbody>
  </Table>
));
