import {routerReducer, RouterState} from 'react-router-redux';

export type State = RouterState;

export const reducer = routerReducer;

export interface RouteWithId { id: string; }
