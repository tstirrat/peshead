import styled from 'styled-components';

const badgeSize = 14;
const offset = `12px`;

export const Badge = styled.span`
  background-color: red;
  border-radius: 50%;
  color: white;
  font-size: ${badgeSize - 4}px;
  height: ${badgeSize}px;
  line-height: ${badgeSize}px;
  position: absolute;
  text-align: center;
  transform: translate(${offset}, ${offset});
  width: ${badgeSize}px;
`;
