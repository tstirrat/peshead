import {ZeroPaddedArray} from './zero-padded-array';

// const TEAM_PLAYER_COUNT = 650;
// const STADIUM_COUNT = 40;
const HEADER_SIZE_BYTES = 67305;
const HEADER_KNOWN_OFFSET = 67277;
const HEADER_KNOWN_BYTES = 22;
const APPEARANCE_SIZE_BYTES = 72;
// const TEAM_SIZE_BYTES = 480;
const PLAYER_COUNT_MAX = 21000;
const TEAM_COUNT_MAX = 600;
const MANAGER_COUNT_MAX = 850;

export const EditFile = {
  'jBinary.all': 'File',
  'jBinary.littleEndian': true,
  // 'jBinary.mimeType': 'image/bmp',

  // Types
  Attribute7: ['bitfield', 7],  // Attr between 40 and 99
  Motion3: ['bitfield', 3],
  Bit2: ['bitfield', 2],
  Age6: ['bitfield', 6],
  Position4: ['bitfield', 4],
  Bool: ['bitfield', 1],
  Color24: {
    r: ['bitfield', 6],
    g: ['bitfield', 6],
    b: ['bitfield', 6],
  },

  File: {
    header: 'Header',
    players: [
      ZeroPaddedArray, 'Player', PLAYER_COUNT_MAX,
      (data: any) => data.header.playerCount
    ],
    teams: [
      ZeroPaddedArray, 'Team', TEAM_COUNT_MAX,
      (data: any) => data.header.teamCount
    ],
    managers: [
      ZeroPaddedArray, 'Manager', MANAGER_COUNT_MAX,
      (data: any) => data.header.managerCount
    ],
    // competitions: [ZeroPaddedArray, 'blob', 50],
    // stadiums: [ZeroPaddedArray, 'Stadium', STADIUM_COUNT],
    // unknown: ['skip', 0x475A90 - 0x425180],  // 132 bytes
    // teamRosters: [ZeroPaddedArray, 'TeamRoster', TEAM_PLAYER_COUNT],
  },

  Header: {
    pre: ['skip', HEADER_KNOWN_OFFSET],
    playerCount: 'uint16',
    unknown: ['skip', 2],
    teamCount: 'uint16',
    managerCount: 'uint16',
    competitionCount: 'uint16',
    stadiumCount: 'uint16',
    unknown1: ['skip', 2],  // more unknowns
    unknown2: ['skip', 2],  // more unknowns
    teamPlayerCount: 'uint16',
    unknown3: ['skip', 2],  // more unknowns
    gamePlanCount: 'uint16',
    post: [
      'skip', HEADER_SIZE_BYTES - HEADER_KNOWN_OFFSET - HEADER_KNOWN_BYTES
    ],  // more unknowns

  },

  Player: {
    id: 'uint32',
    commentaryId: 'uint32',
    unknown01: 'uint16',
    nationality: 'uint16',
    height: 'uint8',
    weight: 'uint8',
    motionGoalCelebration1: 'uint8',
    motionGoalCelebration2: 'uint8',
    attackingProwess: 'Attribute7',
    defensiveProwess: 'Attribute7',
    goalkeeping: 'Attribute7',
    dribbling: 'Attribute7',
    motionFreeKick: ['bitfield', 4],
    finishing: 'Attribute7',
    lowPass: 'Attribute7',
    loftedPass: 'Attribute7',
    header: 'Attribute7',
    form: 'Motion3',
    isEdited: 'Bool',
    swerve: 'Attribute7',
    catching: 'Attribute7',
    clearing: 'Attribute7',
    reflexes: 'Attribute7',
    injuryResistance: 'Bit2',
    unknown02: 'Bool',
    hasBasicSettingMods: 'Bool',
    bodyControl: 'Attribute7',
    physicalContact: 'Attribute7',
    kickingPower: 'Attribute7',
    explosivePower: 'Attribute7',
    motionArmMovementDribbling: 'Motion3',
    hasRegisteredPositionMod: 'Bool',
    age: 'Age6',
    registeredPosition: 'Position4',
    unknown03: 'Bool',
    playingStyles: ['bitfield', 5],
    ballControl: 'Attribute7',
    ballWinning: 'Attribute7',
    weakFootAccuracy: 'Bit2',
    jump: 'Attribute7',
    motionArmMovementRunning: 'Motion3',
    motionCornerKick: 'Motion3',
    coverage: 'Attribute7',
    weakFootUsage: 'Bit2',
    playablePosition: ['array', 'Bit2', 13],
    motionHunchingDribbling: 'Bit2',
    motionHunchingRunning: 'Bit2',
    motionPenaltyKick: 'Bit2',
    placeKicking: 'Attribute7',
    isPlayablePositionChanged: 'Bool',
    hasAbilityMods: 'Bool',
    hasPlayerSkillMods: 'Bool',
    stamina: 'Attribute7',
    speed: 'Attribute7',
    hasPlayingStyleMods: 'Bool',
    hasComPlayingStyleMods: 'Bool',
    hasMotionMods: 'Bool',
    isBaseCopy: 'Bool',
    unknown04: 'Bool',
    preferredFoot: 'Bool',
    unknown05: 'Bool',
    comPlayingStyles: 'Attribute7',
    playerSkills: ['bitfield', 28],
    unknown06: 'uint8',
    name: ['string0', 46],
    printName: ['string0', 18],
    appearance: 'PlayerAppearance',
  },

  PlayerAppearance: {
    playerId: 'uint32',
    skip: ['skip', APPEARANCE_SIZE_BYTES - 4],
  },

  Manager: {
    id: 'uint32',
    nationality: 'uint16',
    pictureId: 'uint16',
    unknown01: 'byte',
    name: ['string0', 79],
  },

  Team: {
    id: 'uint32',
    manager_id: 'uint32',
    emblem_id: 'uint16',
    stadium_id: 'uint16',
    word1: 'uint16',
    nationality_id: 'uint16',
    callname_id: 'uint16',
    color1r: ['bitfield', 6],
    color1g: ['bitfield', 6],
    stadium_net_id: 'uint8',
    color2: 'Color24',
    color1b: ['bitfield', 6],
    isStadiumNetEnabled: 'Bool',
    bits1: ['bitfield', 3],
    stadiumGoalType: ['bitfield', 2],
    bits2: ['bitfield', 2],
    stadiumTurfPattern: ['bitfield', 4],
    stadiumSidelineColor: ['bitfield', 4],
    stadiumSeatColor: ['bitfield', 4],
    isNameEdited: 'Bool',
    isStadiumEdited: 'Bool',
    '<bool1>': 'Bool',
    isStadiumNameEdited: 'Bool',
    '<bool2>': 'Bool',
    isStadiumConfigEdited: 'Bool',
    isRivalEdited: 'Bool',
    isBannerEdited: 'Bool',
    '<bool3>': 'Bool',
    isStripEdited: 'Bool',
    isManagerEdited: 'Bool',
    '<bool4>': 'Bool',
    '<byte1 strip count?>': 'uint8',
    strips: ['array', 'uint32', 10],
    rivals: ['array', 'uint32', 3],
    '<bytes>': ['skip', 68],
    bannerEnabled: ['array', 'uint8', 4],
    name: ['string0', 70],
    scoreboard: ['string0', 4],
    stadiumText: ['string0', 121],
    banners: ['array', ['string0', 16], 4],
  },

  Stadium: {
    id: 'uint32',
    name: ['string0', 124],
  },

  Competition: ['skip', 124],

  TeamRoster: {
    teamId: 'uint8',
    assignments: ['array', 'uint32', 32],
    shirtNumbers: ['array', 'uint8', 32],
  },
};
