import { Icon } from 'material-ui';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { connect, Dispatch } from 'react-redux';
import * as Sticky from 'react-stickynode';
import { push, replace } from 'redux-little-router';
import { createSelector } from 'reselect';

import * as playerActions from '../../actions/players';
import { ComparePlayersLabelColumn } from '../../components/ComparePlayersLabelColumn';
import { ComparePlayersStatColumn } from '../../components/ComparePlayersStatColumn';
import { Loading } from '../../components/Loading';
import { Shortcut } from '../../components/Shortcut';
import { SuggestPlayer } from '../../components/SuggestPlayer';
import * as fromRoot from '../../reducers';
import * as fromPlayers from '../../reducers/players';
import { buildPlayerCompareUrl, PlayerCompareOption } from '../../reducers/routing';
import { assert } from '../../shared/assert';
import { AugmentedPlayer } from '../../shared/models/augmented_player';
import { Position } from '../../shared/service/api';
import { AbilityFlags, getHighestAbilities, PlayerForm, PlayerFormChar } from '../../shared/utils/player';
import { AddButton, PaperContainer, PlayerInputContainer } from './styles';

export interface ViewModel {
  players: PlayerViewModel[];
  position?: Position;
}

export interface State {
  /** Show the "add player" input */
  showPlayerInput: boolean;
}

export interface PlayerViewModel
  extends PlayerCompareOption,
    fromPlayers.BaseViewModel {}

export interface Actions {
  getPlayer: typeof playerActions.getPlayer;
  pushUrl: typeof push;
  replaceUrl: typeof replace;
  dispatch: Dispatch<fromRoot.State>;
}

const createPlayerViewModel = (
  state: fromPlayers.State,
  options: PlayerCompareOption
): PlayerViewModel => {
  const baseView = fromPlayers.getPlayerBaseView(state, options.id);
  let { player } = baseView;
  if (player) {
    const { form = PlayerForm.C, level = 30 } = options;
    player = new AugmentedPlayer(player, { form, level });
  }
  return {
    ...baseView,
    player,
    form: options.form,
    level: options.level
  };
};

export class ComparePlayers extends React.PureComponent<ViewModel & Actions> {
  state: State = {
    showPlayerInput: this.props.players.length <= 1
  };

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
    const { showPlayerInput } = this.state;
    return (
      <Grid className="ComparePlayers" container={true} spacing={24}>
        <Grid item={true} xs={12} sm={12}>
          <Helmet>
            <title>{this.getPageTitle()} - PEShead</title>
          </Helmet>
          <Shortcut keys="+" handler={this.showAddPlayerInput} />
          <Typography variant="title">Compare players</Typography>
        </Grid>
        <Grid item={true} xs={12} sm={12}>
          <PaperContainer>
            {showPlayerInput ? (
              <PlayerInputContainer>
                <SuggestPlayer
                  autoFocus={true}
                  onSelect={this.handlePlayerSelect}
                  onCancel={this.hideAddPlayerInput}
                  cancelOnBlur={true}
                  placeholder="Add player"
                />
              </PlayerInputContainer>
            ) : (
              <Sticky top={66} innerZ="100">
                <AddButton
                  variant="fab"
                  color="primary"
                  aria-label="Add"
                  onClick={this.showAddPlayerInput}
                >
                  <Icon>add</Icon>
                </AddButton>
              </Sticky>
            )}
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
          </PaperContainer>
        </Grid>
      </Grid>
    );
  }

  private renderPlayer(viewModel: PlayerViewModel, highlights: AbilityFlags) {
    const player = assert(
      viewModel.player,
      'Player should exist when !isLoading'
    );
    const { form, level } = viewModel;
    return (
      <ComparePlayersStatColumn
        player={player}
        highlights={highlights}
        form={form}
        level={level}
        onDelete={this.handlePlayerDelete}
        onFormChanged={this.handlePlayerFormChanged}
        onLevelChanged={this.handlePlayerLevelChanged}
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

  private getPageTitle() {
    const { players } = this.props;
    const summary = players
      .filter(vm => !!vm.player)
      .map(vm => {
        const { form, player } = vm;
        const name = player!.name;
        const formArrow =
          form && form !== PlayerForm.C ? ` ${PlayerFormChar[form]}` : '';
        return `${name}${formArrow}`;
      })
      .filter(name => !!name)
      .join(' / ');
    return summary ? `Compare: ${summary}` : 'Compare';
  }

  private calculateHighlights(viewModels: PlayerViewModel[]) {
    const players = viewModels.map(vm => vm.player!).filter(p => !!p);
    return getHighestAbilities(players);
  }

  private showAddPlayerInput = () => {
    this.setState({ showPlayerInput: true });
  };

  private hideAddPlayerInput = () => {
    this.setState({ showPlayerInput: false });
  };

  private handlePlayerSelect = (id: string) => {
    const players: PlayerCompareOption[] = this.props.players;
    const newPlayers = [...players, { id }];
    this.setState({ showPlayerInput: false });
    this.props.pushUrl(buildPlayerCompareUrl(newPlayers), {});
  };

  private handlePlayerDelete = (id: string) => {
    const players: PlayerCompareOption[] = this.props.players;
    const newPlayers = players.filter(p => p.id !== id);
    this.props.pushUrl(buildPlayerCompareUrl(newPlayers), {});
  };

  private handlePlayerFormChanged = (id: string, form: PlayerForm) => {
    const newPlayers: PlayerCompareOption[] = [...this.props.players];
    const index = newPlayers.findIndex(p => p.id === id);
    if (index >= 0) {
      const updatedPlayer: PlayerCompareOption = { ...newPlayers[index], form };
      newPlayers.splice(index, 1, updatedPlayer);
      this.props.replaceUrl(buildPlayerCompareUrl(newPlayers), {});
    }
  };

  private handlePlayerLevelChanged = (id: string, level: number) => {
    const newPlayers: PlayerCompareOption[] = [...this.props.players];
    const index = newPlayers.findIndex(p => p.id === id);
    if (index >= 0) {
      const updatedPlayer: PlayerCompareOption = {
        ...newPlayers[index],
        level
      };
      newPlayers.splice(index, 1, updatedPlayer);
      this.props.replaceUrl(buildPlayerCompareUrl(newPlayers), {});
    }
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
    replaceUrl: (href: string) => dispatch(replace(href, {})),
    dispatch
  };
};

// tslint:disable-next-line:variable-name
export const ConnectedComparePlayers = connect(getViewModel, getActions)(
  ComparePlayers
);
