import * as React from 'react';
import { Link } from 'react-router-dom';

class League extends React.Component {
  render() {
    return (
      <div className="League">
        <div className="League-header">
          <h2>League</h2>
          <p><Link to="/team/1">Team 1</Link></p>
          <p><Link to="/team/2">Team 2</Link></p>
        </div>
      </div>
    );
  }
}

export default League;
