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
  [Position.ATTACKING_MIDFIELDER]: 'AMF',
  [Position.CENTRE_BACK]: 'CB',
  [Position.CENTRE_FORWARD]: 'CF',
  [Position.CENTRE_MIDFIELDER]: 'CMF',
  [Position.DEFENSIVE_MIDFIELDER]: 'DMF',
  [Position.GOALKEEPER]: 'GK',
  [Position.LEFT_BACK]: 'LB',
  [Position.LEFT_MIDFIELDER]: 'LMF',
  [Position.LEFT_WING_FORWARD]: 'LWF',
  [Position.RIGHT_BACK]: 'RB',
  [Position.RIGHT_MIDFIELDER]: 'RMF',
  [Position.RIGHT_WING_FORWARD]: 'RWF',
  [Position.SECOND_STRIKER]: 'SS'
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
