import { CircularProgress } from 'material-ui/Progress';
import * as React from 'react';
import { pure } from 'recompose';
import styled from 'styled-components';

import { ErrorPanel } from '../ErrorPanel';

interface ViewModel {
  when: boolean;
  render: () => JSX.Element;
  error?: Error;
}

export const Centered = styled.div`
  min-height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Loading = pure<ViewModel>(({ when, error, render }) => {
  if (when) {
    return (
      <Centered>
        <CircularProgress />
      </Centered>
    );
  } else if (error) {
    return <ErrorPanel error={error} />;
  } else {
    return render();
  }
});
