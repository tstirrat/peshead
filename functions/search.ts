import * as AWS from 'aws-sdk';
import * as elasticsearch from 'elasticsearch';
import * as functions from 'firebase-functions';
import * as HttpAmazonESConnector from 'http-aws-es';

import {Player} from './service/api';

export interface ClientConfig {
  access_key_id?: string;
  secret_access_key?: string;
  region?: string;
  host?: string;
}

export function createClient(config?: ClientConfig) {
  if (!config) {
    throw new Error('config.es is not set');
  }
  const accessKeyId = config.access_key_id;
  const secretAccessKey = config.secret_access_key;
  const {region = 'us-west-1', host} = config;

  if (!accessKeyId || !host || !secretAccessKey) {
    throw new Error('accessKeyId/secretAccessKey/host are not set');
  }

  const awsConfig = new AWS.Config({
    credentials: new AWS.Credentials(accessKeyId, secretAccessKey),
    region,
  });

  const options = {
    hosts: [host],
    connectionClass: HttpAmazonESConnector,
    awsConfig,
    httpOptions: {}
  };

  return new elasticsearch.Client(options);
}

/**
 * Add a player record to the index. Overwrites existing record, if already
 * present.
 */
export async function addPlayer(
    client: elasticsearch.Client, id: string, player: Player) {
  return client.index({
    index: 'players',
    type: 'player',
    id,
    body: {
      id: player.id,
      name: player.name,
      kitName: player.kitName,
      abilities: player.abilities,
      age: player.age,
      suggest: [
        {
          input: tokenizeName(player.name),
          weight: 100,
        },
        {
          input: tokenizeName(player.kitName),
          weight: 75,
        },
      ]
    }
  });
}

/** Remove player initial (L.) and tokenize remainder of player name (MESSI) */
function tokenizeName(name: string) {
  return name.split(' ').filter(piece => piece[1] !== '.');
}

/** Remove a player record from the index. */
export async function removePlayer(client: elasticsearch.Client, id: string) {
  return client.delete({
    index: 'players',
    type: 'player',
    id,
  });
}

/** Perform basic search. TODO: add more functionality. */
export async function search(client: elasticsearch.Client, query: string) {
  return client.search({
    type: 'player',
    index: 'players',
    body: {
      query: {
        match: {
          name: {query, analyzer: 'standard'},
        },
      }
    }
  });
}


/** Perform basic suggest. Return minial fields (position, id, name) */
export async function suggest(client: elasticsearch.Client, prefix: string) {
  return client.suggest({
    index: 'players',
    body: {
      player_suggest: {
        prefix,
        completion: {
          field: 'suggest',
        }
      }
    }
  });
}
