import { IPlayerAbilities } from '../service/api';

export type PlayerAbilityName = keyof IPlayerAbilities;

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
  const changed = LEVEL_CHANGES[level].reduce<IPlayerAbilities>(
    (acc, ability) => ({ ...acc, [ability]: 1 }),
    {}
  );
  return changed;
}
