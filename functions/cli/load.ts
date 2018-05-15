import { CollectionReference } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';
import jBinary = require('jbinary');

import { Player } from '../shared/models/player';
import { Team } from '../shared/service/api';
import { EditData, Player as PlayerBinary, Team as TeamBinary } from '../shared/types/edit-file';
import { PositionLabel } from '../shared/utils/player';
import { EditFile } from '../typesets/edit-file';

const serviceAccount = require(`${__dirname}/../../../config/service-account.json`);

const RECORD_TYPES = ['players', 'teams'];

/**
 * Load EDIT00000000 data and save into DB.
 */
export async function load(
  fileName: string,
  recordType: string,
  limit = 100,
  offset = 0,
  batchSize = 500
) {
  if (batchSize > 500) {
    throw new Error('batch size cannot be > 500');
  }

  if (!RECORD_TYPES.includes(recordType)) {
    throw new Error(`Unknown record type ${recordType}`);
  }

  const jb = await jBinary.load(fileName, EditFile);

  console.log(`Loading ${fileName}...`);
  const editData: EditData = jb.readAll();

  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

  const db = admin.firestore();
  switch (recordType) {
    case 'players':
      await batchInsert<PlayerBinary>(
        editData.players,
        db.collection('players'),
        (set, ref, player) => {
          const record = Player.fromBinary(player);
          console.log(
            `  adding ${record.id}: ` +
              `[${record.ovr} ${PositionLabel[record.registeredPosition]}] ` +
              `${record.name}...`
          );
          const payload = record.toJSON();
          set(record.id, payload);
        },
        limit,
        offset,
        batchSize
      );
      break;
    case 'teams':
      await batchInsert<TeamBinary>(
        editData.teams,
        db.collection('teams'),
        (set, ref, team) => {
          const record = createTeam(team);
          console.log(`  adding ${record.id}: ${record.name}...`);
          const payload = record.toJSON();
          set(record.id, payload);
        },
        limit,
        offset,
        batchSize
      );
      console.log(`Total ${editData.teams.length}`);
      break;
    default:
      throw new Error(`Unknown record type ${recordType}`);
  }
}

/** Insert items via Firestore batching */
async function batchInsert<T>(
  items: T[],
  ref: CollectionReference,
  callback: (
    write: (id: string, payload: {}) => void,
    ref: CollectionReference,
    player: T
  ) => void,
  limit = 1000,
  offset = 0,
  batchSize = 500
) {
  const remaining = [...items];
  let count = 0;
  if (offset > 0) {
    remaining.splice(0, offset);
  }
  const maxChunks = Math.ceil(limit / batchSize);
  let inserted = 0;
  while (remaining.length && count < maxChunks) {
    const batchItems = remaining.splice(0, Math.min(batchSize, limit));
    const batch = ref.firestore.batch();

    const set = (id: string, payload: {}) => {
      try {
        batch.set(ref.doc(id), payload);
      } catch (e) {
        console.log(`could not insert item ${id}`, e);
        hasUndefinedProperty(payload);
      }
    };

    batchItems.forEach(item => callback(set, ref, item));

    try {
      console.log(`--- Writing batch: ${batchItems.length} items`);
      const results = await batch.commit();
      console.log(`--- Wrote: ${inserted + results.length}/${limit}`);
    } catch (e) {
      console.warn('xxx Failed to write batch:', e);
    }
    count++;
    inserted += batchItems.length;
  }

  const endIndex = offset + limit;
  console.log(`Wrote offsets: ${offset} - ${endIndex} of ${items.length}`);
  console.log(`Wrote ${inserted} items (some may have failed)`);
}

/** Map a jBinary parsed player to DB/API schema (proto3 JSON) */
function createTeam(input: TeamBinary) {
  return new Team({
    id: '' + input.id,
    name: input.name
  });
}

// tslint:disable-next-line:no-any
function hasUndefinedProperty(obj: any): boolean {
  return Object.keys(obj).some(k => {
    if (typeof obj[k] === 'object') {
      return hasUndefinedProperty(obj[k]);
    }
    const isUndefined = obj[k] === undefined;
    if (isUndefined) {
      console.log(`-- undefined prop: ${k}`);
    }
    return isUndefined;
  });
}
