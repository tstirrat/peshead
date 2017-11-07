import {RouteComponentProps} from 'react-router';
import {routerReducer, RouterState} from 'react-router-redux';

export type State = RouterState;

export const reducer = routerReducer;

export interface RouteWithId { id: string; }

/** Get :id from the, route, operates on component's ownProps  */
export const getId =
    (state: State, props: RouteComponentProps<RouteWithId>) => {
      return props.match.params.id;
    };

/**
 * Get typed query params from the current url.
 */
export function getQueryParams<T>(state: State): T {
  const location = state.location;
  if (!location) {
    return {} as T;
  }
  const statements = location.search.substr(1).split('&');
  const params = {};
  statements.forEach(s => {
    const [key, value] = s.split('=').map(part => decodeURIComponent(part));
    params[key] = value;
  });

  return params as T;
}
