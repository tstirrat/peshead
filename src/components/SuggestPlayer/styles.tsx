import { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import styled from 'styled-components';

import { CountryFlag } from '../CountryFlag';

export const SuggestionsContainer = styled(Paper)`
  position: absolute;
  left: 0;
  right: 0;
  z-index: 10;
  max-width: 400px;
  border-radius: 2px;

  .suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
`;

export const SuggestionResult = styled(MenuItem).attrs({
  component: 'div'
})`
  display: flex;
  align-items: center;
`;

const padding = '8px';

export const Name = styled.span`
  margin-left: ${padding};
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    font-weight: 300;
  }

  strong {
    font-weight: 500;
  }
`;

export const Image = styled.img`
  /* TODO: resize images statically */
  width: 24px;
`;

export const Flag = styled(CountryFlag)`
  margin-left: ${padding};

  &:first-child {
    margin-left: 0;
  }
`;

export const MainInput = styled(TextField)`
  width: 100%;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;

  input {
    color: white;
    padding-left: 0.5rem;
  }
`;
