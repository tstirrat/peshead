import List, { ListItem } from 'material-ui/List';
import styled from 'styled-components';

export const Column = styled(List)`
  padding: 0 !important;
`;

export const Label = styled(ListItem)`
  > div {
    overflow: hidden;
    padding-right: 0;
  }

  h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 0;
  }
`;

export const PlayerHeader = styled(ListItem)`
  background-color: white;
  height: 78px;
`;
