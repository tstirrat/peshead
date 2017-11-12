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

export interface ViewModel {
  id?: string;
  player?: PlayerModel;
  isLoading: boolean;
}

interface Actions {
  getPlayer: typeof players.getPlayer;
  dispatch: Dispatch<fromRoot.State>;
}

export class Player extends React.PureComponent<ViewModel & Actions> {

  componentDidMount() {
    if (this.props.id) {
      this.props.getPlayer(this.props.id);
    }
  }

  renderPlayer() {
    const player = this.props.player!;
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
            <PlayerAbilities player={player} />
          </Card>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <Loading
        when={this.props.isLoading}
        render={() => this.renderPlayer()}
      />
    );
  }

  renderPlayerStat(rating: number) {
    return <PlayerStat value={rating} />;
  }
}

const getViewModel = createSelector(
  [fromRoot.getRouteId, fromRoot.getSelectedPlayer],
  (id: string, player: PlayerModel | undefined): ViewModel => {
    return {
      id,
      player,
      isLoading: !player,
    };
  });

const getActions = (dispatch: Dispatch<fromRoot.State>): Actions => {
  return {
    getPlayer: (id: string) => dispatch(players.getPlayer(id)),
    dispatch,
  };
};

// tslint:disable-next-line:variable-name
export const ConnectedPlayer =
  withRouter(connect(getViewModel, getActions)(Player));
