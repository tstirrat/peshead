export interface EditData {
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
