import * as React from 'react';

import './PlayerStat.css';

export interface Props {
  value: number;
  maxValue?: number;
}

const DEFAULT_MAX = 100;  // technically 99, but 100 makes it easier to calc

enum Band {
  VERY_WEAK = 0,
  WEAK = 60,
  AVERAGE = 70,
  STRONG = 80,
  VERY_STRONG = 90,
}

const BAND_CLASS: { [b: number]: string } = {
  [Band.VERY_WEAK]: 'very-weak',      // red
  [Band.WEAK]: 'weak',                // dark-orange
  [Band.AVERAGE]: 'average',          // yellow
  [Band.STRONG]: 'strong',            // green
  [Band.VERY_STRONG]: 'very-strong',  // blue green
};

export class PlayerStat extends React.PureComponent<Props> {
  render() {
    return (
      <div className={'PlayerStat ' + this.getStrengthClass()}>
        <span className="stat">{this.props.value}</span>
      </div>
    );
  }

  /** Get the strength class, for color grading */
  private getStrengthClass() {
    const maxValue = this.props.maxValue || DEFAULT_MAX;
    const percentage = (this.props.value / maxValue) * 100;
    if (percentage >= Band.VERY_STRONG) {
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
}
