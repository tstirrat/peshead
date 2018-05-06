import { ListItem } from 'material-ui/List';
import { Link } from 'redux-little-router';
import styled from 'styled-components';

export const EllipsizedLink = styled(Link)`
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Header = styled(ListItem)`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${EllipsizedLink} {
    width: 100%;
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

// TODO: de-dupe this with PlayerTable/styles
export const Avatar = styled.img`
  user-select: none;
  height: 40px;
`;
