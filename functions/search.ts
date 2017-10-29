import * as AWS from 'aws-sdk';
import * as elasticsearch from 'elasticsearch';
import * as functions from 'firebase-functions';
import * as HttpAmazonESConnector from 'http-aws-es';

import {Player} from './service/api';

interface ClientConfig {
  access_key_id: string;
  secret_access_key: string;
  region?: string;
  host: string;
}

export function createClient(config: ClientConfig) {
  if (!config) {
    throw new Error('config.es is not set');
  }
  const accessKeyId: string = config.access_key_id;
  const secretAccessKey: string = config.secret_access_key;
  const region: string = config.region || 'us-west-1';
  const host: string = config.host;

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
      name: player.name,
      kitName: player.kitName,
      abilities: player.abilities,
      age: player.age,
    }
  });
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
        multi_match: {
          query,
          fields: ['name.keyword', 'kitName.keyword'],
        },
      },
    },
  });
}
