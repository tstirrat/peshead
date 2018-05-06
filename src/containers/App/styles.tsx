import * as React from 'react';
import { pure } from 'recompose';
import styled from 'styled-components';

import { MainInput } from '../../components/SuggestPlayer/styles';

export const AppRoot = styled.div`
  a:link,
  a:visited {
    color: #03a9f4;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export const Flex = styled.div`
  flex: 1;
`;

export interface FlexLayoutProps {
  align?: 'row' | 'column';
  className?: string;
}
export const FlexLayoutDiv = pure<FlexLayoutProps>(
  ({ className, children }) => <div className={className}>{children}</div>
);

export const ToolbarSearchContainer = styled.div`
  flex: 1;

  ${MainInput} {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 2px;

    input {
      color: white;
      padding-left: 0.5rem;
    }
  }
`;

export const FlexLayout = styled(FlexLayoutDiv)`
  display: flex;
  flex-direction: ${({ align = 'row' }) => align};
`;

export const AppContainer = styled.div`
  margin: 0 auto;
  padding: 80px 24px 0 24px;
  max-width: 900px;
  display: flex;
  flex-direction: column;
`;

export const CanvasControls = styled.small`
  padding: 24px;
  color: rgba(0, 0, 0, 0.54);

  &.center {
    text-align: center;
  }

  a:link,
  a:visited {
    color: rgba(0, 0, 0, 0.54);
    text-decoration: underline;
  }

  a:hover {
    color: rgba(0, 0, 0, 0.87);
  }
`;
