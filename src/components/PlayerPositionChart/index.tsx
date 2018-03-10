import * as React from 'react';

import { Player, Position } from '../../shared/service/api';

import { PlayerStat } from '../PlayerStat';
import { PlayerPositionRating } from '../PlayerPositionRating';

import './PlayerPositionChart.css';

export interface Props {
  player: Player;
}

const renderPlayerStat = (rating: number) => <PlayerStat value={rating} />;

/**
 * Shows the ratings for a player at each position.
 */
export class PlayerPositionChart extends React.PureComponent<Props> {
  render() {
    const { player } = this.props;

    return (
      <table className="PlayerPositionChart">
        <tbody>
          <tr>
            <td rowSpan={2} className="lwf">
              <PlayerPositionRating
                player={player}
                position={Position.LEFT_WING_FORWARD}
                render={renderPlayerStat}
              />
            </td>
            <td className="cf">
              <PlayerPositionRating
                player={player}
                position={Position.CENTRE_FORWARD}
                render={renderPlayerStat}
              />
            </td>
            <td rowSpan={2} className="rwf">
              <PlayerPositionRating
                player={player}
                position={Position.RIGHT_WING_FORWARD}
                render={renderPlayerStat}
              />
            </td>
          </tr>
          <tr>
            <td className="ss">
              <PlayerPositionRating
                player={player}
                position={Position.SECOND_STRIKER}
                render={renderPlayerStat}
              />
            </td>
          </tr>

          <tr>
            <td rowSpan={3} className="lmf">
              <PlayerPositionRating
                player={player}
                position={Position.LEFT_MIDFIELDER}
                render={renderPlayerStat}
              />
            </td>
            <td className="amf">
              <PlayerPositionRating
                player={player}
                position={Position.ATTACKING_MIDFIELDER}
                render={renderPlayerStat}
              />
            </td>
            <td rowSpan={3} className="rmf">
              <PlayerPositionRating
                player={player}
                position={Position.RIGHT_MIDFIELDER}
                render={renderPlayerStat}
              />
            </td>
          </tr>
          <tr>
            <td className="cmf">
              <PlayerPositionRating
                player={player}
                position={Position.CENTRE_MIDFIELDER}
                render={renderPlayerStat}
              />
            </td>
          </tr>
          <tr>
            <td className="dmf">
              <PlayerPositionRating
                player={player}
                position={Position.DEFENSIVE_MIDFIELDER}
                render={renderPlayerStat}
              />
            </td>
          </tr>

          <tr>
            <td rowSpan={2} className="lb">
              <PlayerPositionRating
                player={player}
                position={Position.LEFT_BACK}
                render={renderPlayerStat}
              />
            </td>
            <td className="cb">
              <PlayerPositionRating
                player={player}
                position={Position.CENTRE_BACK}
                render={renderPlayerStat}
              />
            </td>
            <td rowSpan={2} className="rb">
              <PlayerPositionRating
                player={player}
                position={Position.RIGHT_BACK}
                render={renderPlayerStat}
              />
            </td>
          </tr>
          <tr>
            <td className="gk">
              <PlayerPositionRating
                player={player}
                position={Position.GOALKEEPER}
                render={renderPlayerStat}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
