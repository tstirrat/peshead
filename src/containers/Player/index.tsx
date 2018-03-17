import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router';
import Grid from 'material-ui/Grid';
import Card from 'material-ui/Card';
import { createSelector } from 'reselect';
import Typography from 'material-ui/Typography';
import { CardContent } from 'material-ui/Card';
import { Loading } from '../../components/Loading';
import { PlayerStat } from '../../components/PlayerStat';
import { PlayerPositionRating } from '../../components/PlayerPositionRating';
import { Player as PlayerModel } from '../../shared/service/api';
import { PlayerAbilities } from '../../components/PlayerAbilities';
import { PlayerBasics } from '../../components/PlayerBasics';
import * as fromRoot from '../../reducers';
import * as players from '../../actions/players';
import { assert } from '../../shared/assert';

export interface ViewModel {
  id?: string;
  player?: PlayerModel;
  isLoading: boolean;
  level?: number;
}

interface Actions {
  getPlayer: typeof players.getPlayer;
  dispatch: Dispatch<fromRoot.State>;
}

export class Player extends React.PureComponent<ViewModel & Actions> {
  componentDidMount() {
    const { id, player } = this.props;
    if (id && !player) {
      this.props.getPlayer(id);
    }
  }

  /**
   * When a player id changes on the same route, component does not un-mount.
   * Capture and re-query player here.
   */
  componentWillUpdate(nextProps: ViewModel) {
    const { id } = nextProps;
    if (id && id !== this.props.id) {
      this.props.getPlayer(id);
    }
  }

  render() {
    return (
      <Loading when={this.props.isLoading} render={() => this.renderPlayer()} />
    );
  }

  private renderPlayer() {
    const { level } = this.props;
    const player = assert(this.props.player, 'Player is guarded by <Loading>');
    return (
      <Grid container={true} spacing={24}>
        <Grid item={true} xs={12} sm={12}>
          <Typography type="title">
            {player.name}
            <PlayerPositionRating
              player={player}
              position={player.registeredPosition}
              render={this.renderPlayerStat}
            />
          </Typography>
        </Grid>
        <Grid item={true} xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography type="title">Basics</Typography>
            </CardContent>
            <PlayerBasics player={player} />
          </Card>
        </Grid>
        <Grid item={true} xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography type="title">Abilities</Typography>
            </CardContent>
            <PlayerAbilities player={player} level={level} />
          </Card>
        </Grid>
      </Grid>
    );
  }

  private renderPlayerStat(rating: number) {
    return <PlayerStat value={rating} />;
  }
}

export interface PlayerQueryParams {
  level?: number;
  form?: string;
  position?: string;
}

interface RawPlayerQueryParams {
  level?: string;
  form?: string;
  position?: string;
}

const getPlayerQueryParams = (state: fromRoot.State): PlayerQueryParams => {
  const { level, form, position } = fromRoot.getQueryParams<
    RawPlayerQueryParams
  >(state);
  return {
    level: level ? Number(level) : undefined,
    form,
    position
  };
};

const getViewModel = createSelector(
  [fromRoot.getRouteId, fromRoot.getSelectedPlayer, getPlayerQueryParams],
  (id, player, params): ViewModel => {
    return {
      id,
      player,
      isLoading: !player,
      level: params.level
    };
  }
);

const getActions = (dispatch: Dispatch<fromRoot.State>): Actions => {
  return {
    getPlayer: (id: string) => dispatch(players.getPlayer(id)),
    dispatch
  };
};

// tslint:disable-next-line:variable-name
export const ConnectedPlayer = withRouter(
  connect(getViewModel, getActions)(Player)
);
