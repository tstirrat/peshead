import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { connect, Dispatch } from 'react-redux';
import { push, replace } from 'redux-little-router';
import { createSelector } from 'reselect';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';

import * as players from '../../actions/players';
import { FormSlider } from '../../components/FormSlider';
import { LevelSlider } from '../../components/LevelSlider';
import { Loading } from '../../components/Loading';
import { PlayerAbilities } from '../../components/PlayerAbilities';
import { PlayerActionMenu } from '../../components/PlayerActionMenu';
import { PlayerBasics } from '../../components/PlayerBasics';
import { PlayerNameplate } from '../../components/PlayerNameplate';
import { Shortcut } from '../../components/Shortcut';
import * as fromRoot from '../../reducers';
import * as fromPlayers from '../../reducers/players';
import { buildPlayerCompareUrl, PlayerCompareOption } from '../../reducers/routing';
import { assert } from '../../shared/assert';
import { AugmentedPlayer } from '../../shared/models/augmented_player';
import { Player as PlayerModel } from '../../shared/service/api';
import { DEFAULT_PLAYER_FORM, DEFAULT_PLAYER_LEVEL, PlayerForm, PlayerFormChar } from '../../shared/utils/player';
import { PositionLabel } from '../../shared/utils/position';
import { Flex, FlexLayout } from '../App/styles';
import { PlayerHeader } from './styles';

export interface ViewModel extends fromPlayers.BaseViewModel {
  level?: number;
  form?: PlayerForm;
}

interface State {
  level?: number;
  form?: PlayerForm;
}

interface Actions {
  getPlayer: typeof players.getPlayer;
  pushUrl: typeof push;
  replaceUrl: typeof replace;
  dispatch: Dispatch<fromRoot.State>;
}

export class Player extends React.PureComponent<ViewModel & Actions, State> {
  state: State = {
    level: this.props.level,
    form: this.props.form
  };

  /** Updates URL params with form/level when changed in the UI (debounced) */
  private debouncedUpdateUrl$ = new Subject<string>();

  /** Emits when component is about to die */
  private destroy$ = new Subject<void>();

  componentDidMount() {
    const { id, player, isLoading, error } = this.props;
    if (!player && !isLoading && !error) {
      this.props.getPlayer(id);
    }

    this.debouncedUpdateUrl$
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(500),
        tap(url => this.props.replaceUrl(url, {}))
      )
      .subscribe();
  }

  componentWillUnmount() {
    this.destroy$.next();
  }

  /**
   * When a player id changes on the same route, component does not un-mount.
   * Capture and re-query player here.
   */
  componentWillUpdate(nextProps: ViewModel) {
    const { id, player, isLoading } = nextProps;
    if (id !== this.props.id && !player && !isLoading) {
      this.props.getPlayer(id);
    }
  }

  render() {
    const { player, isLoading, error } = this.props;
    return (
      <Loading
        when={!player || isLoading}
        render={() => this.renderPlayer()}
        error={error}
      />
    );
  }

  private renderPlayer() {
    const {
      level = DEFAULT_PLAYER_LEVEL,
      form = DEFAULT_PLAYER_FORM
    } = this.state;
    const player = assert(this.props.player, 'Player is guarded by <Loading>');

    return (
      <Grid container={true} spacing={24}>
        <Helmet>
          <title>{this.getPageTitle(form, player)} - PEShead</title>
        </Helmet>

        <Shortcut keys="c" handler={this.goToCompare} />

        <PlayerHeader>
          <FlexLayout align="row">
            <PlayerNameplate player={player} />
            <Flex />
            <PlayerActionMenu onCompare={this.goToCompare} />
          </FlexLayout>
        </PlayerHeader>

        <Grid item={true} xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="title">Basics</Typography>
            </CardContent>
            <PlayerBasics player={player} />
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Level</TableCell>
                  <TableCell>
                    <LevelSlider value={level} onChange={this.levelChanged} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Form</TableCell>
                  <TableCell>
                    <FormSlider value={form} onChange={this.formChanged} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </Grid>
        <Grid item={true} xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="title">Abilities</Typography>
            </CardContent>
            <PlayerAbilities player={player} level={level} />
          </Card>
        </Grid>
      </Grid>
    );
  }

  /**
   * Update the player level, recalculate the stats. After a fixed time, change
   * the url with the new value.
   */
  private levelChanged = (level: number) => {
    this.setState({ level });

    // change url eventually
    this.debouncedUpdateUrl$.next(this.getPlayerUrl({ level }));
  };

  /**
   * Update the player form, recalculate the stats. After a fixed time, change
   * the url with the new value.
   */
  private formChanged = (form: PlayerForm) => {
    this.setState({ form });

    // change url eventually
    this.debouncedUpdateUrl$.next(this.getPlayerUrl({ form }));
  };

  private getPageTitle(form: PlayerForm, player: PlayerModel) {
    const arrowChar = form !== PlayerForm.C ? ` ${PlayerFormChar[form]}` : '';
    return (
      `${player.name} ` +
      `[${PositionLabel[player.registeredPosition]} ${player.ovr}${arrowChar}]`
    );
  }

  private getPlayerUrl(newState: State) {
    const { level = DEFAULT_PLAYER_LEVEL, form = DEFAULT_PLAYER_FORM } = {
      ...this.state,
      ...newState
    };
    const player = assert(this.props.player, 'Guarded by <Loading>');
    return `/players/${player.id}?level=${level}&form=${form}`;
  }

  private goToCompare = () => {
    const { player } = this.props;
    const { level, form } = this.state;
    if (player) {
      const options: PlayerCompareOption = { id: player.id, level, form };
      this.props.pushUrl(buildPlayerCompareUrl([options]), {});
    }
  };
}

export interface PlayerQueryParams {
  level?: number;
  form?: number;
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
    form: form ? Number(form) : undefined,
    position
  };
};

const getViewModel = createSelector(
  [fromRoot.getRouteId, fromRoot.getSelectedPlayerView, getPlayerQueryParams],
  (id, playerView, params): ViewModel => {
    let { player } = playerView;
    if (player) {
      const { form = PlayerForm.C, level = 30 } = params;
      player = new AugmentedPlayer(player, { form, level });
    }
    return {
      ...playerView,
      player,
      level: params.level,
      form: params.form
    };
  }
);

const getActions = (dispatch: Dispatch<fromRoot.State>): Actions => {
  return {
    getPlayer: (id: string) => dispatch(players.getPlayer(id)),
    pushUrl: (href: string) => dispatch(push(href, {})),
    replaceUrl: (href: string) => dispatch(replace(href, {})),
    dispatch
  };
};

// tslint:disable-next-line:variable-name
export const ConnectedPlayer = connect(
  getViewModel,
  getActions
)(Player);
