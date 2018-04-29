import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as search from '../../actions/search';
import { Loading } from '../../components/Loading';
import { PlayerTable } from '../../components/PlayerTable';
import * as fromRoot from '../../reducers';
import { assert } from '../../shared/assert';
import { Player } from '../../shared/service/api';

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
        ...this.props.params,
        query: assert(this.props.params.query, `Query should be defined here`)
      });
    }
  }

  /**
   * When search params change on the same route, component does not un-mount.
   * This allows re-queries.
   */
  componentWillUpdate(nextProps: ViewModel) {
    const { query } = nextProps.params;
    if (query && query !== this.props.params.query) {
      this.props.search({
        ...this.props.params,
        query: assert(this.props.params.query, `Query should be defined here`)
      });
    }
  }

  render() {
    const { isLoading, error } = this.props;
    return (
      <div className="Search">
        <Helmet>
          <title>PEShead - Search results</title>
        </Helmet>
        <Typography variant="title">Search results</Typography>
        <Card>
          <Loading
            when={isLoading}
            error={error}
            render={this.renderPlayerTable}
          />
        </Card>
      </div>
    );
  }

  private renderPlayerTable = () => {
    const { results } = this.props;
    return <PlayerTable players={results} />;
  };
}

const getViewModel = (state: fromRoot.State): ViewModel => {
  return {
    isLoading: fromRoot.getSearchIsLoading(state),
    error: fromRoot.getSearchError(state),
    params: fromRoot.getQueryParams<QueryParams>(state),
    results: fromRoot.getSearchResults(state)
  };
};

const getActions = (dispatch: Dispatch<fromRoot.State>): Actions => {
  return {
    search: (query: search.SearchRequestPayload) =>
      dispatch(search.search(query)),
    dispatch
  };
};

// tslint:disable-next-line:variable-name
export const ConnectedSearch = connect(getViewModel, getActions)(Search);
