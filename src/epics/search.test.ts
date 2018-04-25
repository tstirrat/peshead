import { Action } from 'redux';
import { ActionsObservable, Epic } from 'redux-observable';
import { Observable, of as obs, throwError } from 'rxjs';
import { marbles } from 'rxjs-marbles';

import { EpicDependencies } from '.';
import { make } from '../__test__/fixtures';
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

  function makeSearchHits(hits: object[]) {
    return { hits: { hits } };
  }

  describe('search$', () => {
    let fetchPlayer: jest.Mock;

    beforeEach(() => {
      const payload = makeSearchHits([{ _id: '7511', _source: make.player() }]);
      fetchPlayer = jest.fn().mockReturnValue(obs(payload));
    });

    it(
      'fetches from /api/search',
      marbles(m => {
        const legend = { s: actions.search({ query: 'hello' }) };

        const input$ = m.hot('-s', legend);
        const actions$ = setup(search$, input$, fetchPlayer);

        actions$.subscribe(() => {
          expect(fetchPlayer).toHaveBeenCalledWith(
            'http://localhost/api/search?query=hello'
          );
        });
      })
    );

    it(
      'passes sortDirection',
      marbles(m => {
        const legend = {
          s: actions.search({ query: 'hello', sortDirection: 'desc' })
        };

        const input$ = m.hot('-s', legend);
        const actions$ = setup(search$, input$, fetchPlayer);

        actions$.subscribe(() => {
          expect(fetchPlayer).toHaveBeenCalledWith(
            'http://localhost/api/search?query=hello&sortDirection=desc'
          );
        });
      })
    );

    it(
      'passes sortField',
      marbles(m => {
        const legend = {
          s: actions.search({ query: 'hello', sortField: 'x' })
        };

        const input$ = m.hot('-s', legend);
        const actions$ = setup(search$, input$, fetchPlayer);

        actions$.subscribe(() => {
          expect(fetchPlayer).toHaveBeenCalledWith(
            'http://localhost/api/search?query=hello&sortField=x'
          );
        });
      })
    );

    it(
      'does not pass unknown params',
      marbles(m => {
        const legend = {
          // tslint:disable-next-line:no-any
          s: actions.search({ query: 'hello', a: 'b' } as any)
        };

        const input$ = m.hot('-s', legend);
        const actions$ = setup(search$, input$, fetchPlayer);

        actions$.subscribe(() => {
          expect(fetchPlayer).toHaveBeenCalledWith(
            'http://localhost/api/search?query=hello'
          );
        });
      })
    );

    it(
      'produces SEARCH_ERROR if no query specified',
      marbles(m => {
        const err = new Error(
          `Tried to search with undefined 'query', did you mean ''?`
        );
        const legend = {
          // tslint:disable-next-line:no-any
          s: actions.search({} as any),
          x: actions.searchError(err)
        };

        const input$ = m.hot('-s', legend);
        const expected$ = m.hot('-x', legend);

        const actions$ = setup(search$, input$, fetchPlayer);

        m.expect(actions$).toBeObservable(expected$);
      })
    );

    describe('on API success', () => {
      it(
        'produces SEARCH_SUCCESS',
        marbles(m => {
          const legend = {
            s: actions.search({ query: 'a' }),
            '✔': actions.searchSuccess([make.player()])
          };

          const input$ = m.hot('-s', legend);
          const expected$ = m.hot('-✔', legend);

          const actions$ = setup(search$, input$, fetchPlayer);

          m.expect(actions$).toBeObservable(expected$);
        })
      );

      it(
        'remembers search id, if supplied',
        marbles(m => {
          const legend = {
            s: actions.search({ query: 'a', id: 'kanye' }),
            '✔': actions.searchSuccess([make.player()], 'kanye')
          };

          const input$ = m.hot('-s', legend);
          const expected$ = m.hot('-✔', legend);

          const actions$ = setup(search$, input$, fetchPlayer);

          m.expect(actions$).toBeObservable(expected$);
        })
      );

      it(
        'copies search result _id into player payload',
        marbles(m => {
          const payload = makeSearchHits([
            { _id: 'x', _source: make.player() }
          ]);
          const fetchWithCustomId = jest.fn().mockReturnValue(obs(payload));
          const legend = {
            s: actions.search({ query: 'a', id: 'kanye' }),
            '✔': actions.searchSuccess([make.player({ id: 'x' })], 'kanye')
          };

          const input$ = m.hot('-s', legend);
          const expected$ = m.hot('-✔', legend);

          const actions$ = setup(search$, input$, fetchWithCustomId);

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
        'produces SEARCH_ERROR',
        marbles(m => {
          const legend = {
            s: actions.search({
              query: 'a'
            }),
            x: actions.searchError(err)
          };

          const input$ = m.hot('-s', legend);
          const expected$ = m.hot('-x', legend);

          const actions$ = setup(search$, input$, fetchWithError);

          m.expect(actions$).toBeObservable(expected$);
        })
      );

      it(
        'remembers search id, if supplied',
        marbles(m => {
          const legend = {
            s: actions.search({
              query: 'a',
              id: 'kanye'
            }),
            x: actions.searchError(err, 'kanye')
          };

          const input$ = m.hot('-s', legend);
          const expected$ = m.hot('-x', legend);

          const actions$ = setup(search$, input$, fetchWithError);

          m.expect(actions$).toBeObservable(expected$);
        })
      );
    }); // on API error

    // TODO: something is weird with error cases here
  }); // search$
});
