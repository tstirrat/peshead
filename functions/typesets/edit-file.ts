import {ZeroPaddedArray} from './zero-padded-array';

// const TEAM_PLAYER_COUNT = 650;
// const STADIUM_COUNT = 40;
export const HEADER_SIZE_BYTES = 67305;
export const PLAYER_SIZE_BYTES = 188;
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
      (data: EditFile) => data.header.playerCount
    ],
    teams: [
      ZeroPaddedArray, 'Team', TEAM_COUNT_MAX,
      (data: EditFile) => data.header.teamCount
    ],
    managers: [
      ZeroPaddedArray, 'Manager', MANAGER_COUNT_MAX,
      (data: EditFile) => data.header.managerCount
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

  // Total size = 188 bytes
  Player: {
    id: 'uint32',
    commentaryId: 'uint32',
    unknown01: 'uint16',
    nationality: 'uint16',
    height: 'uint8',
    weight: 'uint8',
    motionGoalCelebration1: 'uint8',
    motionGoalCelebration2: 'uint8',
    // ^ 16 bytes
    // section = 248 bits = 31 bytes
    abilities: {
      hasComPlayingStyleMods: 'Bool',  // guess
      attackingProwess: 'Attribute7',
      weakFootAccuracy: 'Bit2',  // guess
      defensiveProwess: 'Attribute7',
      unknown02: 'uint16',
      finishing: 'Attribute7',
      unknown03: ['bitfield', 24],
      preferredFoot: 'Bool',  // guess
      // ^ 64 bits = 8 bytes

      swerve: 'Attribute7',
      injuryResistance: 'Bit2',
      catching: 'Attribute7',
      unknown10: 'uint16',
      // ^ +32 bits = 12 bytes

      bodyControl: 'Attribute7',
      isEdited: 'Bool',  // guess
      hasPlayerSkillMods: 'Bool',
      strength: 'Attribute7',
      unknown12: 'uint32',
      // ^ +48 bits = 18 bytes

      ballControl: 'Attribute7',
      hasBasicSettingMods: 'Bool',  // guess
      hasAbilityMods: 'Bool',       // guess
      ballWinning: 'Attribute7',
      // ^ +16 bits = 20 bytes

      jump: 'Attribute7',
      unknown22: ['bitfield', 9],
      // ^ +16 bits = 22 bytes

      skip: ['skip', 8],
      // // to be assigned
      // age: 'Age6',  // guess
      // coverage: 'Attribute7',
      // unknown25: 'uint32',

      // placeKicking: 'Attribute7',
      // stamina: 'Attribute7',
      // speed: 'Attribute7',
      // unknown23: 'Age6',
      // form: 'Motion3',         // guess
      // hasRegisteredPositionMod: 'Bool',  // guess
      // motionFreeKick: ['bitfield', 4],
      // lowPass: 'Attribute7',
      // loftedPass: 'Attribute7',
      // header: 'Attribute7',
      // clearing: 'Attribute7',
      // reflexes: 'Attribute7',
      // dribbling: 'Attribute7',
      // physicalContact: 'Attribute7',
      // kickingPower: 'Attribute7',
      // explosivePower: 'Attribute7',
      // motionArmMovementDribbling: 'Motion3',
      // registeredPosition: 'Position4',
      // playingStyles: ['bitfield', 5],
      // motionArmMovementRunning: 'Motion3',
      // motionCornerKick: 'Motion3',
      // weakFootUsage: 'Bit2',
      // playablePosition: ['array', 'Bit2', 13],
      // motionHunchingDribbling: 'Bit2',
      // motionHunchingRunning: 'Bit2',
      // motionPenaltyKick: 'Bit2',
      // isPlayablePositionChanged: 'Bool',
      // hasPlayingStyleMods: 'Bool',
      // hasMotionMods: 'Bool',
    },

    isBaseCopy: 'Bool',              // guess
    comPlayingStyles: 'Attribute7',  //
    unknown06: ['bitfield', 4],      //
    playerSkills: ['bitfield', 28],  // = 5 bytes

    name: ['string0', 46],
    printName: ['string0', 18],
    appearance: 'PlayerAppearance',  // = 72 bytes
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
    stadium_net_id: ['bitfield', 4],
    color2: 'Color24',
    color1b: ['bitfield', 6],
    stadium: {
      isStadiumNetEnabled: 'Bool',
      bits1: ['bitfield', 3],
      stadiumGoalType: ['bitfield', 2],
      bits2: ['bitfield', 2],
      stadiumTurfPattern: ['bitfield', 4],
      stadiumSidelineColor: ['bitfield', 4],
      stadiumSeatColor: ['bitfield', 4],
    },
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
    skip: ['skip', 69],
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



export interface EditFile {
  header: Header;
  players: Player[];
  teams: Team[];
  managers: Manager[];
  competitions?: Competition[];
  stadiums?: Stadium[];
  teamRosters?: TeamRoster[];
}

export interface Header {
  playerCount: number;
  teamCount: number;
  managerCount: number;
  competitionCount: number;
  stadiumCount: number;
  teamPlayerCount: number;
  gamePlanCount: number;
}

export interface Player {
  id: number;
  commentaryId: number;
  unknown01: number;
  nationality: number;
  height: number;
  weight: number;
  motionGoalCelebration1: number;
  motionGoalCelebration2: number;
  abilities: {
    hasComPlayingStyleMods: boolean; attackingProwess: number;
    weakFootAccuracy: number;
    defensiveProwess: number;
    unknown02: number;
    finishing: number;
    unknown03: number;
    preferredFoot: boolean;

    swerve: number;
    injuryResistance: number;
    catching: number;
    unknown10: number;

    bodyControl: number;
    isEdited: boolean;
    strength: number;
    unknown12: number;
    ballControl: number;
    unknown04: boolean;
    ballWinning: number;
    jump: number;
    unknown22: number;
  };
  isBaseCopy: boolean;
  comPlayingStyles: number;
  unknown06: number;
  playerSkills: number;
  name: string;
  printName: string;
  appearance: PlayerAppearance;
}

export interface PlayerAppearance {
  playerId: number;
  // TODO: complete this
}

export interface Team {
  id: string;
  manager_id: string;
  emblem_id: string;
  stadium_id: string;
  word1: string;
  nationality_id: string;
  callname_id: string;
  color1r: number;
  color1g: number;
  stadium_net_id: number;
  color2: Color24;
  color1b: number;
  stadium: {
    isStadiumNetEnabled: boolean; bits1: number; stadiumGoalType: number;
    bits2: number;
    stadiumTurfPattern: number;
    stadiumSidelineColor: number;
    stadiumSeatColor: number;
  };
  isNameEdited: boolean;
  isStadiumEdited: boolean;
  '<bool1>': boolean;
  isStadiumNameEdited: boolean;
  '<bool2>': boolean;
  isStadiumConfigEdited: boolean;
  isRivalEdited: boolean;
  isBannerEdited: boolean;
  '<bool3>': boolean;
  isStripEdited: boolean;
  isManagerEdited: boolean;
  '<bool4>': boolean;
  '<byte1 strip count?>': number;
  strips: number[];
  rivals: number[];
  bannerEnabled: number[];
  name: string;
  scoreboard: string;
  stadiumText: string;
  banners: string[];
}

export interface TeamRoster {
  teamId: string;
  assignments: number[];
  shirtNumbers: number[];
}

export interface Stadium {
  id: string;
  name: string;
}

export interface Manager {
  id: number;
  nationality: number;
  pictureId: number;
  unknown01: string;
  name: string;
}

export interface Competition {
  id: number;
  // TODO: complete this
}

export interface Color24 {
  r: number;
  g: number;
  b: number;
}
