import * as admin from 'firebase-admin';

/// <reference path="../@types/jbinary.d.ts" />
import jBinary = require('jbinary');

import {EditFile} from '../typesets/edit-file';

const serviceAccount =
    require(`${__dirname}/../../../config/service-account.json`);


/**
 * Load EDIT00000000 data and save into DB.
 */
export async function load(fileName: string): Promise<void> {
  try {
    const jb: jBinary = await jBinary.load(fileName, EditFile);

    console.log(`Loading ${fileName}...`);
    const editData = jb.readAll();

    admin.initializeApp({credential: admin.credential.cert(serviceAccount)});

    const db = admin.firestore();

    const playersRef = db.collection('players');
    const players = editData.players.slice(0, 10).map(async (player: any) => {
      console.log(`Inserting ${player.id}...`);
      return await playersRef.doc('' + player.id).set(player);
    });
    await Promise.all(players);
    console.log(`Inserted ${players.length} players`);

    const teamsRef = db.collection('teams');
    const teams = editData.teams.slice(0, 10).map(async (team: any) => {
      console.log(`Inserting ${team.id}...`);
      return await teamsRef.doc('' + team.id).set(team);
    });
    await Promise.all(teams);
    console.log(`Inserted ${teams.length} teams`);
  } catch (err) {
    console.log(err);
    throw err;
  }
}
