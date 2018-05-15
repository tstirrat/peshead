import { Action } from 'redux';
import { ActionsObservable, Epic } from 'redux-observable';
import { Observable, of as obs, throwError } from 'rxjs';
import { marbles } from 'rxjs-marbles';

import { EpicDependencies } from '.';
import * as actions from '../actions/players';
import { getPlayer } from '../epics/players';
import { make } from '../shared/__test__/fixtures';

describe('epics/players', () => {
  function setup(
    epic: Epic<Action, {}, EpicDependencies>,
    input$: Observable<Action>,
    fetchMock: jest.Mock
  ): Observable<Action> {
    const a = new ActionsObservable(input$);

    // tslint:disable-next-line:no-any
    return epic(a, null as any, {
      // tslint:disable-next-line:no-any
      firebaseApp: {} as any,
      // tslint:disable-next-line:no-any
      fetch: fetchMock as any
    });
  }

  describe('getPlayer', () => {
    let fetchPlayerSuccess: jest.Mock;

    beforeEach(() => {
      const payload = make.player();
      fetchPlayerSuccess = jest.fn().mockReturnValue(obs(payload));
    });

    it(
      'fetches from /api/players/:id',
      marbles(m => {
        const legend = { a: actions.getPlayer('7511') };

        const input$ = m.hot('-a', legend);
        const actions$ = setup(getPlayer, input$, fetchPlayerSuccess);

        actions$.subscribe(() => {
          expect(fetchPlayerSuccess).toHaveBeenCalledWith(
            'http://localhost/api/players/7511'
          );
        });
      })
    );

    it(
      'produces GET_PLAYER_ERROR if no id specified',
      marbles(m => {
        const err = new Error('Assertion failed: Player id should be supplied');
        const legend = {
          // tslint:disable-next-line:no-any
          a: actions.getPlayer(undefined as any)
        };

        const input$ = m.hot('-a', legend);
        const expected$ = m.hot('-#', legend, err);

        const actions$ = setup(getPlayer, input$, fetchPlayerSuccess);

        m.expect(actions$).toBeObservable(expected$);
      })
    );

    describe('on API success', () => {
      it(
        'produces GET_PLAYER_SUCCESS',
        marbles(m => {
          const legend = {
            a: actions.getPlayer('7511'),
            '✔': actions.getPlayerSuccess(make.player())
          };

          const input$ = m.hot('-a', legend);
          const expected$ = m.hot('-✔', legend);

          const actions$ = setup(getPlayer, input$, fetchPlayerSuccess);

          m.expect(actions$).toBeObservable(expected$);
        })
      );
    }); // on API success

    describe('on API error', () => {
      const err = new Error('err');
      let fetchWithError: jest.Mock;

      beforeEach(() => {
        fetchWithError = jest.fn().mockReturnValue(throwError(err));
      });

      it(
        'produces GET_PLAYER_ERROR',
        marbles(m => {
          const legend = {
            a: actions.getPlayer('7511'),
            x: actions.getPlayerError('7511', err)
          };

          const input$ = m.hot('-a', legend);
          const expected$ = m.hot('-x', legend);

          const actions$ = setup(getPlayer, input$, fetchWithError);

          m.expect(actions$).toBeObservable(expected$);
        })
      );
    }); // on API error

    // TODO: something is weird with error cases here
  }); // getPlayer
});
