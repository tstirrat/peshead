import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';

import { Header } from '../../components/ComparePlayersStatColumn/styles';
import { MainInput } from '../../components/SuggestPlayer/styles';

export const AddButton = styled(Button)`
  position: absolute !important;
  right: -16px;
  top: -4px;
  z-index: 100;
`;

export const PaperContainer = styled(Paper)`
  position: relative;

  ${Header} {
    padding: 8px;
  }
`;

export const PlayerInputContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  background-color: white;
  z-index: 100;

  ${MainInput} {
    padding: 8px 24px;
    box-sizing: border-box;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }
`;
