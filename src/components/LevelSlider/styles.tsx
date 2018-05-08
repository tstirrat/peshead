import styled from 'styled-components';

import { ArrowContainer } from '../FormArrow/styles';

export const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  position: relative;
  color: rgba(0, 0, 0, 0.87);
  display: flex;
  align-items: center;

  ${ArrowContainer} {
    margin: auto;
    width: 16px;
  }

  button {
    margin-left: 16px;
    color: rgba(0, 0, 0, 0.54);
  }
`;

export const Slider = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.54);
`;

export const Label = styled.div`
  font-size: 0.8rem;
  position: absolute;
  bottom: -4px;
`;
