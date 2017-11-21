import {Client} from 'elasticsearch';

import * as search from './search';
import {Country, Player} from './service/api';

describe('search', () => {

  // tslint:disable-next-line:variable-name
  const MockClient = jest.fn<Client>(() => {
    return {
      search: jest.fn(),
      index: jest.fn(),
      delete: jest.fn(),
    };
  });

  let client: jest.Mocked<Client>;

  beforeEach(() => {
    client = new MockClient() as jest.Mocked<Client>;
  });

  describe('#createClient', () => {

    const config = {
      access_key_id: 'a',
      secret_access_key: 'b',
      host: '[host]',
    };

    it('throws if config.es is not set', () => {
      expect(() => search.createClient(undefined))
          .toThrowError('config.es is not set');
    });

    it('throws if es.access_key_id is not set', () => {
      const invalidConfig = {secret_access_key: 'b', host: '[host]'};
      expect(() => search.createClient(invalidConfig))
          .toThrowError('accessKeyId/secretAccessKey/host are not set');
    });

    it('throws if es.secret_access_key is not set', () => {
      const invalidConfig = {access_key_id: 'a', host: '[host]'};
      expect(() => search.createClient(invalidConfig))
          .toThrowError('accessKeyId/secretAccessKey/host are not set');
    });

    it('throws if es.host is not set', () => {
      const invalidConfig = {
        access_key_id: 'a',
        secret_access_key: 'b',
      };
      expect(() => search.createClient(invalidConfig))
          .toThrowError('accessKeyId/secretAccessKey/host are not set');
    });

    // TODO: mock modules and test client creation with params

  });  // #createClient

  describe('#search', () => {

    it('uses player index', () => {
      search.search(client, 'samus');
      expect(client.search).toHaveBeenCalledWith(expect.objectContaining({
        index: 'players',
        type: 'player',
      }));
    });

    it('queries against `name` field using `query` param', () => {
      search.search(client, 'samus');
      expect(client.search).toHaveBeenCalledWith(expect.objectContaining({
        body: {
          query: {
            match: {
              name: {query: 'samus', analyzer: 'standard'},
            },
          }
        }
      }));
    });

    it('resolves on success', () => {
      client.search.mockImplementation(() => Promise.resolve('success'));
      const result = search.search(client, 'samus');
      return expect(result).resolves.toBe('success');
    });

    it('rejects on error', () => {
      client.search.mockImplementation(() => Promise.reject('error'));
      const result = search.search(client, 'samus');
      return expect(result).rejects.toBe('error');
    });

  });  // #search

  describe('#suggest', () => {

    it('uses player index', () => {
      search.suggest(client, 'samus');
      expect(client.search).toHaveBeenCalledWith(expect.objectContaining({
        index: 'players',
        type: 'player',
      }));
    });

    it('limits returned fields', () => {
      search.suggest(client, 'samus');
      expect(client.search).toHaveBeenCalledWith(expect.objectContaining({
        body: expect.objectContaining({
          _source: ['name'],
        }),
      }));
    });

    it('queries using supplied param', () => {
      search.suggest(client, 'samus');
      expect(client.search).toHaveBeenCalledWith(expect.objectContaining({
        body: expect.objectContaining({
          suggest: expect.objectContaining({
            player_suggest: expect.objectContaining({
              prefix: 'samus',
            }),
          }),
        }),
      }));
    });

    it('queries against the `suggest` field', () => {
      search.suggest(client, 'samus');
      expect(client.search).toHaveBeenCalledWith(expect.objectContaining({
        body: expect.objectContaining({
          suggest: expect.objectContaining({
            player_suggest: expect.objectContaining({
              completion: {field: 'suggest'},
            }),
          }),
        }),
      }));
    });

    it('resolves on success', () => {
      client.search.mockImplementation(() => Promise.resolve('success'));
      const result = search.suggest(client, 'samus');
      return expect(result).resolves.toBe('success');
    });

    it('rejects on error', () => {
      client.search.mockImplementation(() => Promise.reject('error'));
      const result = search.suggest(client, 'samus');
      return expect(result).rejects.toBe('error');
    });

  });  // #suggest

  describe('#removePlayer', () => {

    it('removes id from player index', () => {
      search.removePlayer(client, '12345');
      expect(client.delete).toHaveBeenCalledWith({
        index: 'players',
        type: 'player',
        id: '12345',
      });
    });

    it('resolves on success', () => {
      client.delete.mockImplementation(() => Promise.resolve('success'));
      const result = search.removePlayer(client, '12345');
      return expect(result).resolves.toBe('success');
    });

    it('rejects on error', () => {
      client.delete.mockImplementation(() => Promise.reject('error'));
      const result = search.removePlayer(client, '12345');
      return expect(result).rejects.toBe('error');
    });

  });  // #removePlayer

  describe('#addPlayer', () => {

    const samus = {
      id: 'samus',
      name: 'S. ARAN',
      kitName: 'SAMUS ARAN',
      age: 32,
      commentaryId: 'samus',
      nationality: Country.JAPAN,
      abilities: {
        explosivePower: 99,
      },
    } as Player;

    it('uses player index/type', () => {
      search.addPlayer(client, samus.id, samus);
      expect(client.index).toHaveBeenCalledWith(expect.objectContaining({
        index: 'players',
        type: 'player',
      }));
    });

    it('adds/updates correct id', () => {
      search.addPlayer(client, samus.id, samus);
      expect(client.index).toHaveBeenCalledWith(expect.objectContaining({
        id: samus.id,
      }));
    });

    it('indexes known fields', () => {
      search.addPlayer(client, samus.id, samus);

      const {id, name, kitName, age, abilities} = samus;
      expect(client.index).toHaveBeenCalledWith(expect.objectContaining({
        body: expect.objectContaining({
          id,
          name,
          age,
          abilities,
          kitName,
        }),
      }));
    });

    it('creates suggestion index for player and kit name', () => {
      search.addPlayer(client, samus.id, samus);

      expect(client.index.mock.calls[0][0].body.suggest).toEqual([
        {input: ['ARAN'], weight: 100},
        {input: ['SAMUS', 'ARAN'], weight: 75},
      ]);
    });

    it('resolves on success', () => {
      client.index.mockImplementation(() => Promise.resolve('success'));
      const result = search.addPlayer(client, samus.id, samus);
      return expect(result).resolves.toBe('success');
    });

    it('rejects on error', () => {
      client.index.mockImplementation(() => Promise.reject('error'));
      const result = search.addPlayer(client, samus.id, samus);
      return expect(result).rejects.toBe('error');
    });

  });  // #addPlayer

});  // search
