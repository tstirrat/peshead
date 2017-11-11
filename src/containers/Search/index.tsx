import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Typography from 'material-ui/Typography';

import { Player } from '../../../functions/service/api';

import * as search from '../../actions/search';
import { Loading } from '../../components/Loading';
import { PlayerTable } from '../../components/PlayerTable';
import * as fromRoot from '../../reducers';

interface QueryParams {
  query?: string;
  sortField?: string;
  sortDirection?: string;
}

export interface ViewModel {
  isLoading: boolean;
  error?: Error;
  params: QueryParams;
  results: Player[];
}

export interface Actions {
  search: typeof search.search;
  dispatch: Dispatch<fromRoot.State>;
}

export class Search extends React.PureComponent<ViewModel & Actions> {

  componentDidMount() {
    if (this.props.params.query && !this.props.isLoading) {
      // TODO: needs work, prevent double searches
      this.props.search({
        query: this.props.params.query,
      });
    }
  }

  render() {
    const { isLoading, error, results } = this.props;
    return (
      <div className="Search">
        <div className="Search-header">
          <Typography type="title">Search results</Typography>
        </div>
        <div className="Search-results">
          <Loading
            when={isLoading}
            error={error}
            render={() => <PlayerTable players={results} />}
          />
        </div>
      </div>
    );
  }
}

const getViewModel = (state: fromRoot.State): ViewModel => {
  return {
    isLoading: fromRoot.getSearchIsLoading(state),
    error: fromRoot.getSearchError(state),
    params: fromRoot.getQueryParams<QueryParams>(state),
    results: fromRoot.getSearchResults(state),
  };
};

const getActions = (dispatch: Dispatch<fromRoot.State>): Actions => {
  return {
    search: (query: string) => dispatch(search.search(query)),
    dispatch,
  };
};

// tslint:disable-next-line:variable-name
export const ConnectedSearch =
  withRouter(connect(getViewModel, getActions)(Search));
