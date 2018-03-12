import { match } from 'react-router';

import { getPlayer } from '../actions/players';
import { getPlayersState } from '../reducers';
import { getPlayerById } from '../reducers/players';
import { PreloadRouteGuard } from './preload_route_guard';

// TODO: import from elsewhere
export interface RouteWithId {
  id: string;
}

export class PlayerRouteGuard extends PreloadRouteGuard<RouteWithId> {
  doPreload(routeMatch: match<RouteWithId>) {
    console.log('doPreload');
    const state = getPlayersState(this.store.getState());
    const playerId = routeMatch.params.id;
    const player = getPlayerById(state, playerId);
    if (!player) {
      console.log('preloading player', playerId);
      this.store.dispatch(getPlayer(playerId));
    }
    return true;
  }
}
