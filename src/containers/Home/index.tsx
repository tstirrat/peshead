import './Home.css';

import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

export type Props = RouteComponentProps<{}>;

interface State {
  query: string;
}

export class Home extends React.PureComponent<Props, State> {
  state: State = {
    query: ''
  };

  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <h3>Profiles</h3>
          <ul>
            <li>
              <Link to="/players/37134">N. CHERUBIN</Link>
            </li>
            <li>
              <Link to="/players/7511">L. MESSI</Link>
            </li>
            <li>
              <Link to="/players/4522">C. RONALDO</Link>
            </li>
          </ul>
          <h3>Compare</h3>
          <ul>
            <li>
              <Link to="/players/compare/37134/7511">
                N. CHERUBIN vs. L. MESSI
              </Link>
            </li>
            <li>
              <Link to="/players/compare/7511/4522">
                L. MESSI vs. C. RONALDO
              </Link>
            </li>
            <li>
              <Link to="/players/compare/4522/7511-A-L1">
                C. RONALDO vs. L1A MESSI
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
