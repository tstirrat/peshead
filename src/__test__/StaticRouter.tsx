import * as React from 'react';
import { Provider } from 'react-redux';
import { pure } from 'recompose';
import { createStore } from 'redux';
import { State } from 'redux-little-router';

export interface Props {
  url?: string;
}

/** Component that provides a store with `router.pathname`, for <Link> tags. */
export const StaticRouter = pure<Props>(({ children, url = '/' }) => {
  const state: State = {
    router: {
      pathname: url
    }
  };
  const store = createStore(() => state);
  return <Provider store={store}>{children}</Provider>;
});
