import Typography from 'material-ui/Typography';
import * as React from 'react';
import { pure } from 'recompose';
import styled from 'styled-components';

interface ViewModel {
  error: Error;
}

const Centered = styled.div`
  min-height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ErrorPanel = pure<ViewModel>(({ error }) => (
  <Centered>
    <div>
      <Typography type="title">An error has occurred</Typography>
      <Typography type="body1">{error.message}</Typography>
    </div>
  </Centered>
));
