import { IPlayerAbilities, Player, PlayingStyle, Position } from '../service/api';

export type PlayerAbilityName = keyof IPlayerAbilities;

/** Boolean flags for each property. */
export type Flags<T> = { [P in keyof T]?: boolean };

export type AbilityFlags = Flags<IPlayerAbilities>;

/**
 * Player form
 *
 * _These are numeric and 1 based to be compatible with `input[type=range]`_
 */
export enum PlayerForm {
  A = 5,
  B = 4,
  C = 3,
  D = 2,
  E = 1
}

/** Human readable form for the UI. */
export const PlayerFormValue = {
  [PlayerForm.A]: 'A',
  [PlayerForm.B]: 'B',
  [PlayerForm.C]: 'C',
  [PlayerForm.D]: 'D',
  [PlayerForm.E]: 'E'
};

// TODO: i18n
/** Position names */
export const PositionLabel = {
  [Position.AMF]: 'AMF',
  [Position.CB]: 'CB',
  [Position.CF]: 'CF',
  [Position.CMF]: 'CMF',
  [Position.DMF]: 'DMF',
  [Position.GK]: 'GK',
  [Position.LB]: 'LB',
  [Position.LMF]: 'LMF',
  [Position.LWF]: 'LWF',
  [Position.RB]: 'RB',
  [Position.RMF]: 'RMF',
  [Position.RWF]: 'RWF',
  [Position.SS]: 'SS'
};

/** Playing styles names */
export const PlayingStyleLabel = {
  [PlayingStyle.ANCHOR_MAN]: 'Anchor Man',
  [PlayingStyle.BOX_TO_BOX]: 'Box to Box',
  [PlayingStyle.BUILD_UP]: 'Build Up',
  [PlayingStyle.CLASSIC_NO_10]: 'Classic No. 10',
  [PlayingStyle.CREATIVE_PLAYMAKER]: 'Creative Playmaker',
  [PlayingStyle.DEFENSIVE_FULLBACK]: 'Defensive Fullback',
  [PlayingStyle.DEFENSIVE_GOALKEEPER]: 'Defensive Goalkeeper',
  [PlayingStyle.DUMMY_RUNNER]: 'Dummy Runner',
  [PlayingStyle.EXTRA_FRONTMAN]: 'Extra Frontman',
  [PlayingStyle.FOX_IN_THE_BOX]: 'Fox in the Box',
  [PlayingStyle.GOAL_POACHER]: 'Goal Poacher',
  [PlayingStyle.HOLE_PLAYER]: 'Hole Player',
  [PlayingStyle.N_A]: '-',
  [PlayingStyle.OFFENSIVE_FULLBACK]: 'Offensive Fullback',
  [PlayingStyle.OFFENSIVE_GOALKEEPER]: 'Offensive Goalkeeper',
  [PlayingStyle.PROLIFIC_WINGER]: 'Prolific Winger',
  [PlayingStyle.TARGET_MAN]: 'Target Man',
  [PlayingStyle.THE_DESTROYER]: 'The Destroyer'
};

export const DEFAULT_PLAYER_FORM = PlayerForm.C;
export const DEFAULT_PLAYER_LEVEL = 30;

export const ABILITY_PROPS: PlayerAbilityName[] = [
  'attackingProwess',
  'ballControl',
  'ballWinning',
  'bodyControl',
  'catching',
  'clearing',
  'coverage',
  'defensiveProwess',
  'dribbling',
  'explosivePower',
  'finishing',
  'goalkeeping',
  'header',
  'injuryResistance',
  'jump',
  'kickingPower',
  'loftedPass',
  'lowPass',
  'physicalContact',
  'placeKicking',
  'reflexes',
  'speed',
  'stamina',
  'swerve',
  'weakFootAccuracy',
  'weakFootUsage',
  'form'
];

/** Stats which have min of 40 and max value of 99 */
export const SIMPLE_ABILITIES: PlayerAbilityName[] = [
  'attackingProwess',
  'ballControl',
  'dribbling',
  'lowPass',
  'loftedPass',
  'finishing',
  'placeKicking',
  'swerve',
  'header',
  'defensiveProwess',
  'ballWinning',
  'kickingPower',
  'speed',
  'explosivePower',
  'bodyControl',
  'physicalContact',
  'jump',
  'goalkeeping',
  'catching',
  'clearing',
  'reflexes',
  'coverage',
  'stamina'
];

export function getTotalStats(player: Player) {
  return SIMPLE_ABILITIES.reduce<number>(
    // alignment
    (total, key) => {
      return total + (player.abilities[key] || 0);
    },
    0
  );
}

/**
 * Map of changed abilities at each level.
 *
 * Source: http://bit.ly/2tQjHlW#gid=949383748
 */
const LEVEL_CHANGES: PlayerAbilityName[][] = [
  [], // level 0
  [], // level 1
  ['attackingProwess', 'ballWinning', 'speed'],
  ['ballControl', 'defensiveProwess', 'kickingPower'],
  ['dribbling', 'placeKicking', 'bodyControl'],
  ['lowPass', 'finishing', 'jump'],
  ['loftedPass', 'bodyControl', 'stamina'],
  ['attackingProwess', 'ballWinning', 'speed'],
  ['ballControl', 'defensiveProwess', 'kickingPower'],
  ['dribbling', 'placeKicking', 'bodyControl'],
  ['lowPass', 'finishing', 'jump'],
  ['loftedPass', 'bodyControl', 'stamina'],
  ['swerve', 'header', 'explosivePower'],
  ['ballControl', 'defensiveProwess', 'kickingPower'],
  ['loftedPass', 'bodyControl', 'stamina'],
  ['attackingProwess', 'ballWinning', 'speed'],
  ['dribbling', 'placeKicking', 'bodyControl'],
  ['swerve', 'header', 'explosivePower'],
  ['lowPass', 'finishing', 'jump'],
  ['dribbling', 'placeKicking', 'bodyControl'],
  ['attackingProwess', 'ballWinning', 'speed'],
  ['lowPass', 'finishing', 'jump'],
  ['loftedPass', 'bodyControl', 'stamina'],
  ['ballControl', 'defensiveProwess', 'kickingPower'],
  ['swerve', 'header', 'explosivePower'],
  ['lowPass', 'finishing', 'jump'],
  ['ballControl', 'defensiveProwess', 'kickingPower'],
  ['loftedPass', 'bodyControl', 'stamina'],
  ['swerve', 'header', 'explosivePower'],
  ['attackingProwess', 'ballWinning', 'speed'],
  ['dribbling', 'placeKicking', 'bodyControl'],
  ['loftedPass', 'bodyControl', 'stamina'],
  ['swerve', 'header', 'explosivePower'],
  ['ballControl', 'defensiveProwess', 'kickingPower'],
  ['lowPass', 'finishing', 'jump'],
  ['dribbling', 'placeKicking', 'bodyControl'],
  ['attackingProwess', 'ballWinning', 'speed'],
  ['swerve', 'header', 'explosivePower'],
  ['lowPass', 'finishing', 'jump'],
  ['dribbling', 'placeKicking', 'bodyControl'],
  ['ballControl', 'defensiveProwess', 'kickingPower'],
  ['loftedPass', 'bodyControl', 'stamina'],
  ['attackingProwess', 'ballWinning', 'speed'],
  ['ballControl', 'defensiveProwess', 'kickingPower'],
  ['loftedPass', 'bodyControl', 'stamina'],
  ['attackingProwess', 'ballWinning', 'speed'],
  ['dribbling', 'placeKicking', 'bodyControl'],
  ['swerve', 'header', 'explosivePower'],
  ['lowPass', 'finishing', 'jump'],
  ['attackingProwess', 'ballWinning', 'speed'],
  ['ballControl', 'defensiveProwess', 'kickingPower']
];

/**
 * Returns a map which contains the keys of the attributes that changed between
 * the previous and the supplied level.
 */
export function getChangedAbilitiesForLevel(
  level: number
): Partial<IPlayerAbilities> {
  if (level >= LEVEL_CHANGES.length) {
    return {};
  }
  const changed = LEVEL_CHANGES[level].reduce<Partial<IPlayerAbilities>>(
    (acc, ability) => ({ ...acc, [ability]: 1 }),
    {}
  );
  return changed;
}

export function getHighestAbilities(players: Player[]): AbilityFlags[] {
  const highlights: AbilityFlags[] = players.map(() => ({}));
  if (players.length > 1) {
    ABILITY_PROPS.forEach(key => {
      let highestIndex = 0;
      for (let i = 1; i < players.length; i++) {
        const currentAbility = players[i].abilities![key] || 0;
        const prevHighestAbility = players[highestIndex].abilities![key] || 0;
        if (currentAbility > prevHighestAbility) {
          highestIndex = i;
        }
      }
      highlights[highestIndex][key] = true;
    });
  }
  return highlights;
}

export const OVR_WEIGHTS: { [pos: number]: Partial<IPlayerAbilities> } = {
  [Position.CF]: {
    attackingProwess: 0.33,
    ballControl: 0.25,
    dribbling: 0.15,
    finishing: 0.38,
    header: 0.03,
    speed: 0.05,
    explosivePower: 0.05,
    bodyControl: 0.1,
    jump: 0.03
  },

  [Position.GK]: {
    goalkeeping: 0.52,
    reflexes: 0.52,
    bodyControl: 0.12,
    jump: 0.12
  },

  [Position.SS]: {
    attackingProwess: 0.16,
    ballControl: 0.2,
    dribbling: 0.2,
    lowPass: 0.1,
    loftedPass: 0.1,
    finishing: 0.15,
    kickingPower: 0.06,
    speed: 0.1,
    explosivePower: 0.2,
    bodyControl: 0.07,
    stamina: 0.04
  },

  [Position.CB]: {
    header: 0.2,
    defensiveProwess: 0.27,
    ballWinning: 0.27,
    speed: 0.11,
    bodyControl: 0.21,
    jump: 0.21,
    stamina: 0.1
  },

  [Position.DMF]: {
    attackingProwess: 0.07,
    ballControl: 0.19,
    dribbling: 0.16,
    lowPass: 0.19,
    loftedPass: 0.2,
    swerve: 0.13,
    defensiveProwess: 0.07,
    ballWinning: 0.03,
    speed: 0.03,
    explosivePower: 0.03,
    bodyControl: 0.14,
    jump: 0.05,
    stamina: 0.15
  },

  [Position.CMF]: {
    attackingProwess: 0.05,
    ballControl: 0.25,
    dribbling: 0.25,
    lowPass: 0.25,
    loftedPass: 0.22,
    defensiveProwess: 0.03,
    speed: 0.04,
    explosivePower: 0.06,
    bodyControl: 0.05,
    stamina: 0.18
  },

  [Position.AMF]: {
    attackingProwess: 0.15,
    ballControl: 0.23,
    dribbling: 0.23,
    lowPass: 0.23,
    loftedPass: 0.15,
    finishing: 0.18,
    speed: 0.05,
    explosivePower: 0.07,
    bodyControl: 0.05,
    stamina: 0.03
  },

  [Position.RMF]: {
    attackingProwess: 0.07,
    ballControl: 0.16,
    dribbling: 0.26,
    lowPass: 0.07,
    loftedPass: 0.13,
    swerve: 0.04,
    speed: 0.26,
    explosivePower: 0.23,
    stamina: 0.14
  },

  [Position.RB]: {
    attackingProwess: 0.06,
    ballControl: 0.1,
    dribbling: 0.15,
    loftedPass: 0.15,
    defensiveProwess: 0.15,
    ballWinning: 0.14,
    speed: 0.15,
    explosivePower: 0.15,
    bodyControl: 0.12,
    jump: 0.12,
    stamina: 0.13
  },

  [Position.RWF]: {
    attackingProwess: 0.18,
    ballControl: 0.22,
    dribbling: 0.22,
    lowPass: 0.05,
    loftedPass: 0.1,
    finishing: 0.12,
    kickingPower: 0.05,
    speed: 0.16,
    explosivePower: 0.16,
    bodyControl: 0.06,
    stamina: 0.06
  }
};

OVR_WEIGHTS[Position.LMF] = OVR_WEIGHTS[Position.RMF];
OVR_WEIGHTS[Position.LWF] = OVR_WEIGHTS[Position.RWF];
OVR_WEIGHTS[Position.LB] = OVR_WEIGHTS[Position.RB];

/** Return raw stat weights for a position. */
export function getPositionWeights(
  position: Position
): Partial<IPlayerAbilities> {
  if (position in OVR_WEIGHTS) {
    return OVR_WEIGHTS[position];
  } else {
    throw new Error(`Unknown position: ${position}`);
  }
}
