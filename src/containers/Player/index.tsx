import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { replace } from 'react-router-redux';
import { createSelector } from 'reselect';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { tap } from 'rxjs/operators/tap';
import { Subject } from 'rxjs/Subject';

import * as players from '../../actions/players';
import { Loading } from '../../components/Loading';
import { PlayerAbilities } from '../../components/PlayerAbilities';
import { PlayerActionMenu } from '../../components/PlayerActionMenu';
import { PlayerBasics } from '../../components/PlayerBasics';
import { PlayerNameplate } from '../../components/PlayerNameplate';
import * as fromRoot from '../../reducers';
import * as fromPlayers from '../../reducers/players';
import { assert } from '../../shared/assert';
import { DEFAULT_PLAYER_FORM, DEFAULT_PLAYER_LEVEL, PlayerForm, PlayerFormValue } from '../../shared/utils/player';

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
    const { id, player, isLoading } = this.props;
    if (!player && !isLoading) {
      this.props.getPlayer(id);
    }

    this.debouncedUpdateUrl$
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(500),
        tap(url => this.props.replaceUrl(url))
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
    const { player, isLoading } = this.props;
    return (
      <Loading when={!player || isLoading} render={() => this.renderPlayer()} />
    );
  }

  private renderPlayer() {
    const {
      level = DEFAULT_PLAYER_LEVEL,
      form = DEFAULT_PLAYER_FORM
    } = this.state;
    const player = assert(this.props.player, 'Player is guarded by <Loading>');
    const maxLevel = 50; // TODO: need to get this from data files
    return (
      <Grid container={true} spacing={24}>
        <Helmet>
          <title>PESto - {player.name}</title>
        </Helmet>

        <Grid item={true} xs={12} sm={12}>
          <div className="layout-row">
            <PlayerNameplate player={player} />
            <div className="flex" />
            <PlayerActionMenu player={player} />
          </div>
        </Grid>

        <Grid item={true} xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography type="title">Basics</Typography>
            </CardContent>
            <PlayerBasics player={player} />
            <div>
              Level{' '}
              <Input
                type="range"
                value={level}
                inputProps={{ min: 1, max: maxLevel }}
                onChange={this.levelChanged}
              />{' '}
              Lv. {level} / {maxLevel}
            </div>
            <div>
              Form{' '}
              <Input
                type="range"
                value={form}
                inputProps={{ min: PlayerForm.E, max: PlayerForm.A }}
                onChange={this.formChanged}
              />{' '}
              {PlayerFormValue[form]}
            </div>
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

  /**
   * Update the player level, recalculate the stats. After a fixed time, change
   * the url with the new value.
   */
  private levelChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const level = Number(event.target.value);
    this.setState({ level });

    // change url eventually
    this.debouncedUpdateUrl$.next(this.getPlayerUrl({ level }));
  };

  /**
   * Update the player form, recalculate the stats. After a fixed time, change
   * the url with the new value.
   */
  private formChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const form: PlayerForm = Number(event.target.value);
    this.setState({ form });

    // change url eventually
    this.debouncedUpdateUrl$.next(this.getPlayerUrl({ form }));
  };

  private getPlayerUrl(newState: State) {
    const { level = DEFAULT_PLAYER_LEVEL, form = DEFAULT_PLAYER_FORM } = {
      ...this.state,
      ...newState
    };
    const player = assert(this.props.player, 'Guarded by <Loading>');
    return `/players/${player.id}?level=${level}&form=${form}`;
  }
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
    return {
      ...playerView,
      level: params.level,
      form: params.form
    };
  }
);

const getActions = (dispatch: Dispatch<fromRoot.State>): Actions => {
  return {
    getPlayer: (id: string) => dispatch(players.getPlayer(id)),
    replaceUrl: (location: string) => dispatch(replace(location)),
    dispatch
  };
};

// tslint:disable-next-line:variable-name
export const ConnectedPlayer = withRouter(
  connect(getViewModel, getActions)(Player)
);
