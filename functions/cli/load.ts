// tslint:disable:no-console
import * as admin from 'firebase-admin';
import jBinary = require('jbinary');

import { Physique, Player, PlayerAbilities, PlayerMotion } from '../service/api';
import { EditFile, Player as PlayerBinary } from '../typesets/edit-file';

const serviceAccount = require(`${__dirname}/../../../config/service-account.json`);

/**
 * Load EDIT00000000 data and save into DB.
 */
export async function load(
  fileName: string,
  limit: number = 100,
  offset: number = 0,
  batchSize: number = 500
) {
  if (batchSize > 500) {
    throw new Error('batch size cannot be > 500');
  }
  const jb = await jBinary.load(fileName, EditFile);

  console.log(`Loading ${fileName}...`);
  const editData: EditFile = jb.readAll();

  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

  const db = admin.firestore();

  const playersRef = db.collection('players');
  const remaining = editData.players;
  let count = 0;
  if (offset > 0) {
    remaining.splice(0, offset);
  }
  const maxChunks = Math.ceil(limit / batchSize);
  let inserted = 0;
  while (remaining.length && count < maxChunks) {
    const players = remaining.splice(0, batchSize);
    const batch = db.batch();

    players.forEach((player: PlayerBinary) => {
      const record = createPlayer(player);
      console.log(
        `inserting ${record.id}: ${record.registeredPosition} ` +
          `${record.name}...`
      );
      const payload = record.toJSON();
      try {
        batch.set(playersRef.doc('' + player.id), payload);
      } catch (e) {
        console.log(`could not insert player ${player.id}`, e);
        hasUndefinedProperty(payload);
      }
    });
    try {
      const results = await batch.commit();
      console.log(`--- Wrote: ${inserted + results.length}/${limit}`);
    } catch (e) {
      console.log('xxx Failed to write batch:', e);
    }
    count++;
    inserted += players.length;
  }

  const startIndex = offset;
  const endIndex = offset + limit;
  console.log(
    `Wrote player offsets: ${startIndex} - ${endIndex} (wrote: ${inserted})`
  );

  // const teamsRef = db.collection('teams');
  // const teams = editData.teams.map(async (team: any) => {
  //   console.log(`Inserting ${team.id}...`);
  //   return teamsRef.doc('' + team.id).set(team);
  // });
  // await Promise.all(teams);
  // console.log(`Inserted ${teams.length} teams`);
}

/** Map a jBinary parsed player to DB/API schema (proto3 JSON) */
function createPlayer(player: PlayerBinary) {
  return new Player({
    id: '' + player.id,
    commentaryId: '' + player.commentaryId,
    nationality: player.nationality,
    name: player.name,
    kitName: player.printName,
    age: player.block5.age,
    preferredFoot: 0, // player.block7.strongFoot ? 'LEFT' : 'RIGHT',
    registeredPosition: player.block5.registeredPosition,
    physique: new Physique({
      height: player.height,
      weight: player.weight
    }),
    appearance: {},
    playingStyle: player.block5.playingStyle,
    abilities: new PlayerAbilities({
      attackingProwess: player.block1.attackingProwess,
      ballControl: player.block5.ballControl,
      ballWinning: player.block5.ballWinning,
      bodyControl: player.block4.bodyControl,
      catching: player.block3.catching,
      clearing: player.block3.clearing,
      coverage: player.block6.coverage,
      defensiveProwess: player.block1.defensiveProwess,
      dribbling: player.block1.dribbling,
      explosivePower: player.block4.explosivePower,
      finishing: player.block2.finishing,
      form: player.block2.form,
      goalkeeping: player.block1.goalkeeping,
      header: player.block2.header,
      injuryResistance: -1, // player.block3.injuryResistance,
      jump: player.block6.jump,
      kickingPower: player.block4.kickingPower,
      loftedPass: player.block2.loftedPass,
      lowPass: player.block2.lowPass,
      physicalContact: player.block4.physicalContact,
      placeKicking: player.block7.placeKicking,
      reflexes: player.block3.reflexes,
      speed: player.block8.speed,
      stamina: player.block8.stamina,
      swerve: player.block3.swerve,
      weakFootAccuracy: -1, //  player.block5.weakFootAccuracy,
      weakFootUsage: -1 //  player.block6.weakFootUsage,
    }),
    isEdited: false,
    isBaseCopy: !!player.block8.isBaseCopy,
    motion: new PlayerMotion({
      armDribbling: player.block4.motionDribblingArms,
      armRunning: player.block6.motionRunningArms,
      cornerKick: player.block6.motionCornerKick,
      freeKick: player.block1.motionFreeKick,
      goalCelebration1: player.motionGoalCelebration1,
      goalCelebration2: player.motionGoalCelebration2,
      hunchingDribbling: player.block7.motionDribblingHunching,
      hunchingRunning: player.block7.motionRunningHunching,
      penaltyKick: player.block7.motionPenaltyKick
    })
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
