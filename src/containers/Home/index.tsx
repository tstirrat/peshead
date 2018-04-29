import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Trans } from 'react-i18next';

import * as search from '../../actions/search';
import { Loading } from '../../components/Loading';
import { PlayerTable } from '../../components/PlayerTable';
import * as fromRoot from '../../reducers';
import { Player } from '../../shared/service/api';

export interface ViewModel {
  isLoading: boolean;
  results: Player[];
  error?: Error;
}

export interface Actions {
  search: typeof search.search;
  dispatch: Dispatch<fromRoot.State>;
}

export class Home extends React.PureComponent<ViewModel & Actions> {
  componentDidMount() {
    const { results, isLoading } = this.props;
    if (!isLoading && !results.length) {
      this.props.search({ query: '', id: 'home' });
    }
  }

  render() {
    const { isLoading, error } = this.props;
    return (
      <div>
        <Helmet>
          <title>PEShead - Home</title>
        </Helmet>
        <Typography variant="title">
          <Trans>Players</Trans>
        </Typography>
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
    isLoading: fromRoot.getHomeIsLoading(state),
    results: fromRoot.getHomeResults(state),
    error: fromRoot.getHomeError(state)
  };
};

const getActions = (dispatch: Dispatch<fromRoot.State>): Actions => {
  return {
    search: (query: search.SearchRequestPayload) =>
      dispatch(search.search(query)),
    dispatch
  };
};

export const ConnectedHome = connect(getViewModel, getActions)(Home);
