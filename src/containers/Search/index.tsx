import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { State as GlobalState } from '../../reducers';
import * as search from '../../reducers/search';

export interface Props {
  search: search.State;
}

export class Search extends React.Component<Props> {
  render() {
    return (
      <div className="Search">
        <div className="Search-header">
          <h2>Search</h2>
          <p><Link to="/league/1">League 1</Link></p>
          <p><Link to="/league/2">League 2</Link></p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: GlobalState): Props {
  return { search: state.data.search };
}

// tslint:disable-next-line:variable-name
export const ConnectedSearch = withRouter(connect(mapStateToProps)(Search));
