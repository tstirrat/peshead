import { IPlayer, IPlayerAbilities, Player } from '../service/api';
import {
  getAbilityDeltaForForm,
  getAbilityDeltaForLevel,
  getPositionRating,
  getTotalStats,
  PlayerForm,
} from '../utils/player';

export interface AugmentedPlayerOptions {
  form?: PlayerForm;
  level?: number;
}

/** Represents a temporary change to a player (e.g. form or level) */
export class AugmentedPlayer extends Player {
  /** The unmodified player. */
  readonly original: Player;

  constructor(
    player: Player,
    { form = PlayerForm.C, level = 30 }: AugmentedPlayerOptions
  ) {
    const levelDelta = getAbilityDeltaForLevel(player.abilities, level);
    const withLevel = addAbilityChanges(player.abilities, levelDelta);
    const formDelta = getAbilityDeltaForForm(withLevel, form);
    const withLevelAndForm = addAbilityChanges(withLevel, formDelta);

    // enforce a clone of all data
    const finalJson: IPlayer = {
      ...(player.toJSON() as IPlayer),
      abilities: { ...withLevelAndForm }
    };

    // update OVR with new stats
    const finalPlayer = Player.fromObject(finalJson);
    finalPlayer.ovr = getPositionRating(finalPlayer);
    finalPlayer.totalAbilities = getTotalStats(finalPlayer);
    super(finalPlayer);

    this.original = player;
  }
}

function addAbilityChanges(
  abilities: IPlayerAbilities,
  changes: Partial<IPlayerAbilities>
): IPlayerAbilities {
  const updated = { ...abilities };
  Object.keys(changes).forEach(
    ability => (updated[ability] = updated[ability] + changes[ability])
  );
  return updated;
}
