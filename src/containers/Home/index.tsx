import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { SearchBox } from '../../components/SearchBox';

import './Home.css';

export type Props = RouteComponentProps<{}>;

interface State {
  query: string;
}

export class Home extends React.PureComponent<Props, State> {
  state: State = {
    query: '',
  };

  render() {
    return (
      <div className="Home">
        <div className="Home-header">

          <div className="search-container">
            <SearchBox onSubmit={query => this.search(query)} />
          </div>

          <ul>
            <li><Link to="/players/37134">N. CHERUBIN</Link></li>
            <li><Link to="/players/7511">L. MESSI</Link></li>
            <li><Link to="/players/4522">C. RONALDO</Link></li>
          </ul>
        </div>
      </div>
    );
  }

  private search = (query: string) => {
    this.props.history.push(`/search?query=${query}`);
  }
}
