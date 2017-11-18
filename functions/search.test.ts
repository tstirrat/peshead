import {Client} from 'elasticsearch';

import * as search from './search';

describe('search', () => {

  // tslint:disable-next-line:variable-name
  const MockClient = jest.fn<Client>(() => {
    return {
      suggest: jest.fn(),
      search: jest.fn(),
      index: jest.fn(),
      delete: jest.fn(),
    };
  });

  let client: jest.Mocked<Client>;

  beforeEach(() => {
    client = new MockClient() as jest.Mocked<Client>;
  });

  describe('#suggest', () => {

    it('uses player index', () => {
      search.suggest(client, 'kanye');
      expect(client.suggest).toHaveBeenCalledWith(expect.objectContaining({
        index: 'players',
      }));
    });

    it('limits returned fields', () => {
      search.suggest(client, 'kanye');
      expect(client.suggest).toHaveBeenCalledWith(expect.objectContaining({
        body: expect.objectContaining({
          _source: ['name'],
        }),
      }));
    });

    it('queries using supplied param', () => {
      search.suggest(client, 'kanye');
      expect(client.suggest).toHaveBeenCalledWith(expect.objectContaining({
        body: expect.objectContaining({
          player_suggest: expect.objectContaining({
            prefix: 'kanye',
          }),
        }),
      }));
    });

    it('queries against the `suggest` field', () => {
      search.suggest(client, 'kanye');
      expect(client.suggest).toHaveBeenCalledWith(expect.objectContaining({
        body: expect.objectContaining({
          player_suggest: expect.objectContaining({
            completion: {field: 'suggest'},
          }),
        }),
      }));
    });

    it('resolves on success', () => {
      client.suggest.mockImplementation(() => Promise.resolve('success'));
      const result = search.suggest(client, 'kanye');
      return expect(result).resolves.toBe('success');
    });

    it('rejects on error', () => {
      client.suggest.mockImplementation(() => Promise.reject('error'));
      const result = search.suggest(client, 'kanye');
      return expect(result).rejects.toBe('error');
    });

  });


});  // search
