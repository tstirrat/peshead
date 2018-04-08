import { ListSubheader } from 'material-ui/List';
import styled from 'styled-components';

export const Header = styled(ListSubheader)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .link {
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const StyledStat = styled.div`
  background-color: ${props =>
    props.role === 'highest' ? 'rgba(0, 238, 171, 0.08)' : ''};

  li {
    justify-content: center;
    padding: 0;
    height: 48px;
  }
`;
