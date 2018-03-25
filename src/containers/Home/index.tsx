import './Home.css';

import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import { Helmet } from 'react-helmet';
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
      <div>
        <Helmet>
          <title>PESto - Home</title>
        </Helmet>
        <Typography type="title">Players</Typography>
        <Card className="Home">
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
        </Card>
        <Typography type="title">Compare</Typography>
        <Card>
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
        </Card>
      </div>
    );
  }
}
