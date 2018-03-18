import { IPlayerAbilities } from '../service/api';

export type PlayerAbilityName = keyof IPlayerAbilities;

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

export const DEFAULT_PLAYER_FORM = PlayerForm.C;
export const DEFAULT_PLAYER_LEVEL = 30;

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
export function getChangedAbilitiesForLevel(level: number): IPlayerAbilities {
  if (level >= LEVEL_CHANGES.length) {
    return {};
  }
  const changed = LEVEL_CHANGES[level].reduce<IPlayerAbilities>(
    (acc, ability) => ({ ...acc, [ability]: 1 }),
    {}
  );
  return changed;
}
