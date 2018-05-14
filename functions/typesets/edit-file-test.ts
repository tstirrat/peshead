import jBinary = require('jbinary');

import { Player } from '../shared/player';
import { ComPlayingStyle, Foot, Playable, PlayingStyle, Position, Skill } from '../shared/service/api';
import { EditFile } from './edit-file';

const attrs64File = `${__dirname}/../test/player-attrs-64.bin`;
const attrs99File = `${__dirname}/../test/player-attrs-99-descending.bin`;

let attrs64: Player;
let attrs99: Player;

describe('Player', () => {
  beforeAll(() => {
    return jBinary
      .load(attrs64File, EditFile)
      .then((jb: jBinary) => {
        const raw = jb.read('Player', 0);
        attrs64 = Player.fromBinary(raw);
        return jBinary.load(attrs99File, EditFile);
      })
      .then((jb: jBinary) => {
        const raw = jb.read('Player', 0);
        attrs99 = Player.fromBinary(raw);
      });
  });

  it('reads player name', () => {
    expect(attrs64.name).toEqual('MINIMUMS');
  });

  it('reads player kit name', () => {
    expect(attrs64.kitName).toEqual('MIN');
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
    expect(attrs64.id).toEqual('1048576');
    expect(attrs99.id).toEqual('1048577');
  });

  it('reads player age', () => {
    expect(attrs64.age).toEqual(15);
    expect(attrs99.age).toEqual(32);
  });

  it('reads player position', () => {
    expect(attrs64.registeredPosition).toEqual(Position.CB);
    expect(attrs99.registeredPosition).toEqual(Position.AMF);
  });

  it('reads playable positions', () => {
    expect(attrs64.playablePositions).toEqual({
      gk: Playable.B
    });
    expect(attrs99.playablePositions).toEqual({
      amf: Playable.A,
      cf: Playable.A,
      dmf: Playable.A,
      gk: Playable.A,
      lwf: Playable.A,
      rb: Playable.A,
      rmf: Playable.A
    });
  });

  it('reads player playing style', () => {
    expect(attrs64.playingStyle).toEqual(PlayingStyle.GOAL_POACHER);
    // still incorrect?
    // expect(attrs99.playingStyle).toEqual(PlayingStyle.OFFENSIVE_GOALKEEPER);
  });

  it('reads COM playing style', () => {
    expect(attrs64.comPlayingStyles).toEqual([ComPlayingStyle.LONG_RANGER]);
    expect(attrs99.comPlayingStyles).toEqual([
      ComPlayingStyle.TRICKSTER,
      ComPlayingStyle.LONG_RANGER
    ]);
  });

  it('reads player preferred foot', () => {
    expect(attrs64.preferredFoot).toEqual(Foot.RIGHT);
    expect(attrs99.preferredFoot).toEqual(Foot.LEFT);
  });

  // incorrect
  it('reads player skills', () => {
    expect(attrs64.playerSkills).toEqual([Skill.FIGHTING_SPIRIT]);
    expect(attrs99.playerSkills).toEqual([
      /* 0 */ Skill.SCISSORS_FEINT,
      /* 1 */ Skill.FLIP_FLAP,
      /* 2 */ Skill.MARSEILLE_TURN,
      /* 3 */ Skill.SOMBRERO,
      /* 4 */ Skill.CUT_BEHIND_TURN,
      /* 5 */ Skill.SCOTCH_MOVE,
      /* 6 */ Skill.HEADING,
      /* 7 */ Skill.LONG_RANGE_DRIVE,
      /* 8 */ Skill.KNUCKLE_SHOT,
      /* 27 */ Skill.FIGHTING_SPIRIT // incorrect? ?? need to check again
    ]);
  });

  // --- Player with all abilities set to 64
  it('reads player abilities (first player)', () => {
    expect(attrs64.abilities.attackingProwess).toEqual(64);
    expect(attrs64.abilities.ballControl).toEqual(64);
    expect(attrs64.abilities.dribbling).toEqual(64);
    expect(attrs64.abilities.lowPass).toEqual(64);
    expect(attrs64.abilities.loftedPass).toEqual(64);
    expect(attrs64.abilities.finishing).toEqual(64);
    expect(attrs64.abilities.placeKicking).toEqual(64);
    expect(attrs64.abilities.swerve).toEqual(64);
    expect(attrs64.abilities.header).toEqual(64);
    expect(attrs64.abilities.defensiveProwess).toEqual(64);
    expect(attrs64.abilities.ballWinning).toEqual(64);
    expect(attrs64.abilities.kickingPower).toEqual(64);
    expect(attrs64.abilities.speed).toEqual(64);
    expect(attrs64.abilities.explosivePower).toEqual(64);
    expect(attrs64.abilities.bodyControl).toEqual(64);
    expect(attrs64.abilities.physicalContact).toEqual(64);
    expect(attrs64.abilities.jump).toEqual(64);
    expect(attrs64.abilities.goalkeeping).toEqual(64);
    expect(attrs64.abilities.catching).toEqual(64);
    expect(attrs64.abilities.clearing).toEqual(64);
    expect(attrs64.abilities.reflexes).toEqual(64);
    expect(attrs64.abilities.coverage).toEqual(64);
    expect(attrs64.abilities.stamina).toEqual(64);
    expect(attrs64.abilities.form).toEqual(2);

    // motion all == 2
    expect(attrs64.motion.armDribbling).toEqual(2);
    expect(attrs64.motion.armRunning).toEqual(2);
    expect(attrs64.motion.cornerKick).toEqual(2);
    expect(attrs64.motion.freeKick).toEqual(2);
    expect(attrs64.motion.hunchingDribbling).toEqual(2);
    expect(attrs64.motion.hunchingRunning).toEqual(2);
    expect(attrs64.motion.penaltyKick).toEqual(2);

    // celebrations == 1
    expect(attrs64.motion.goalCelebration1).toEqual(1);
    expect(attrs64.motion.goalCelebration2).toEqual(1);
  });

  // --- Player with all abilities descending from 99
  it('reads player abilities (second player)', () => {
    expect(attrs99.abilities.attackingProwess).toEqual(99);
    expect(attrs99.abilities.ballControl).toEqual(98);
    expect(attrs99.abilities.dribbling).toEqual(97);
    expect(attrs99.abilities.lowPass).toEqual(96);
    expect(attrs99.abilities.loftedPass).toEqual(95);
    expect(attrs99.abilities.finishing).toEqual(94);
    expect(attrs99.abilities.placeKicking).toEqual(93);
    expect(attrs99.abilities.swerve).toEqual(92);
    expect(attrs99.abilities.header).toEqual(91);
    expect(attrs99.abilities.defensiveProwess).toEqual(90);
    expect(attrs99.abilities.ballWinning).toEqual(89);
    expect(attrs99.abilities.kickingPower).toEqual(88);
    expect(attrs99.abilities.speed).toEqual(87);
    expect(attrs99.abilities.explosivePower).toEqual(86);
    expect(attrs99.abilities.bodyControl).toEqual(85);
    expect(attrs99.abilities.physicalContact).toEqual(84);
    expect(attrs99.abilities.jump).toEqual(83);
    expect(attrs99.abilities.goalkeeping).toEqual(82);
    expect(attrs99.abilities.catching).toEqual(81);
    expect(attrs99.abilities.clearing).toEqual(80);
    expect(attrs99.abilities.reflexes).toEqual(79);
    expect(attrs99.abilities.coverage).toEqual(78);
    expect(attrs99.abilities.stamina).toEqual(77);

    // Various other bits:
    expect(attrs99.abilities.weakFootUsage).toEqual(2);
    expect(attrs99.motion.armRunning).toEqual(7);
    expect(attrs99.motion.cornerKick).toEqual(6);
    expect(attrs99.abilities.weakFootAccuracy).toEqual(2);
  });
}); // Player
