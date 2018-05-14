import { Definition, PackedBits } from './packed-bits';
import { ZeroPaddedArray } from './zero-padded-array';

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

  // Types
  Attribute7: ['bitfield', 7], // Attr between 40 and 99
  Motion3: ['bitfield', 3],
  Bit2: ['bitfield', 2],
  Age6: ['bitfield', 6],
  Position4: ['bitfield', 4],
  Bool: ['bitfield', 1],
  Color24: {
    r: ['bitfield', 6],
    g: ['bitfield', 6],
    b: ['bitfield', 6]
  },

  File: {
    header: 'Header',
    players: [
      ZeroPaddedArray,
      'Player',
      PLAYER_COUNT_MAX,
      (data: EditFile) => data.header.playerCount
    ],
    teams: [
      ZeroPaddedArray,
      'Team',
      TEAM_COUNT_MAX,
      (data: EditFile) => data.header.teamCount
    ],
    managers: [
      ZeroPaddedArray,
      'Manager',
      MANAGER_COUNT_MAX,
      (data: EditFile) => data.header.managerCount
    ]
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
    unknown1: ['skip', 2], // more unknowns
    unknown2: ['skip', 2], // more unknowns
    teamPlayerCount: 'uint16',
    unknown3: ['skip', 2], // more unknowns
    gamePlanCount: 'uint16',
    post: ['skip', HEADER_SIZE_BYTES - HEADER_KNOWN_OFFSET - HEADER_KNOWN_BYTES] // more unknowns
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
    // = 16 bytes

    // 4 bytes
    block1: [
      PackedBits,
      'uint32',
      [
        { key: 'attackingProwess', bits: 7 },
        { key: 'defensiveProwess', bits: 7 },
        { key: 'goalkeeping', bits: 7 },
        { key: 'dribbling', bits: 7 },
        { key: 'motionFreeKick', bits: 4 }
      ] as Definition[]
    ],

    // 4 bytes
    block2: [
      PackedBits,
      'uint32',
      [
        { key: 'finishing', bits: 7 },
        { key: 'lowPass', bits: 7 },
        { key: 'loftedPass', bits: 7 },
        { key: 'header', bits: 7 },
        { key: 'form', bits: 3 },
        { key: 'isCreated', bits: 1 }
      ] as Definition[]
    ],

    // 4 bytes
    block3: [
      PackedBits,
      'uint32',
      [
        { key: 'swerve', bits: 7 },
        { key: 'catching', bits: 7 },
        { key: 'clearing', bits: 7 },
        { key: 'reflexes', bits: 7 },
        { key: 'injuryResistance', bits: 2 },
        { key: 'unknown', bits: 1 },
        { key: 'isBasicsEdited', bits: 1 }
      ] as Definition[]
    ],

    // 4 bytes
    block4: [
      PackedBits,
      'uint32',
      [
        { key: 'bodyControl', bits: 7 },
        { key: 'physicalContact', bits: 7 },
        { key: 'kickingPower', bits: 7 },
        { key: 'explosivePower', bits: 7 },
        { key: 'motionUnknown', bits: 3 },
        { key: 'isRegisteredPositionEdited', bits: 1 }
      ] as Definition[]
    ],

    // 4 bytes
    block5: [
      PackedBits,
      'uint32',
      [
        { key: 'age', bits: 6 },
        { key: 'registeredPosition', bits: 4 },
        { key: 'unknownC', bits: 1 },
        { key: 'playingStyle', bits: 5 },
        { key: 'ballControl', bits: 7 },
        { key: 'ballWinning', bits: 7 },
        { key: 'weakFootAccuracy', bits: 2 }
      ] as Definition[]
    ],

    // 4 bytes
    block6: [
      PackedBits,
      'uint32',
      [
        { key: 'jump', bits: 7 },
        { key: 'motionDribblingArms', bits: 3 },
        { key: 'motionRunningArms', bits: 3 },
        { key: 'motionCornerKick', bits: 3 },
        { key: 'coverage', bits: 7 },
        { key: 'weakFootUsage', bits: 2 },
        { key: 'playableCF', bits: 2 },
        { key: 'playableSS', bits: 2 },
        { key: 'playableLWF', bits: 2 },
        { key: 'isPlayablePositionsEdited', bits: 1 }
      ] as Definition[]
    ],

    // 4 bytes
    block7: [
      PackedBits,
      'uint32',
      [
        { key: 'playableAMF', bits: 2 },
        { key: 'playableDMF', bits: 2 },
        { key: 'playableCMF', bits: 2 },
        { key: 'playableLMF', bits: 2 },
        { key: 'playableRMF', bits: 2 },
        { key: 'playableCB', bits: 2 },
        { key: 'playableLB', bits: 2 },
        { key: 'playableRB', bits: 2 },
        { key: 'playableGK', bits: 2 },
        { key: 'motionDribblingHunching', bits: 2 },
        { key: 'motionRunningHunching', bits: 2 },
        { key: 'motionPenaltyKick', bits: 2 },
        { key: 'placeKicking', bits: 7 },
        { key: 'isAbilitiesEdited', bits: 1 }
      ] as Definition[]
    ],

    // 2 bytes
    block8: [
      PackedBits,
      'uint16',
      [
        { key: 'stamina', bits: 7 },
        { key: 'playableRWF', bits: 2 },
        { key: 'speed', bits: 7 }
      ] as Definition[]
    ],
    // 1 byte
    block9: [
      PackedBits,
      'uint8',
      [
        { key: 'isPlayerSkillsEdited', bits: 1 },
        { key: 'isPlayingStyleEdited', bits: 1 },
        { key: 'isComPlayingStylesEdited', bits: 1 },
        { key: 'isMotionEdited', bits: 1 },
        { key: 'isBaseCopy', bits: 1 },
        { key: 'unknownD', bits: 1 },
        { key: 'preferredFoot', bits: 1 },
        { key: 'unknownE', bits: 1 }
      ] as Definition[]
    ],
    // 1 byte
    block10: [
      PackedBits,
      'uint8',
      [
        { key: 'comPlayingStyles', bits: 7 },
        { key: 'skill1', bits: 1 }
      ] as Definition[]
    ],
    // 4 byte
    block11: [
      PackedBits,
      'uint32',
      [
        { key: 'skills', bits: 27 },
        { key: 'unknownF', bits: 5 }
      ] as Definition[]
    ],

    name: ['string0', 46, 'utf-8'],
    printName: ['string0', 18, 'utf-8'],
    appearance: 'PlayerAppearance' // = 72 bytes
  },

  PlayerAppearance: {
    playerId: 'uint32',
    skip: ['skip', APPEARANCE_SIZE_BYTES - 4]
  },

  Manager: {
    id: 'uint32',
    nationality: 'uint16',
    pictureId: 'uint16',
    unknown01: 'byte',
    name: ['string0', 79, 'utf-8']
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
      stadiumSeatColor: ['bitfield', 4]
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
    name: ['string0', 70, 'utf-8'],
    scoreboard: ['string0', 4, 'utf-8'],
    stadiumText: ['string0', 121, 'utf-8'],
    banners: ['array', ['string0', 16, 'utf-8'], 4],
    skip: ['skip', 69]
  },

  Stadium: {
    id: 'uint32',
    name: ['string0', 124, 'utf-8']
  },

  Competition: ['skip', 124],

  TeamRoster: {
    teamId: 'uint8',
    assignments: ['array', 'uint32', 32],
    shirtNumbers: ['array', 'uint8', 32]
  }
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
  block1: {
    attackingProwess: number;
    defensiveProwess: number;
    goalkeeping: number;
    dribbling: number;
    motionFreeKick: number;
  };
  block2: {
    finishing: number;
    loftedPass: number;
    lowPass: number;
    header: number;
    form: number;
    isCreated: number;
  };
  block3: {
    swerve: number;
    catching: number;
    clearing: number;
    reflexes: number;
    injuryResistance: number;
    unknown: number;
    isBasicsEdited: number;
  };
  block4: {
    bodyControl: number;
    physicalContact: number;
    kickingPower: number;
    explosivePower: number;
    motionUnknown: number;
    isRegisteredPositionEdited: number;
  };
  block5: {
    age: number;
    registeredPosition: number;
    unknownC: number;
    playingStyle: number;
    ballControl: number;
    ballWinning: number;
    weakFootAccuracy: number;
  };
  block6: {
    jump: number;
    motionDribblingArms: number;
    motionRunningArms: number;
    motionCornerKick: number;
    coverage: number;
    weakFootUsage: number;
    playableCF: number;
    playableSS: number;
    playableLWF: number;
    isPlayablePositionsEdited: number;
  };

  block7: {
    playableAMF: number;
    playableCMF: number;
    playableDMF: number;
    playableLMF: number;
    playableRMF: number;
    playableCB: number;
    playableLB: number;
    playableRB: number;
    playableGK: number;
    motionDribblingHunching: number;
    motionRunningHunching: number;
    motionPenaltyKick: number;
    placeKicking: number;
    isAbilitiesEdited: number;
  };

  block8: {
    stamina: number;
    playableRWF: number;
    speed: number;
  };

  block9: {
    isPlayerSkillsEdited: number;
    isPlayingStyleEdited: number;
    isComPlayingStylesEdited: number;
    isMotionEdited: number;
    isBaseCopy: number;
    unknownD: number;
    preferredFoot: number;
    unknownE: number;
  };

  block10: {
    comPlayingStyles: number;
    skill1: number;
    unknown3: number;
  };

  block11: {
    skills: number;
    unknownF: number;
  };

  name: string;
  printName: string;
  appearance: PlayerAppearance;
}

export interface PlayerAppearance {
  playerId: number;
  // TODO: complete this
}

export interface Team {
  id: number;
  manager_id: number;
  emblem_id: number;
  stadium_id: number;
  word1: string;
  nationality_id: number;
  callname_id: number;
  color1r: number;
  color1g: number;
  stadium_net_id: number;
  color2: Color24;
  color1b: number;
  stadium: {
    isStadiumNetEnabled: boolean;
    bits1: number;
    stadiumGoalType: number;
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
