import * as firebase from 'firebase';
import { combineEpics, Epic } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { from } from 'rxjs/observable/from';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { take } from 'rxjs/operators/take';

import * as app from '../actions/app';
import { EpicDependencies } from '../epics';
import { State as GlobalState } from '../reducers';

export enum Provider {
  EMAIL = 'email',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  PHONE = 'phone'
}

/** Get the Firebase auth provider from a simple string. */
const getProvider = (provider: string) => {
  switch (provider) {
    case Provider.GOOGLE:
      return new firebase.auth.GoogleAuthProvider();
    case Provider.FACEBOOK:
      return new firebase.auth.FacebookAuthProvider();
    case Provider.TWITTER:
      return new firebase.auth.TwitterAuthProvider();
    default:
      throw new Error(`Provider not available: ${provider}`);
  }
};

/** Log a user in with various providers. */
export const login$: Epic<app.Actions, GlobalState, EpicDependencies> = (
  action$,
  store,
  deps
) =>
  action$.ofType(app.LOGIN).pipe(
    switchMap((action: app.AppLoginAction) => {
      const { provider, id, password } = action.payload;
      const auth = deps.firebaseApp.auth();
      if (auth.currentUser) {
        return observableOf(app.loginSuccess(auth.currentUser));
      }

      let doLogin$ = empty<firebase.auth.UserCredential>();

      // TODO: phone auth
      if (provider === Provider.PHONE) {
        return observableOf(
          app.loginError(new Error('Phone auth not supported (yet)'))
        );
      } else if (provider === Provider.EMAIL) {
        if (!id || !password) {
          return observableOf(
            app.loginError(
              new Error('Must supply email and password for email login')
            )
          );
        }
        doLogin$ = from(auth.signInWithEmailAndPassword(id, password));
      } else {
        // social logins: google, facebook, twitter
        doLogin$ = from(auth.signInWithPopup(getProvider(provider)));
      }

      return doLogin$.pipe(
        map(credential => app.loginSuccess(credential.user!)),
        catchError(error => observableOf(app.loginError(error)))
      );
    })
  );

/** Log the current user out */
export const logout$: Epic<app.Actions, GlobalState, EpicDependencies> = (
  action$,
  store,
  deps
) =>
  action$.ofType(app.LOGOUT).pipe(
    switchMap((action: app.AppLogoutAction) => {
      const auth = deps.firebaseApp.auth();
      return from(auth.signOut()).pipe(
        map(() => app.logoutSuccess()),
        catchError(error => observableOf(app.loginError(error)))
      );
    })
  );

/** Load the current user (if any) */
export const loadSession$: Epic<app.Actions, GlobalState, EpicDependencies> = (
  action$,
  store,
  deps
) =>
  action$.ofType(app.LOAD_SESSION).pipe(
    switchMap((action: app.AppLoadSessionAction) => {
      const auth = deps.firebaseApp.auth();
      return new Observable<firebase.UserInfo>(obs =>
        auth.onAuthStateChanged(obs)
      ).pipe(
        filter(user => !!user),
        take(1),
        map(user => app.loginSuccess(user)),
        catchError(error => observableOf(app.loginError(error)))
      );
    })
  );

export const epics = combineEpics(login$, logout$, loadSession$);
