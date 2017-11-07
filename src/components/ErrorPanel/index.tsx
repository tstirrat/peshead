import * as React from 'react';
import Typography from 'material-ui/Typography';

import './ErrorPanel.css';

interface ViewModel {
  error: Error;
}

export class ErrorPanel extends React.PureComponent<ViewModel> {
  render() {
    const { error } = this.props;

    return (
      <div className="ErrorPanel">
        <div className="ErrorPanel-body">
          <Typography type="title">An error has occurred</Typography>
          <Typography type="body1">{error.message}</Typography>
        </div>
      </div>
    );
  }
}
