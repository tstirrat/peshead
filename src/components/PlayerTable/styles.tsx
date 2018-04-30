import Table from 'material-ui/Table';
import { Link } from 'redux-little-router';
import styled from 'styled-components';

import { CountryFlag } from '../CountryFlag';

export const Flag = styled(CountryFlag)`
  max-width: 24px;
`;

export const StyledTable = styled(Table)`
  .center {
    text-align: center;
  }

  a:link,
  a:visited {
    color: rgba(0, 0, 0, 0.87);
  }

  a:link:hover {
  }
`;

export const Avatar = styled.img`
  user-select: none;
  width: 36px;
  height: 36px;
`;

export const NameLink = styled(Link)`
  display: block;
`;
