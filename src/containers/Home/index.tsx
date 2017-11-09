import * as React from 'react';
import { Link } from 'react-router-dom';

export class Home extends React.PureComponent {
  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <h2>Home</h2>
          <ul>
            <li><Link to="/players/37134">N. CHERUBIN</Link></li>
            <li><Link to="/players/7511">L. MESSI</Link></li>
            <li><Link to="/players/4522">C. RONALDO</Link></li>
          </ul>
        </div>
      </div>
    );
  }
}
