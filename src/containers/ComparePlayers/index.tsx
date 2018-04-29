import { Paper } from 'material-ui';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { connect, Dispatch } from 'react-redux';
import { push } from 'redux-little-router';
import { createSelector } from 'reselect';

import * as playerActions from '../../actions/players';
import { ComparePlayersLabelColumn } from '../../components/ComparePlayersLabelColumn';
import { ComparePlayersStatColumn } from '../../components/ComparePlayersStatColumn';
import { Loading } from '../../components/Loading';
import { SuggestPlayer } from '../../components/SuggestPlayer';
import * as fromRoot from '../../reducers';
import * as fromPlayers from '../../reducers/players';
import { PlayerCompareOption } from '../../reducers/routing';
import { assert } from '../../shared/assert';
import { Position } from '../../shared/service/api';
import { AbilityFlags, getHighestAbilities } from '../../shared/utils/player';

export interface ViewModel {
  players: PlayerViewModel[];
  position?: Position;
}

export interface PlayerViewModel
  extends PlayerCompareOption,
    fromPlayers.BaseViewModel {}

export interface Actions {
  getPlayer: typeof playerActions.getPlayer;
  pushUrl: typeof push;
  dispatch: Dispatch<fromRoot.State>;
}

const createPlayerViewModel = (
  state: fromPlayers.State,
  playerOptions: PlayerCompareOption
): PlayerViewModel => {
  const baseView = fromPlayers.getPlayerBaseView(state, playerOptions.id);
  return {
    ...baseView,
    form: 'A',
    level: 30
  };
};

export class ComparePlayers extends React.PureComponent<ViewModel & Actions> {
  componentDidMount() {
    this.fetchMissingPlayers(this.props);
  }

  componentWillReceiveProps(nextProps: ViewModel) {
    if (nextProps.players !== this.props.players) {
      this.fetchMissingPlayers(nextProps);
    }
  }

  render() {
    const { players } = this.props;
    const highlights = this.calculateHighlights(players);
    const colWidth = players.length === 3 ? 3 : 4;
    return (
      <Grid className="ComparePlayers" container={true} spacing={24}>
        <Grid item={true} xs={12} sm={12}>
          <Helmet>
            <title>PEShead - {this.getSummary()}</title>
          </Helmet>
          <Typography variant="title">Compare players</Typography>
          <div className="search-input flex">
            <SuggestPlayer onSelect={this.handlePlayerSelect} />
          </div>
        </Grid>
        <Grid item={true} xs={12} sm={12}>
          <Paper>
            <Grid container={true} spacing={0}>
              <Grid item={true} xs={colWidth}>
                <ComparePlayersLabelColumn />
              </Grid>
              {players.map((player, index) => (
                <Grid item={true} xs={colWidth} key={player.id}>
                  <Loading
                    when={!player.player || player.isLoading}
                    render={() => this.renderPlayer(player, highlights[index])}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  private renderPlayer(viewModel: PlayerViewModel, highlights: AbilityFlags) {
    const player = assert(
      viewModel.player,
      'Player should exist when !isLoading'
    );
    return (
      <ComparePlayersStatColumn
        player={player}
        highlights={highlights}
        onDelete={this.handlePlayerDelete}
      />
    );
  }

  /** Fetch any missing players. */
  private fetchMissingPlayers(props: ViewModel) {
    props.players.forEach(player => {
      if (!player.player && !player.isLoading) {
        this.props.getPlayer(player.id);
      }
    });
  }

  private getSummary() {
    const { players } = this.props;
    const summary = players
      .map(player => player.player && player.player.name)
      .filter(name => !!name)
      .join(' / ');
    return summary ? `Compare: ${summary}` : 'Compare';
  }

  private calculateHighlights(viewModels: PlayerViewModel[]) {
    const players = viewModels.map(vm => vm.player!).filter(p => !!p);
    return getHighestAbilities(players);
  }

  private handlePlayerSelect = (id: string) => {
    const { players } = this.props;
    const ids = players.map(p => p.id).concat([id]);
    this.props.pushUrl(`/players/compare/${ids.join('/')}`, {});
  };

  private handlePlayerDelete = (id: string) => {
    const { players } = this.props;
    const ids = players.map(p => p.id).filter(playerId => playerId !== id);
    this.props.pushUrl(`/players/compare/${ids.join('/')}`, {});
  };
}

const getViewModel = createSelector(
  [fromRoot.getRoutePlayerCompareOptions, fromRoot.getPlayersState],
  (
    playerOptions: PlayerCompareOption[],
    state: fromPlayers.State
  ): ViewModel => {
    const viewModels = playerOptions.map(options =>
      createPlayerViewModel(state, options)
    );
    return {
      players: viewModels
    };
  }
);

const getActions = (dispatch: Dispatch<fromRoot.State>): Actions => {
  return {
    getPlayer: (id: string) => dispatch(playerActions.getPlayer(id)),
    pushUrl: (href: string) => dispatch(push(href, {})),
    dispatch
  };
};

// tslint:disable-next-line:variable-name
export const ConnectedComparePlayers = connect(getViewModel, getActions)(
  ComparePlayers
);
