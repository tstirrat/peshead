import jBinary = require('jbinary');

import { Foot, PlayingStyle, Position, Skill } from '../shared/service/api';
import { EditFile, Player } from './edit-file';

const attrs64File = `${__dirname}/../test/player-attrs-64.bin`;
const attrs99File = `${__dirname}/../test/player-attrs-99-descending.bin`;

let attrs64Player: Player;
let attrs99Player: Player;

describe('Player', () => {
  beforeAll(() => {
    return jBinary
      .load(attrs64File, EditFile)
      .then((jb: jBinary) => {
        attrs64Player = jb.read('Player', 0);
        return jBinary.load(attrs99File, EditFile);
      })
      .then((jb: jBinary) => {
        attrs99Player = jb.read('Player', 0);
      });
  });

  it('reads player name', () => {
    expect(attrs64Player.name).toEqual('MINIMUMS');
  });

  it('reads player kit name', () => {
    expect(attrs64Player.printName).toEqual('MIN');
    // Name: MINIMUS
    // nationality: 1 Afghanistan = 0000000000000001
    // Age: 15 = 15
    // Foot: right = 0
    // reg: CB = 0001
    // playable: GK = 00000000000000000000000001
    // weak foot usage/accuracy: 2 = 01
    // form: 2 = 001
    // injury: 2 = 01
    // skills: Fighting Spirit = 0000000000000000000000000001
    // style: poacher = 00001
    // com PS: Long Ranger = 000001
    // motion: all 2 = 001

    // Name: DESCENDING
    // DESC
    // nationality: Montenegro = 304 = 0000000100110000
    // age: 32 = 100000
    // Foot: left = 1
    // reg: AMF (8) = 1000
    // playable: alternating = 10101010101010101010101010
    // weak foot U: 4 (3) = 11
    // weak foot A: 2 (1) = 01
    // Form: 5 (4) = 100
    // Inj res: 3 (2) = 10
    // skills: custom = 1111111111000000000000000000
    // style: OFF GK = 10001
    // com ps: Trickster,Long Ranger = 100001
    // motion: see screenshots
  });

  it('reads player id', () => {
    expect(attrs64Player.id).toEqual(1048576);
  });

  it('reads player age', () => {
    expect(attrs64Player.block5.age).toEqual(15);
    expect(attrs99Player.block5.age).toEqual(32);
  });

  it('reads player position', () => {
    expect(attrs64Player.block5.registeredPosition).toEqual(Position.CB);
    expect(attrs99Player.block5.registeredPosition).toEqual(Position.AMF);
  });

  it('reads player playing style', () => {
    expect(attrs64Player.block5.playingStyle).toEqual(
      PlayingStyle.GOAL_POACHER
    );
    // possibly incorrect
    // expect(attrs99Player.block5.playingStyle).toEqual(
    //   PlayingStyle.OFFENSIVE_GOALKEEPER
    // );
  });

  // incorrect
  it.skip('reads player preferred foot', () => {
    expect(attrs64Player.block8.strongFoot).toEqual(Foot.LEFT);
    expect(attrs99Player.block8.strongFoot).toEqual(Foot.RIGHT);
  });

  // incorrect
  it.skip('reads player skills', () => {
    expect(attrs64Player.block9.playerSkills).toEqual(Skill.FIGHTING_SPIRIT);
    // expect(attrs99Player.block8.strongFoot).toEqual(Foot.RIGHT);
  });

  it('reads player abilities', () => {
    // --- Player with all abilities set to 64

    expect(attrs64Player.block1.attackingProwess).toEqual(64);
    expect(attrs64Player.block5.ballControl).toEqual(64);
    expect(attrs64Player.block1.dribbling).toEqual(64);
    expect(attrs64Player.block2.lowPass).toEqual(64);
    expect(attrs64Player.block2.loftedPass).toEqual(64);
    expect(attrs64Player.block2.finishing).toEqual(64);
    expect(attrs64Player.block7.placeKicking).toEqual(64);
    expect(attrs64Player.block3.swerve).toEqual(64);
    expect(attrs64Player.block2.header).toEqual(64);
    expect(attrs64Player.block1.defensiveProwess).toEqual(64);
    expect(attrs64Player.block5.ballWinning).toEqual(64);
    expect(attrs64Player.block4.kickingPower).toEqual(64);
    expect(attrs64Player.block8.speed).toEqual(64);
    expect(attrs64Player.block4.explosivePower).toEqual(64);
    expect(attrs64Player.block4.bodyControl).toEqual(64);
    expect(attrs64Player.block4.physicalContact).toEqual(64);
    expect(attrs64Player.block6.jump).toEqual(64);
    expect(attrs64Player.block1.goalkeeping).toEqual(64);
    expect(attrs64Player.block3.catching).toEqual(64);
    expect(attrs64Player.block3.clearing).toEqual(64);
    expect(attrs64Player.block3.reflexes).toEqual(64);
    expect(attrs64Player.block6.coverage).toEqual(64);
    expect(attrs64Player.block8.stamina).toEqual(64);

    // --- Player with all abilities descending from 99

    expect(attrs99Player.block1.attackingProwess).toEqual(99);
    expect(attrs99Player.block5.ballControl).toEqual(98);
    expect(attrs99Player.block1.dribbling).toEqual(97);
    expect(attrs99Player.block2.lowPass).toEqual(96);
    expect(attrs99Player.block2.loftedPass).toEqual(95);
    expect(attrs99Player.block2.finishing).toEqual(94);
    expect(attrs99Player.block7.placeKicking).toEqual(93);
    expect(attrs99Player.block3.swerve).toEqual(92);
    expect(attrs99Player.block2.header).toEqual(91);
    expect(attrs99Player.block1.defensiveProwess).toEqual(90);
    expect(attrs99Player.block5.ballWinning).toEqual(89);
    expect(attrs99Player.block4.kickingPower).toEqual(88);
    expect(attrs99Player.block8.speed).toEqual(87);
    expect(attrs99Player.block4.explosivePower).toEqual(86);
    expect(attrs99Player.block4.bodyControl).toEqual(85);
    expect(attrs99Player.block4.physicalContact).toEqual(84);
    expect(attrs99Player.block6.jump).toEqual(83);
    expect(attrs99Player.block1.goalkeeping).toEqual(82);
    expect(attrs99Player.block3.catching).toEqual(81);
    expect(attrs99Player.block3.clearing).toEqual(80);
    expect(attrs99Player.block3.reflexes).toEqual(79);
    expect(attrs99Player.block6.coverage).toEqual(78);
    expect(attrs99Player.block8.stamina).toEqual(77);

    // Various other bits:

    // expect(attrs99Player.block6.weakFootUsage).toEqual(3);
    // expect(attrs99Player.block6.motionRunningArms).toEqual(6);
    // expect(attrs99Player.block6.motionCornerKick).toEqual(5);
    // expect(attrs99Player.abilities.weakFootAccuracy).toEqual(1);
  });
}); // Player
