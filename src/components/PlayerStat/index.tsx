import * as React from 'react';
import { pure } from 'recompose';
import styled from 'styled-components';

import { Badge } from './styles';

export interface Props {
  value: number;
  maxValue?: number;
  fade?: boolean;
  badgeText?: string;
}

export interface InternalProps {
  className: string;
}

const DEFAULT_MAX = 100; // technically 99, but 100 makes it easier to calc

enum Band {
  VERY_WEAK = 0,
  WEAK = 60,
  AVERAGE = 70,
  STRONG = 80,
  VERY_STRONG = 90,
  MAX = 96
}

const BAND_CLASS: { [band: number]: string } = {
  [Band.VERY_WEAK]: 'very-weak', // red
  [Band.WEAK]: 'weak', // dark-orange
  [Band.AVERAGE]: 'average', // yellow
  [Band.STRONG]: 'strong', // green
  [Band.VERY_STRONG]: 'very-strong', // blue-green
  [Band.MAX]: 'max' // light blue-green
};

const Container = pure<Props & InternalProps>(
  ({ value, maxValue, className, badgeText }) => (
    <span className={className + ' ' + getStrengthClass(value, maxValue)}>
      <span className="t-stat">{value}</span>
      {badgeText ? <Badge>{badgeText}</Badge> : null}
    </span>
  )
);

export const PlayerStat = styled<Props>(Container)`
  align-items: center;
  background-color: lightgray;
  border-radius: 2px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  color: white;
  display: inline-flex;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 18px;
  height: 32px;
  justify-content: center;
  opacity: ${({ fade }) => (fade ? 0.6 : 1)};
  position: relative;
  width: 32px;

  /* TODO: Use better PES colors here. */
  &.max {
    background-color: rgb(0, 255, 229);
  }

  &.very-strong {
    background-color: rgb(0, 238, 171);
  }

  &.strong {
    background-color: rgb(162, 255, 0);
  }

  &.average {
    background-color: rgb(255, 234, 0);
  }

  &.weak {
    background-color: rgb(255, 140, 0);
  }

  &.very-weak {
    background-color: rgb(255, 0, 0);
  }
`;

/** Get the strength class, for color grading */
function getStrengthClass(value: number, maxValue = DEFAULT_MAX) {
  const percentage = value / maxValue * 100;
  if (percentage >= Band.MAX) {
    return BAND_CLASS[Band.MAX];
  } else if (percentage >= Band.VERY_STRONG) {
    return BAND_CLASS[Band.VERY_STRONG];
  } else if (percentage >= Band.STRONG) {
    return BAND_CLASS[Band.STRONG];
  } else if (percentage >= Band.AVERAGE) {
    return BAND_CLASS[Band.AVERAGE];
  } else if (percentage >= Band.WEAK) {
    return BAND_CLASS[Band.WEAK];
  }
  return BAND_CLASS[Band.VERY_WEAK];
}
