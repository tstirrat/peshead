import {ComPlayingStyle, Country, Foot, IPlayer, Player, PlayingStyle, Position, Skill} from '../shared/service/api';

export const base: IPlayer = {
  id: '7511',
  commentaryId: '7511',
  name: 'L. MESSI',
  kitName: 'L. MESSI',
  age: 30,
  nationality: Country.ARGENTINA,
  registeredPosition: Position.RIGHT_WING_FORWARD,
  preferredFoot: Foot.LEFT,
  isEdited: false,
  isBaseCopy: false,
  playingStyles: [
    PlayingStyle.CREATIVE_PLAYMAKER,
  ],
  comPlayingStyles: [
    ComPlayingStyle.MAZING_RUN,
    ComPlayingStyle.SPEEDING_BULLET,
  ],
  playerSkills: [Skill.LONG_RANGE_DRIVE],
  physique: {
    height: 170,
    weight: 72,
  },
  playablePositions: [
    Position.ATTACKING_MIDFIELDER,
    Position.SECOND_STRIKER,
    Position.CENTRE_FORWARD,
  ],
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
    weakFootUsage: 1,
  }
};

function makePlayer(attrs: Partial<IPlayer>): Player {
  const merged = {
    ...base,
    ...attrs,
  };
  return Player.create(merged);  // ensures a copy
}

export const make = {
  player: makePlayer,
};
