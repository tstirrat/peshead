import * as React from 'react';
import { pure } from 'recompose';

import { Player, Position } from '../../shared/service/api';
import { CalculatePositionRating } from '../CalculatePositionRating';
import { PlayerStat } from '../PlayerStat';
import { Table } from './styles';

export interface Props {
  player: Player;
}

const renderPlayerStat = (rating: number) => <PlayerStat value={rating} />;

/**
 * Shows the ratings for a player at each position.
 */
export const PlayerPositionChart = pure<Props>(({ player }) => (
  <Table>
    <tbody>
      <tr>
        <td rowSpan={2} className="lwf">
          <CalculatePositionRating
            player={player}
            position={Position.LWF}
            render={renderPlayerStat}
          />
        </td>
        <td className="cf">
          <CalculatePositionRating
            player={player}
            position={Position.CF}
            render={renderPlayerStat}
          />
        </td>
        <td rowSpan={2} className="rwf">
          <CalculatePositionRating
            player={player}
            position={Position.RWF}
            render={renderPlayerStat}
          />
        </td>
      </tr>
      <tr>
        <td className="ss">
          <CalculatePositionRating
            player={player}
            position={Position.SS}
            render={renderPlayerStat}
          />
        </td>
      </tr>

      <tr>
        <td rowSpan={3} className="lmf">
          <CalculatePositionRating
            player={player}
            position={Position.LMF}
            render={renderPlayerStat}
          />
        </td>
        <td className="amf">
          <CalculatePositionRating
            player={player}
            position={Position.AMF}
            render={renderPlayerStat}
          />
        </td>
        <td rowSpan={3} className="rmf">
          <CalculatePositionRating
            player={player}
            position={Position.RMF}
            render={renderPlayerStat}
          />
        </td>
      </tr>
      <tr>
        <td className="cmf">
          <CalculatePositionRating
            player={player}
            position={Position.CMF}
            render={renderPlayerStat}
          />
        </td>
      </tr>
      <tr>
        <td className="dmf">
          <CalculatePositionRating
            player={player}
            position={Position.DMF}
            render={renderPlayerStat}
          />
        </td>
      </tr>

      <tr>
        <td rowSpan={2} className="lb">
          <CalculatePositionRating
            player={player}
            position={Position.LB}
            render={renderPlayerStat}
          />
        </td>
        <td className="cb">
          <CalculatePositionRating
            player={player}
            position={Position.CB}
            render={renderPlayerStat}
          />
        </td>
        <td rowSpan={2} className="rb">
          <CalculatePositionRating
            player={player}
            position={Position.RB}
            render={renderPlayerStat}
          />
        </td>
      </tr>
      <tr>
        <td className="gk">
          <CalculatePositionRating
            player={player}
            position={Position.GK}
            render={renderPlayerStat}
          />
        </td>
      </tr>
    </tbody>
  </Table>
));
