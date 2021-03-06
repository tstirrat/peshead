import { countBy, flatten, mapKeys, mapValues, sum, values } from 'lodash';

import { ICardStatMap, IPlayer, IPlayerAbilities, Player, PlayingStyle, Position } from '../service/api';

export type PlayerAbilityName = keyof IPlayerAbilities;

/** Boolean flags for each property. */
export type Flags<T> = { [P in keyof T]?: boolean };

export type AbilityFlags = Flags<IPlayerAbilities>;

export type AbilityWeights = Partial<IPlayerAbilities>;

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

/** Unicode form arrows for page titles. */
export const PlayerFormChar = {
  [PlayerForm.A]: '⬆️',
  [PlayerForm.B]: '↗️',
  [PlayerForm.C]: '➡️',
  [PlayerForm.D]: '↘️',
  [PlayerForm.E]: '⬇️'
};

export function parseForm(formString = 'C'): PlayerForm {
  return PlayerForm[formString];
}

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
export function getChangedAbilitiesForCurrentLevel(
  level: number,
  delta = 1
): Partial<IPlayerAbilities> {
  if (level >= LEVEL_CHANGES.length) {
    return {};
  }
  const changed = LEVEL_CHANGES[level].reduce<Partial<IPlayerAbilities>>(
    (acc, ability) => ({ ...acc, [ability]: delta }),
    {}
  );
  return changed;
}

/**
 * Returns delta for abilities that changed between two levels.
 */
export function getAbilityDeltaForLevel(
  abilities: IPlayerAbilities,
  level: number,
  referenceLevel = 30
): Partial<IPlayerAbilities> {
  if (referenceLevel === level) {
    return {};
  }

  const start = Math.min(level, referenceLevel);
  const end = Math.max(level, referenceLevel);

  const levelChanges = flatten(LEVEL_CHANGES.slice(start, end));
  const deltas: Partial<IPlayerAbilities> = countBy(levelChanges);

  const delta = level < referenceLevel ? -1 : 1;
  const changes = Object.keys(deltas).reduce<Partial<IPlayerAbilities>>(
    (acc, ability) => ({ ...acc, [ability]: deltas[ability] * delta }),
    {}
  );
  return changes;
}

export const FORM_CHANGES: { [form: number]: AbilityWeights } = {
  [PlayerForm.A]: {
    explosivePower: 0.12,
    attackingProwess: 0.12,
    defensiveProwess: 0.12,
    ballWinning: 0.12,
    kickingPower: 0.12,
    stamina: 0.12,

    ballControl: 0.09,
    dribbling: 0.09,
    finishing: 0.09,
    header: 0.09,
    jump: 0.09,
    loftedPass: 0.09,
    lowPass: 0.09,
    placeKicking: 0.09,
    swerve: 0.09,
    speed: 0.09,

    bodyControl: 0.06,
    physicalContact: 0.06
  },

  [PlayerForm.B]: {
    explosivePower: 0.06,
    attackingProwess: 0.066,
    defensiveProwess: 0.064,
    ballWinning: 0.06,
    kickingPower: 0.06,
    stamina: 0.06,

    ballControl: 0.048,
    dribbling: 0.048,
    finishing: 0.048,
    header: 0.048,
    jump: 0.048,
    loftedPass: 0.048,
    lowPass: 0.048,
    placeKicking: 0.048,
    swerve: 0.048,
    speed: 0.047,

    bodyControl: 0.03,
    physicalContact: 0.03
  },

  [PlayerForm.C]: {
    // no changes
  },

  [PlayerForm.D]: {
    explosivePower: -0.09,
    attackingProwess: -0.08,
    defensiveProwess: -0.08,
    ballWinning: -0.06,
    kickingPower: -0.06,
    stamina: -0.06,

    ballControl: -0.048,
    dribbling: -0.048,
    finishing: -0.048,
    header: -0.048,
    jump: -0.048,
    loftedPass: -0.048,
    lowPass: -0.048,

    placeKicking: -0.06,
    swerve: -0.06,
    speed: -0.06,
    bodyControl: -0.06,
    physicalContact: -0.06
  },

  [PlayerForm.E]: {
    explosivePower: -0.18,
    attackingProwess: -0.016,
    defensiveProwess: -0.016,
    ballWinning: -0.12,
    kickingPower: -0.12,
    stamina: -0.12,

    ballControl: -0.09,
    dribbling: -0.09,
    finishing: -0.09,
    header: -0.09,
    jump: -0.09,
    loftedPass: -0.09,
    lowPass: -0.09,

    placeKicking: -0.12,
    swerve: -0.12,
    speed: -0.12,
    bodyControl: -0.12,
    physicalContact: -0.12
  }
};

/**
 * Returns new ability values after form changes. Only those affected by form
 * are returned.
 */
export function getAbilityDeltaForForm(
  abilities: IPlayerAbilities,
  form: PlayerForm
): Partial<IPlayerAbilities> {
  const changePercent = FORM_CHANGES[form];
  return Object.keys(changePercent).reduce<Partial<IPlayerAbilities>>(
    (acc, a) => {
      const newValue = Math.round(abilities[a] * changePercent[a]);
      return { ...acc, [a]: newValue };
    },
    {}
  );
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

export const OVR_WEIGHTS: { [pos: number]: AbilityWeights } = {
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

export function getPositionRating(
  player: Player,
  position = player.registeredPosition
) {
  return getWeightedRating(player, getPositionWeights(position));
}

/** Calculate a rating given a set of stat weights. */
export function getWeightedRating(
  player: IPlayer,
  weights: Partial<IPlayerAbilities>
): number {
  const BASE = 7; // ?
  const rating = Object.keys(weights).reduce(
    // fixes prettier/tslint alignment
    (total, stat) => {
      if (!player.abilities || !weights) {
        throw new Error('Player or weights are undefined');
      }
      if (stat in player.abilities) {
        const weight = (player.abilities[stat] - 25) * weights[stat];
        return total + weight;
      }
      throw new Error(`Unknown stat: ${stat}`);
    },
    BASE
  );

  return Math.floor(rating);
}

function normalizeWeights(weights: AbilityWeights): AbilityWeights {
  const total = sum(values(weights));
  return mapValues(weights, w => (w ? w / total : 0));
}

/** Calculates a basic normalized weighted rating, no funny business. */
export function simpleWeightRating(
  player: IPlayer,
  inputWeights: AbilityWeights
): number {
  const weights = normalizeWeights(inputWeights);
  const weightedValues: AbilityWeights = mapValues(
    weights,
    (w, key) => (w ? player.abilities[key] * w : 0)
  );
  const total = Math.round(sum(values(weightedValues)));
  return total;
}

/** The combined stats shown "on card" or the hexagon chart */
export enum CardStat {
  SPEED,
  DRIBBLING,
  PASSING,
  DEFENDING,
  PHYSICAL,
  SHOOTING
}

export const CardStatLabel = {
  [CardStat.SPEED]: 'SPD',
  [CardStat.DRIBBLING]: 'DRI',
  [CardStat.PASSING]: 'PAS',
  [CardStat.DEFENDING]: 'DEF',
  [CardStat.PHYSICAL]: 'PHY',
  [CardStat.SHOOTING]: 'SHT'
};

export interface CardStatMap {
  SPD: number;
  DRI: number;
  PAS: number;
  DEF: number;
  PHY: number;
  SHT: number;
}

export const CARD_STAT_WEIGHTS: {
  [stat: string]: Partial<IPlayerAbilities>;
} = {
  [CardStat.SPEED]: {
    speed: 1
    // explosivePower too?
  },
  [CardStat.DRIBBLING]: {
    ballControl: 1,
    dribbling: 1,
    explosivePower: 1,
    bodyControl: 1
  },
  [CardStat.PASSING]: {
    lowPass: 1,
    loftedPass: 1,
    placeKicking: 1,
    swerve: 1
  },
  [CardStat.SHOOTING]: {
    attackingProwess: 1,
    finishing: 1,
    kickingPower: 1
  },
  [CardStat.DEFENDING]: {
    header: 1,
    defensiveProwess: 1,
    ballWinning: 1
  },
  [CardStat.PHYSICAL]: {
    physicalContact: 1,
    jump: 1,
    stamina: 1
  }
};

/** Returns a map of card stat to value e.g. `{'SPD': 94}` */
export function getCardStats(player: IPlayer): ICardStatMap {
  const enumMap = mapKeys(CardStat, num => CardStatLabel[num]);
  const weightsMap = mapValues(enumMap, val => CARD_STAT_WEIGHTS[val]);
  return (mapValues(
    weightsMap,
    weights => simpleWeightRating(player, weights)
    // tslint:disable-next-line:no-any sorry, too hard
  ) as any) as ICardStatMap;
}
