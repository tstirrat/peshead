import { Action } from 'redux';
import { ActionsObservable, Epic } from 'redux-observable';
import { marbles } from 'rxjs-marbles';
import { Observable } from 'rxjs/Observable';
import { of as obs } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

import { EpicDependencies } from '.';
import * as actions from '../actions/search';
import { search$ } from '../epics/search';

describe('epics/search', () => {
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

  describe('search$', () => {
    describe('on success', () => {
      const payload = { hits: { hits: [] } };

      it(
        'produces SEARCH_SUCCESS',
        marbles(m => {
          const fetch = jest.fn().mockReturnValue(obs(payload));

          const legend = {
            s: actions.search({ query: 'a' }),
            '✔': actions.searchSuccess([])
          };

          const input$ = m.hot('-s', legend);
          const expected$ = m.hot('-✔', legend);

          const actions$ = setup(search$, input$, fetch);

          m.expect(actions$).toBeObservable(expected$);
        })
      );

      it(
        'remembers search id, if supplied',
        marbles(m => {
          const fetch = jest.fn().mockReturnValue(obs(payload));

          const legend = {
            s: actions.search({ query: 'a', id: 'kanye' }),
            '✔': actions.searchSuccess([], 'kanye')
          };

          const input$ = m.hot('-s', legend);
          const expected$ = m.hot('-✔', legend);

          const actions$ = setup(search$, input$, fetch);

          m.expect(actions$).toBeObservable(expected$);
        })
      );

      it(
        'fetches from /api/search',
        marbles(m => {
          const fetch = jest.fn().mockReturnValue(obs(payload));

          const legend = {
            s: actions.search({ query: 'hello' })
          };

          const input$ = m.hot('-s', legend);
          const actions$ = setup(search$, input$, fetch);

          actions$.subscribe(() => {
            expect(fetch).toHaveBeenCalledWith(
              'http://localhost/api/search?query=hello'
            );
          });
        })
      );
    }); // on success

    describe('on error', () => {
      const err = new Error('err');

      it(
        'produces SEARCH_ERROR',
        marbles(m => {
          const fetch = jest.fn().mockReturnValue(_throw(err));

          const legend = {
            s: actions.search({
              query: 'a'
            }),
            x: actions.searchError(err)
          };

          const input$ = m.hot('-s', legend);
          const expected$ = m.hot('-x', legend);

          const actions$ = setup(search$, input$, fetch);

          m.expect(actions$).toBeObservable(expected$);
        })
      );

      it(
        'remembers search id, if supplied',
        marbles(m => {
          const fetch = jest.fn().mockReturnValue(_throw(err));

          const legend = {
            s: actions.search({
              query: 'a',
              id: 'kanye'
            }),
            x: actions.searchError(err, 'kanye')
          };

          const input$ = m.hot('-s', legend);
          const expected$ = m.hot('-x', legend);

          const actions$ = setup(search$, input$, fetch);

          m.expect(actions$).toBeObservable(expected$);
        })
      );
    }); // on error

    // TODO: something is weird with error cases here
  }); // search$
});
