import styled from 'styled-components';

const step = 45;
const up = 180;

export const ArrowContainer = styled.div`
  .arrow {
    transform-origin: 50% 50%;
  }

  &.A {
    /* background-color: #003b2b; */
    .arrow {
      fill: #21f4cc;
      transform: rotate(${up}deg);
    }
  }

  &.B {
    /* background-color: #253801; */
    .arrow {
      fill: #98e305;
      transform: rotate(${up + step}deg);
    }
  }

  &.C {
    /* background-color: #353000; */
    .arrow {
      fill: #c3bc00;
      transform: rotate(${up + 2 * step}deg);
    }
  }

  &.D {
    /* background-color: #3b1f00; */
    .arrow {
      fill: #b06800;
      transform: rotate(${up + 3 * step}deg);
    }
  }

  &.E {
    /* background-color: #3e0d0e; */
    .arrow {
      fill: #bc0102;
      transform: rotate(${up + 4 * step}deg);
    }
  }
`;
