// tslint:disable:no-use-before-declare
import * as React from 'react';
import { pure } from 'recompose';

import { CountryFlagImage, CountryLabel } from '../../shared/utils/country';

export interface Props {
  countryId: number;
}

/**
 * Renders a player's preferred foot incl. weak foot information.
 */
export const CountryFlag = pure<Props>(({ countryId }) => {
  const title = CountryLabel[countryId];
  return <img src={CountryFlagImage[countryId]} alt={title} title={title} />;
});
