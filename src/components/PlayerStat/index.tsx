import * as React from 'react';

export interface Props {
  value: number;
}

export class PlayerStat extends React.PureComponent<Props> {
  render() {
    return (
      <div className="stat">{this.props.value}</div>
    );
  }
}
