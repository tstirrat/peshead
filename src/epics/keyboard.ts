import { Action } from 'redux';
import { push } from 'redux-little-router';
import { combineEpics, Epic } from 'redux-observable';
import { map } from 'rxjs/operators';

import * as keyboard from '../actions/keyboard';

/** Go home */
export const goHome: Epic<Action, {}> = action$ =>
  action$.ofType(keyboard.HOME).pipe(
    map((action: keyboard.HomeAction) => {
      return push('/', {});
    })
  );

export const epics = combineEpics(goHome);
