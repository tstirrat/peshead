import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router';
import Grid from 'material-ui/Grid';
import Card from 'material-ui/Card';
import { createSelector } from 'reselect';
import Typography from 'material-ui/Typography';
import { Player as PlayerModel, Position } from '../../shared/service/api';
import * as fromRoot from '../../reducers';
import * as playerActions from '../../actions/players';
import * as fromPlayers from '../../reducers/players';
import { PlayerAbilities } from '../../components/PlayerAbilities';
import { Loading } from '../../components/Loading';
import { PlayerCompareOption } from '../../reducers/ui/routing';
import { assert } from '../../shared/assert';

export interface PlayerViewModel {
  id: string;
  data?: PlayerModel;
  form: string;  // TODO: make an enum
  level: number;
  isLoading: boolean;
}

export interface ViewModel {
  players: PlayerViewModel[];
  position?: Position;
}

export interface Actions {
  getPlayer: typeof playerActions.getPlayer;
  dispatch: Dispatch<fromRoot.State>;
}

export class ComparePlayers extends React.PureComponent<ViewModel & Actions> {
  componentDidMount() {
    this.props.players.forEach(p => this.props.getPlayer(p.id));
  }

  render() {
    const { players } = this.props;
    return (
      <Grid container={true} spacing={24}>
        <Grid item={true} xs={12} sm={12}>
          <Typography type="title">
            Compare players
          </Typography>
        </Grid>
        {players.map(player => (
          <Grid item={true} xs={4} sm={6} key={player.id}>
            <Card>
              <Loading
                when={player.isLoading}
                render={() => this.renderPlayer(player)}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  renderPlayer(viewModel: PlayerViewModel) {
    const player = assert(viewModel.data, 'Player should exist when !isLoading');
    return (
      <div>
        <Typography type="title">{player.name}</Typography>
        <PlayerAbilities player={player} />
      </div>
    );
  }
}

const getViewModel = createSelector(
  [fromRoot.getRoutePlayerCompareOptions, fromRoot.getPlayersState],
  (playerOptions: PlayerCompareOption[], state: fromPlayers.State): ViewModel => {
    const viewModels = playerOptions.map(option => createViewModel(state, option));
    return {
      players: viewModels,
    };
  });

const createViewModel = (state: fromPlayers.State, playerOptions: PlayerCompareOption): PlayerViewModel => {
  const player = fromPlayers.getPlayerById(state, playerOptions.id);
  return {
    id: playerOptions.id,
    data: player,
    isLoading: !player,
    form: 'A',
    level: 30,
  };
};

const getActions = (dispatch: Dispatch<fromRoot.State>): Actions => {
  return {
    getPlayer: (id: string) => dispatch(playerActions.getPlayer(id)),
    dispatch,
  };
};

// tslint:disable-next-line:variable-name
export const ConnectedComparePlayers =
  withRouter(connect(getViewModel, getActions)(ComparePlayers));
