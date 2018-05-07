import { Store } from 'react-redux';
import { bindShortcuts } from 'redux-shortcuts';

import * as actions from './actions/keyboard';

export function configureShortcuts(store: Store<{}>) {
  bindShortcuts(
    ['/', actions.search], // alignment
    ['g h', actions.home]
  )(store.dispatch);
}
