import { CollectionReference } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';
import jBinary = require('jbinary');

import { Physique, Player, PlayerAbilities, PlayerMotion, Team } from '../shared/service/api';
import { getPositionWeights, getWeightedRating, PositionLabel } from '../shared/utils/player';
import { EditFile, Player as PlayerBinary, Team as TeamBinary } from '../typesets/edit-file';

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
  if (batchSize > 500 || !RECORD_TYPES.includes(recordType)) {
    throw new Error('batch size cannot be > 500');
  }
  const jb = await jBinary.load(fileName, EditFile);

  console.log(`Loading ${fileName}...`);
  const editData: EditFile = jb.readAll();

  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

  const db = admin.firestore();
  switch (recordType) {
    case 'players':
      await batchInsert<PlayerBinary>(
        editData.players,
        db.collection('players'),
        (set, ref, player) => {
          const record = createPlayer(player);
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
      throw new Error(`unknown record type ${recordType}`);
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
  const remaining = items;
  let count = 0;
  if (offset > 0) {
    remaining.splice(0, offset);
  }
  const maxChunks = Math.ceil(limit / batchSize);
  let inserted = 0;
  while (remaining.length && count < maxChunks) {
    const batchItems = remaining.splice(0, batchSize);
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
  console.log(`Wrote offsets: ${offset} - ${endIndex} (wrote: ${inserted})`);
}

/** Map a jBinary parsed player to DB/API schema (proto3 JSON) */
function createPlayer(input: PlayerBinary) {
  const player = new Player({
    id: '' + input.id,
    commentaryId: '' + input.commentaryId,
    nationality: input.nationality,
    name: input.name,
    kitName: input.printName,
    age: input.block5.age,
    preferredFoot: 0, // player.block7.strongFoot ? 'LEFT' : 'RIGHT',
    registeredPosition: input.block5.registeredPosition,
    physique: new Physique({
      height: input.height,
      weight: input.weight
    }),
    ovr: 0,
    appearance: {},
    playingStyle: input.block5.playingStyle,
    abilities: new PlayerAbilities({
      attackingProwess: input.block1.attackingProwess,
      ballControl: input.block5.ballControl,
      ballWinning: input.block5.ballWinning,
      bodyControl: input.block4.bodyControl,
      catching: input.block3.catching,
      clearing: input.block3.clearing,
      coverage: input.block6.coverage,
      defensiveProwess: input.block1.defensiveProwess,
      dribbling: input.block1.dribbling,
      explosivePower: input.block4.explosivePower,
      finishing: input.block2.finishing,
      form: input.block2.form,
      goalkeeping: input.block1.goalkeeping,
      header: input.block2.header,
      injuryResistance: 0, // player.block3.injuryResistance,
      jump: input.block6.jump,
      kickingPower: input.block4.kickingPower,
      loftedPass: input.block2.loftedPass,
      lowPass: input.block2.lowPass,
      physicalContact: input.block4.physicalContact,
      placeKicking: input.block7.placeKicking,
      reflexes: input.block3.reflexes,
      speed: input.block8.speed,
      stamina: input.block8.stamina,
      swerve: input.block3.swerve,
      weakFootAccuracy: 0, //  player.block5.weakFootAccuracy,
      weakFootUsage: 0 //  player.block6.weakFootUsage,
    }),
    isEdited: false,
    isBaseCopy: !!input.block8.isBaseCopy,
    motion: new PlayerMotion({
      armDribbling: input.block4.motionDribblingArms,
      armRunning: input.block6.motionRunningArms,
      cornerKick: input.block6.motionCornerKick,
      freeKick: input.block1.motionFreeKick,
      goalCelebration1: input.motionGoalCelebration1,
      goalCelebration2: input.motionGoalCelebration2,
      hunchingDribbling: input.block7.motionDribblingHunching,
      hunchingRunning: input.block7.motionRunningHunching,
      penaltyKick: input.block7.motionPenaltyKick
    })
  });

  const overallRating = getWeightedRating(
    player,
    getPositionWeights(player.registeredPosition)
  );
  player.ovr = overallRating;
  return player;
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
