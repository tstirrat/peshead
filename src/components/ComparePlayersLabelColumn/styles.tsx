import { ListItem } from 'material-ui/List';
import styled from 'styled-components';

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
