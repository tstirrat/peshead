import Button from 'material-ui/Button';
import List, { ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { Link } from 'redux-little-router';
import styled from 'styled-components';

import { MainInput } from '../../components/SuggestPlayer/styles';

export const AddButton = styled(Button)`
  position: absolute !important;
  right: -16px;
  top: -4px;
  z-index: 100;
`;

export const EllipsizedLink = styled(Link)`
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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

export const Header = styled(ListItem)`
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 78px;

  ${EllipsizedLink} {
    width: 100%;
  }
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
