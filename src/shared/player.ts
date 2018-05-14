import { identity, pickBy } from 'lodash';

import { Player as PlayerBinary } from '../typesets/edit-file';
import { CardStatMap, IEdits, IPlayablePositions, Player as PlayerProto } from './service/api';
import { getCardStats, getPositionWeights, getTotalStats, getWeightedRating } from './utils/player';

/** Map a jBinary parsed player to DB/API schema (proto3 JSON) */
export class Player extends PlayerProto {
  static fromBinary(input: PlayerBinary) {
    const {
      attackingProwess,
      defensiveProwess,
      dribbling,
      goalkeeping
    } = input.block1;

    const { finishing, form, header, loftedPass, lowPass } = input.block2;

    const {
      catching,
      clearing,
      injuryResistance,
      reflexes,
      swerve
    } = input.block3;

    const {
      bodyControl,
      explosivePower,
      kickingPower,
      physicalContact
    } = input.block4;

    const {
      age,
      ballControl,
      ballWinning,
      playingStyle,
      registeredPosition,
      weakFootAccuracy
    } = input.block5;

    const {
      coverage,
      jump,
      weakFootUsage,
      playableCF,
      playableSS,
      playableLWF,
      motionDribblingArms,
      motionRunningArms,
      motionCornerKick
    } = input.block6;

    const {
      placeKicking,
      playableAMF,
      playableCMF,
      playableDMF,
      playableLMF,
      playableRMF,
      playableCB,
      playableLB,
      playableRB,
      playableGK,
      motionDribblingHunching,
      motionRunningHunching,
      motionPenaltyKick,
      isAbilitiesEdited
    } = input.block7;
    const { speed, stamina, playableRWF } = input.block8;
    const {
      isBaseCopy,
      isComPlayingStylesEdited,
      isMotionEdited,
      isPlayerSkillsEdited,
      isPlayingStyleEdited,
      preferredFoot
    } = input.block9;

    const comPlayingStyles = Player.bitMaskToArray(
      input.block10.comPlayingStyles
    );

    // console.log(
    //   'mask',
    //   input.block11.skills.toString(2),
    //   input.block10.skill1.toString(2)
    // );

    // tslint:disable-next-line:no-bitwise
    const skillsMask = (input.block11.skills << 1) + input.block10.skill1;

    // console.log('joined mask', skillsMask.toString(2));
    const playerSkills = Player.bitMaskToArray(skillsMask);

    const positionMap: IPlayablePositions = {
      cf: playableCF,
      ss: playableSS,
      lwf: playableLWF,
      rwf: playableRWF,
      amf: playableAMF,
      cmf: playableCMF,
      dmf: playableDMF,
      lmf: playableLMF,
      rmf: playableRMF,
      cb: playableCB,
      lb: playableLB,
      rb: playableRB,
      gk: playableGK
    };

    // remove undefined etc
    const positions = pickBy(positionMap, identity);

    const player = new Player({
      id: '' + input.id,
      commentaryId: '' + input.commentaryId,
      nationality: input.nationality,
      name: input.name,
      kitName: input.printName,
      age: age,
      preferredFoot,
      registeredPosition: registeredPosition,
      playablePositions: positions,
      physique: {
        height: input.height,
        weight: input.weight
      },
      appearance: {},
      playingStyle,
      comPlayingStyles,
      playerSkills,
      abilities: {
        attackingProwess,
        ballControl,
        ballWinning,
        bodyControl,
        catching,
        clearing,
        coverage,
        defensiveProwess,
        dribbling,
        explosivePower,
        finishing,
        form: form + 1,
        goalkeeping,
        header,
        injuryResistance: injuryResistance + 1,
        jump,
        kickingPower,
        loftedPass,
        lowPass,
        physicalContact,
        placeKicking,
        reflexes,
        speed,
        stamina,
        swerve,
        weakFootAccuracy: weakFootAccuracy + 1,
        weakFootUsage: weakFootAccuracy + 1
      },
      isEdited: Boolean(input.block2.isCreated),
      isBaseCopy: Boolean(isBaseCopy),
      motion: {
        armDribbling: motionDribblingArms + 1,
        armRunning: motionRunningArms + 1,
        cornerKick: motionCornerKick + 1,
        freeKick: input.block1.motionFreeKick + 1,
        goalCelebration1: input.motionGoalCelebration1,
        goalCelebration2: input.motionGoalCelebration2,
        hunchingDribbling: motionDribblingHunching + 1,
        hunchingRunning: motionRunningHunching + 1,
        penaltyKick: motionPenaltyKick + 1
      },
      // calculated below
      ovr: 0,
      totalAbilities: 0,
      cardStats: {} as CardStatMap
    });

    // leaving this out for now, not used in the DB
    const edited: IEdits = {
      playablePositions: Boolean(input.block6.isPlayablePositionsEdited),
      registeredPosition: Boolean(input.block4.isRegisteredPositionEdited),
      abilities: Boolean(isAbilitiesEdited),
      basics: Boolean(input.block3.isBasicsEdited),
      comPlayingStyles: Boolean(isComPlayingStylesEdited),
      motion: Boolean(isMotionEdited),
      playerSkills: Boolean(isPlayerSkillsEdited),
      playingStyle: Boolean(isPlayingStyleEdited)
    };

    const overallRating = getWeightedRating(
      player,
      getPositionWeights(player.registeredPosition)
    );
    player.ovr = overallRating;
    player.totalAbilities = getTotalStats(player);
    player.cardStats = getCardStats(player);
    return player;
  }

  static bitMaskToArray(mask: number): number[] {
    let i = 0;
    const arr: number[] = [];
    while (i <= 28) {
      const m = Math.pow(2, i);
      // tslint:disable-next-line:no-bitwise
      if (mask & m) {
        arr.push(i);
      }
      i++;
    }
    return arr;
  }
}
