import { make } from '../__test__/fixtures';
import { Player } from '../service/api';
import { FORM_CHANGES, getPositionRating, PlayerForm } from '../utils/player';
import { AugmentedPlayer } from './augmented_player';

describe('AugmentedPlayer', () => {
  describe('[form]', () => {
    let messi: Player;

    beforeEach(() => {
      messi = make.player();
    });

    it('keeps a ref to the original player', () => {
      const newPlayer = new AugmentedPlayer(messi, { form: PlayerForm.A });
      expect(newPlayer.original).toBe(messi);
    });

    it('does not mutate original player', () => {
      const newPlayer = new AugmentedPlayer(messi, { form: PlayerForm.A });
      expect(newPlayer.abilities).not.toBe(messi.abilities);
    });

    describe('with form C', () => {
      let formC: AugmentedPlayer;
      beforeEach(() => {
        formC = new AugmentedPlayer(messi, { form: PlayerForm.C });
      });

      it('does not modify ovr', () => {
        expect(formC.ovr).toBe(messi.ovr);
        expect(formC.ovr).toBe(getPositionRating(messi));
      });

      it('does not modify abilities', () => {
        expect(formC.abilities).toEqual(messi.abilities);
      });
    });

    describe('with any other form', () => {
      let formA: AugmentedPlayer;
      beforeEach(() => {
        formA = new AugmentedPlayer(messi, { form: PlayerForm.A });
      });

      it('increases ovr', () => {
        expect(formA.ovr).toBeGreaterThan(messi.ovr);
      });

      it('calculates new ovr', () => {
        expect(formA.ovr).toBe(getPositionRating(formA));
      });

      it('modifies all form-specific abilities', () => {
        Object.keys(FORM_CHANGES[PlayerForm.A]).forEach(a => {
          expect(formA.abilities[a]).not.toEqual(messi.abilities[a]);
        });
      });

      it('keeps non-form abilities the same', () => {
        const {
          explosivePower,
          attackingProwess,
          defensiveProwess,
          ballWinning,
          kickingPower,
          stamina,
          ballControl,
          dribbling,
          finishing,
          header,
          jump,
          loftedPass,
          lowPass,
          placeKicking,
          swerve,
          speed,
          bodyControl,
          physicalContact,
          ...otherStats
        } = formA.abilities;
        expect(messi.abilities).toEqual(expect.objectContaining(otherStats));
      });
    });
  }); // [form]
}); // AugmentedPlayer
