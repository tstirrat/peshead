import {EditFile, Player} from './edit-file';

/// <reference path="../@types/jbinary.d.ts" />
import jBinary = require('jbinary');

const attrs64File = `${__dirname}/../test/player-attrs-64.bin`;
const attrs99File = `${__dirname}/../test/player-attrs-99-descending.bin`;

let attrs64Player: Player;
let attrs99Player: Player;

describe('Player', () => {

  beforeAll(() => {
    return jBinary.load(attrs64File, EditFile)
        .then((jb: jBinary) => {
          attrs64Player = jb.read('Player', 0);
          return jBinary.load(attrs99File, EditFile);
        })
        .then((jb: jBinary) => {
          attrs99Player = jb.read('Player', 0);
        });
  });

  it('reads player name', () => {
    expect(attrs64Player.name).toEqual('M. MCNAMEFACE');
  });

  it('reads player kit name', () => {
    expect(attrs64Player.printName).toEqual('NAMEY');
  });

  it('reads player id', () => {
    expect(attrs64Player.id).toEqual(1048576);
  });

  // it('reads player age', () => {
  //   expect(attrs64Player.abilities.age).toEqual(15);
  // });

  it('reads player abilities', () => {
    // --- Player with all abilities set to 64

    expect(attrs64Player.abilities.attackingProwess).toEqual(64);
    expect(attrs64Player.abilities.ballControl).toEqual(64);
    // expect(attrs64Player.abilities.dribbling).toEqual(64);
    // expect(attrs64Player.abilities.lowPass).toEqual(64);
    // expect(attrs64Player.abilities.loftedPass).toEqual(64);
    expect(attrs64Player.abilities.finishing).toEqual(64);
    // expect(attrs64Player.abilities.placeKicking).toEqual(64);
    expect(attrs64Player.abilities.swerve).toEqual(64);
    // expect(attrs64Player.abilities.header).toEqual(64);
    expect(attrs64Player.abilities.defensiveProwess).toEqual(64);
    expect(attrs64Player.abilities.ballWinning).toEqual(64);
    // expect(attrs64Player.abilities.kickingPower).toEqual(64);
    // expect(attrs64Player.abilities.speed).toEqual(64);
    // expect(attrs64Player.abilities.explosivePower).toEqual(64);
    expect(attrs64Player.abilities.strength).toEqual(64);
    // expect(attrs64Player.abilities.physicalContact).toEqual(64);
    expect(attrs64Player.abilities.jump).toEqual(64);
    // expect(attrs64Player.abilities.goalkeeping).toEqual(64);
    expect(attrs64Player.abilities.catching).toEqual(64);
    // expect(attrs64Player.abilities.clearing).toEqual(64);
    // expect(attrs64Player.abilities.reflexes).toEqual(64);
    // expect(attrs64Player.abilities.coverage).toEqual(64);
    // expect(attrs64Player.abilities.stamina).toEqual(64);


    // --- Player with all abilities descending from 99

    expect(attrs99Player.abilities.attackingProwess).toEqual(99);
    expect(attrs99Player.abilities.ballControl).toEqual(98);
    // expect(attrs99Player.abilities.dribbling).toEqual(97);
    // expect(attrs99Player.abilities.lowPass).toEqual(96);
    // expect(attrs99Player.abilities.loftedPass).toEqual(95);
    expect(attrs99Player.abilities.finishing).toEqual(94);
    // expect(attrs99Player.abilities.placeKicking).toEqual(93);
    expect(attrs99Player.abilities.swerve).toEqual(92);
    // expect(attrs99Player.abilities.header).toEqual(91);
    expect(attrs99Player.abilities.defensiveProwess).toEqual(90);
    expect(attrs99Player.abilities.ballWinning).toEqual(89);
    // expect(attrs99Player.abilities.kickingPower).toEqual(88);
    // expect(attrs99Player.abilities.speed).toEqual(87);
    // expect(attrs99Player.abilities.explosivePower).toEqual(86);
    expect(attrs99Player.abilities.strength).toEqual(85);
    // expect(attrs99Player.abilities.physicalContact).toEqual(84);
    expect(attrs99Player.abilities.jump).toEqual(83);
    // expect(attrs99Player.abilities.goalkeeping).toEqual(82);
    expect(attrs99Player.abilities.catching).toEqual(81);
    // expect(attrs99Player.abilities.clearing).toEqual(80);
    // expect(attrs99Player.abilities.reflexes).toEqual(79);
    // expect(attrs99Player.abilities.coverage).toEqual(78);
    // expect(attrs99Player.abilities.stamina).toEqual(77);

    // expect(attrs99Player.abilities.weakFootUsage).toEqual(3);
    // expect(attrs99Player.abilities.weakFootAccuracy).toEqual(1);
  });

});  // Player
