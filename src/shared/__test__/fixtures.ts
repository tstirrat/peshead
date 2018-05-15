import {
  ComPlayingStyle,
  Country,
  Foot,
  IPlayer,
  Playable,
  Player,
  PlayingStyle,
  Position,
  Skill,
} from '../service/api';

export const base: IPlayer = {
  id: '7511',
  commentaryId: '7511',
  name: 'L. MESSI',
  kitName: 'L. MESSI',
  age: 30,
  nationality: Country.ARGENTINA,
  registeredPosition: Position.RWF,
  ovr: 98,
  totalAbilities: 1656,
  cardStats: {
    DEF: 53,
    DRI: 95,
    PAS: 88,
    PHY: 70,
    SHT: 90,
    SPD: 86
  },
  preferredFoot: Foot.LEFT,
  isEdited: false,
  isBaseCopy: false,
  playingStyle: PlayingStyle.CREATIVE_PLAYMAKER,
  comPlayingStyles: [
    ComPlayingStyle.MAZING_RUN,
    ComPlayingStyle.SPEEDING_BULLET
  ],
  playerSkills: [Skill.LONG_RANGE_DRIVE],
  physique: {
    height: 170,
    weight: 72
  },
  playablePositions: { amf: Playable.A, ss: Playable.B },
  abilities: {
    attackingProwess: 95,
    ballControl: 96,
    ballWinning: 48,
    bodyControl: 95,
    catching: 40,
    clearing: 40,
    coverage: 40,
    defensiveProwess: 43,
    dribbling: 96,
    explosivePower: 92,
    finishing: 95,
    form: 7,
    goalkeeping: 40,
    header: 68,
    injuryResistance: 3,
    jump: 67,
    kickingPower: 80,
    loftedPass: 86,
    lowPass: 88,
    physicalContact: 66,
    placeKicking: 90,
    reflexes: 40,
    speed: 86,
    stamina: 76,
    swerve: 89,
    weakFootAccuracy: 3,
    weakFootUsage: 1
  },
  motion: {},
  appearance: {}
};

function makePlayer(attrs?: Partial<IPlayer>): Player {
  const merged = {
    ...base,
    ...attrs
  };
  return Player.create(merged); // ensures a copy
}

export const make = {
  player: makePlayer
};
