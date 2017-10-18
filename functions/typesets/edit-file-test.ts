import {EditFile, HEADER_SIZE_BYTES, PLAYER_SIZE_BYTES} from './edit-file';
/// <reference path="../@types/jbinary.d.ts" />
import jBinary = require('jbinary');

// const fileName = `${__dirname}/../test/mcnameface-lacasweat_EDIT00000000`;
const fileName = `${__dirname}/../test/N.MCNAMEFACE.bin`;

// TODO(tstirrat/pesleagues#2): declare/generate types for these
// let data: any;
let player: any;
// let team: any;

beforeAll(() => {
  return jBinary.load(fileName, EditFile).then((jb: jBinary) => {
    const playerOffset: number = PLAYER_SIZE_BYTES * 13980;
    player = jb.read('Player', HEADER_SIZE_BYTES + playerOffset);
    player = jb.read('Player', 0);
    // player = data.players.find((p: any) => p.name === 'M. MCNAMEFACE');
  });
});

test('reads player name', () => {
  expect(player.name).toEqual('M. MCNAMEFACE');
});

test('reads player kit name', () => {
  expect(player.printName).toEqual('NAMEY');
});

test('reads player id', () => {
  expect(player.id).toEqual(1048576);
});

test('reads player age', () => {
  expect(player.age).toEqual(15);
});

test('reads player attributes', () => {
  expect(player.dribbling).toEqual(64);
  expect(player.attackingProwess).toEqual(64);
  expect(player.goalkeeping).toEqual(64);
});
