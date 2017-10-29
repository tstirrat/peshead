import * as React from 'react';
import { CircularProgress } from 'material-ui/Progress';

export class Loading extends React.PureComponent<{}> {
  render() {
    return (
      <div className="Loading">
        <CircularProgress />
      </div>
    );
  }
}
