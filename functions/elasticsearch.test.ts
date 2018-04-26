import { Client } from 'elasticsearch';

import * as search from './elasticsearch';
import { Country, Foot, Player, PlayingStyle, Position } from './shared/service/api';

describe('search', () => {
  // tslint:disable-next-line:variable-name
  const MockClient = jest.fn<Client>(() => {
    return {
      search: jest.fn(),
      bulk: jest.fn(),
      delete: jest.fn()
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
      host: '[host]'
    };

    it('throws if config.es is not set', () => {
      expect(() => search.createClient(undefined)).toThrowError(
        'config.es is not set'
      );
    });

    it('throws if es.access_key_id is not set', () => {
      const invalidConfig = { secret_access_key: 'b', host: '[host]' };
      expect(() => search.createClient(invalidConfig)).toThrowError(
        'accessKeyId/secretAccessKey/host are not set'
      );
    });

    it('throws if es.secret_access_key is not set', () => {
      const invalidConfig = { access_key_id: 'a', host: '[host]' };
      expect(() => search.createClient(invalidConfig)).toThrowError(
        'accessKeyId/secretAccessKey/host are not set'
      );
    });

    it('throws if es.host is not set', () => {
      const invalidConfig = {
        access_key_id: 'a',
        secret_access_key: 'b'
      };
      expect(() => search.createClient(invalidConfig)).toThrowError(
        'accessKeyId/secretAccessKey/host are not set'
      );
    });

    // TODO: mock modules and test client creation with params
  }); // #createClient

  describe('#search', () => {
    it('uses player index', () => {
      search.search(client, 'samus');
      expect(client.search).toHaveBeenCalledWith(
        expect.objectContaining({
          index: 'players',
          type: 'player'
        })
      );
    });

    it('queries against `name` field using `query` param', () => {
      search.search(client, 'samus');
      expect(client.search).toHaveBeenCalledWith(
        expect.objectContaining({
          body: expect.objectContaining({
            query: {
              match: {
                name: { query: 'samus', analyzer: 'standard' }
              }
            }
          })
        })
      );
    });

    it('defaults to page size of 20', () => {
      search.search(client, 'samus');
      expect(client.search).toHaveBeenCalledWith(
        expect.objectContaining({
          body: expect.objectContaining({
            size: 20
          })
        })
      );
    });

    it('accepts custom `limit` parameter', () => {
      search.search(client, 'samus', { limit: 25 });
      expect(client.search).toHaveBeenCalledWith(
        expect.objectContaining({
          body: expect.objectContaining({
            size: 25
          })
        })
      );
    });

    it('defaults to page start of 0', () => {
      search.search(client, 'samus');
      expect(client.search).toHaveBeenCalledWith(
        expect.objectContaining({
          body: expect.objectContaining({
            from: 0
          })
        })
      );
    });

    it('accepts custom `start` parameter', () => {
      search.search(client, 'samus', { start: 25 });
      expect(client.search).toHaveBeenCalledWith(
        expect.objectContaining({
          body: expect.objectContaining({
            from: 25
          })
        })
      );
    });

    it('defaults to sort of `ovr desc`', () => {
      search.search(client, 'samus');
      expect(client.search).toHaveBeenCalledWith(
        expect.objectContaining({
          body: expect.objectContaining({
            sort: [{ ovr: { order: 'desc' } }]
          })
        })
      );
    });

    it('accepts custom `sortField` and `sortDirection` parameters', () => {
      search.search(client, 'samus', { sortField: 'a', sortDirection: 'b' });
      expect(client.search).toHaveBeenCalledWith(
        expect.objectContaining({
          body: expect.objectContaining({
            sort: [{ a: { order: 'b' } }]
          })
        })
      );
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
  }); // #search

  describe('#suggest', () => {
    it('uses player index', () => {
      search.suggest(client, 'samus');
      expect(client.search).toHaveBeenCalledWith(
        expect.objectContaining({
          index: 'players',
          type: 'player'
        })
      );
    });

    it('limits returned fields', () => {
      search.suggest(client, 'samus');
      expect(client.search).toHaveBeenCalledWith(
        expect.objectContaining({
          body: expect.objectContaining({
            _source: ['name']
          })
        })
      );
    });

    it('queries using supplied param', () => {
      search.suggest(client, 'samus');
      expect(client.search).toHaveBeenCalledWith(
        expect.objectContaining({
          body: expect.objectContaining({
            suggest: expect.objectContaining({
              player_suggest: expect.objectContaining({
                prefix: 'samus'
              })
            })
          })
        })
      );
    });

    it('queries against the `suggest` field', () => {
      search.suggest(client, 'samus');
      expect(client.search).toHaveBeenCalledWith(
        expect.objectContaining({
          body: expect.objectContaining({
            suggest: expect.objectContaining({
              player_suggest: expect.objectContaining({
                completion: { field: 'suggest' }
              })
            })
          })
        })
      );
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
  }); // #suggest

  describe('#removePlayer', () => {
    it('removes id from player index', () => {
      search.removePlayer(client, '12345');
      expect(client.delete).toHaveBeenCalledWith({
        index: 'players',
        type: 'player',
        id: '12345'
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
  }); // #removePlayer

  describe('#addPlayers', () => {
    const samus = {
      id: 'samus',
      name: 'S. ARAN',
      kitName: 'SAMUS ARAN',
      age: 32,
      commentaryId: 'samus',
      nationality: Country.JAPAN,
      abilities: {
        explosivePower: 99
      },
      ovr: 99,
      physique: {
        height: 123,
        weight: 78
      },
      registeredPosition: Position.CMF,
      playingStyle: PlayingStyle.ANCHOR_MAN,
      preferredFoot: Foot.LEFT
    } as Player;

    const kraid = {
      id: 'kraid',
      name: 'KRAID',
      kitName: 'KRAID',
      age: 32,
      commentaryId: 'kraid',
      nationality: Country.JAPAN,
      abilities: {
        explosivePower: 99
      },
      ovr: 99,
      physique: {
        height: 123,
        weight: 78
      },
      registeredPosition: Position.CMF,
      playingStyle: PlayingStyle.ANCHOR_MAN,
      preferredFoot: Foot.LEFT
    } as Player;

    const bulkOperationRow = (mock: jest.Mocked<Client>, index = 0) =>
      mock.bulk.mock.calls[0][0].body[index];

    it('adds two rows per player', () => {
      search.addPlayers(client, [samus, kraid]);
      expect(client.bulk.mock.calls[0][0].body).toHaveLength(4);
    });

    describe('for each player', () => {
      it('uses player index/type', () => {
        search.addPlayers(client, [samus, kraid]);
        expect(bulkOperationRow(client)).toEqual({
          index: expect.objectContaining({
            _index: 'players',
            _type: 'player'
          })
        });
      });

      it('adds/updates correct id', () => {
        search.addPlayers(client, [samus, kraid]);
        expect(bulkOperationRow(client)).toEqual({
          index: expect.objectContaining({
            _id: samus.id
          })
        });
      });

      it('indexes known fields', () => {
        search.addPlayers(client, [samus, kraid]);

        const {
          id,
          abilities,
          age,
          kitName,
          name,
          nationality,
          ovr,
          registeredPosition,
          physique,
          preferredFoot,
          playingStyle
        } = samus;
        expect(bulkOperationRow(client, 1)).toEqual(
          expect.objectContaining({
            id,
            abilities,
            age,
            kitName,
            name,
            nationality,
            ovr,
            registeredPosition,
            physique,
            preferredFoot,
            playingStyle
          })
        );
      });

      it('creates suggestion index for player and kit name', () => {
        search.addPlayers(client, [samus, kraid]);

        expect(bulkOperationRow(client, 1).suggest).toEqual([
          { input: ['ARAN'], weight: 100 },
          { input: ['SAMUS', 'ARAN'], weight: 75 }
        ]);
      });
    }); // for each player

    it('resolves on success', () => {
      client.bulk.mockImplementation(() => Promise.resolve('success'));
      const result = search.addPlayers(client, [samus, kraid]);
      return expect(result).resolves.toBe('success');
    });

    it('rejects on error', () => {
      client.bulk.mockImplementation(() => Promise.reject('error'));
      const result = search.addPlayers(client, [samus, kraid]);
      return expect(result).rejects.toBe('error');
    });
  }); // #addPlayers
}); // search
