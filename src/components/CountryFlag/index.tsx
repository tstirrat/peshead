// tslint:disable:no-use-before-declare
import * as React from 'react';
import { pure } from 'recompose';

import { CountryFlagImage, CountryLabel } from '../../shared/utils/country';

export interface Props {
  countryId: number;
  className?: string;
}

/**
 * Renders a player's preferred foot incl. weak foot information.
 */
export const CountryFlag = pure<Props>(({ countryId, className }) => {
  const title = CountryLabel[countryId];
  return (
    <img
      className={className}
      src={CountryFlagImage[countryId]}
      alt={title}
      title={title}
    />
  );
});
