import * as admin from 'firebase-admin';

/// <reference path="../@types/jbinary.d.ts" />
import jBinary = require('jbinary');
import {Player as PlayerRecord, PlayerAbilities, PlayerMotion} from '../service/api';
import {EditFile, Player} from '../typesets/edit-file';

const serviceAccount =
    require(`${__dirname}/../../../config/service-account.json`);


/**
 * Load EDIT00000000 data and save into DB.
 */
export async function load(fileName: string) {
  try {
    const jb: jBinary = await jBinary.load(fileName, EditFile);

    console.log(`Loading ${fileName}...`);
    const editData: EditFile = jb.readAll();

    admin.initializeApp({credential: admin.credential.cert(serviceAccount)});

    const db = admin.firestore();

    const playersRef = db.collection('players');
    const remaining = editData.players;
    let count = 0;
    while (remaining.length && count < 100) {
      const batch = remaining.splice(0, 50);

      console.log('inserting:', batch.map(p => p.id));

      const saves: Promise<any>[] = batch.map((player: Player) => {
        // console.log(`Inserting ${player.id}...`);
        if (hasUndefinedProperty(player)) {
          return Promise.resolve();
        }
        const record = createPlayer(player);
        return playersRef.doc('' + player.id).set(record);
      });
      const results = await Promise.all(saves)
      console.log('--- Wrote: ', results.length);
      count++;
    }

    // const teamsRef = db.collection('teams');
    // const teams = editData.teams.map(async (team: any) => {
    //   console.log(`Inserting ${team.id}...`);
    //   return teamsRef.doc('' + team.id).set(team);
    // });
    // await Promise.all(teams);
    // console.log(`Inserted ${teams.length} teams`);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

/** Map a jBinary parsed player to DB/API schema (proto3 JSON) */
function createPlayer(player: Player) {
  return PlayerRecord
      .create({
        id: player.id,
        commentaryId: player.commentaryId,
        nationality: player.nationality,
        name: player.name,
        kitName: player.printName,
        age: player.block5.age,
        // preferredFoot: player.block7.strongFoot ? 'LEFT' : 'RIGHT',
        abilities: PlayerAbilities.create({
          attackingProwess: player.block1.attackingProwess,
          ballControl: player.block5.ballControl,
          ballWinning: player.block5.ballWinning,
          bodyControl: player.block4.bodyControl,
          catching: player.block3.catching,
          clearing: player.block3.clearing,
          // coverage: player.block6.coverage,
          defensiveProwess: player.block1.defensiveProwess,
          dribbling: player.block1.dribbling,
          explosivePower: player.block4.explosivePower,
          finishing: player.block2.finishing,
          form: player.block2.form,
          goalkeeping: player.block1.goalkeeping,
          header: player.block2.header,
          injuryResistance: player.block3.injuryResistance,
          // jump: player.block6.jump,
          kickingPower: player.block4.kickingPower,
          loftedPass: player.block2.loftedPass,
          lowPass: player.block2.lowPass,
          physicalContact: player.block4.physicalContact,
          // placeKicking: player.block6.placeKicking,
          reflexes: player.block3.reflexes,
          // speed: player.block7.speed,
          // stamina: player.block7.stamina,
          swerve: player.block3.swerve,
          weakFootAccuracy: player.block5.weakFootAccuracy,
          // weakFootUsage: player.block6.weakFootUsage,
        }),
        // isEdited: player.block2.isCreated,
        // isBaseCopy: player.block7.isBaseCopy,
        // motion: PlayerMotion.create({
        //   armDribbling: player.block4.motionDribblingArms,
        //   armRunning: player.block6.motionRunningArms,
        //   cornerKick: player.block6.motionCornerKick,
        //   freeKick: player.block1.motionFreeKick,
        //   goalCelebration1: player.motionGoalCelebration1,
        //   goalCelebration2: player.motionGoalCelebration2,
        //   hunchingDribbling: player.block6.motionDribblingHunching,
        //   hunchingRunning: player.block6.motionRunningHunching,
        //   penaltyKick: player.block6.motionPenaltyKick,
        // }),
      })
      .toJSON();
}

function hasUndefinedProperty(obj: any): boolean {
  return Object.keys(obj).some(k => {
    if (typeof obj[k] === 'object') {
      return hasUndefinedProperty(obj[k]);
    }
    const isUndefined = obj[k] === undefined;
    if (isUndefined) {
      console.log('-- undefined', k);
    }
    return isUndefined;
  });
}
