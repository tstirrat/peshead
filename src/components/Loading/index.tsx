import * as React from 'react';
import { CircularProgress } from 'material-ui/Progress';

import { ErrorPanel } from '../ErrorPanel';

import './Loading.css';

interface ViewModel {
  when: boolean;
  error?: Error;
}

export class Loading extends React.PureComponent<ViewModel> {
  render() {
    if (this.props.when) {
      return (
        <div className="Loading">
          <CircularProgress />
        </div>
      );
    } else if (this.props.error) {
      return (<ErrorPanel error={this.props.error} />);
    } else {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
  }
}
