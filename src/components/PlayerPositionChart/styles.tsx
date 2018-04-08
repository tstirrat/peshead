import styled from 'styled-components';

import { PlayerStat } from '../PlayerStat';

export const Table = styled.table`
  ${PlayerStat} {
    border-radius: 0;
    display: flex;
  }

  /** prettier hates this format */
  .lwf
    ${PlayerStat},
    .rwf
    ${PlayerStat},
    .lmf
    ${PlayerStat},
    .rmf
    ${PlayerStat},
    .lb
    ${PlayerStat},
    .rb
    ${PlayerStat} {
    height: 54px;
    width: 32px;
  }

  .cf
    ${PlayerStat},
    .ss
    ${PlayerStat},
    .amf
    ${PlayerStat},
    .cmf
    ${PlayerStat},
    .dmf
    ${PlayerStat},
    .cb
    ${PlayerStat},
    .gk
    ${PlayerStat} {
    width: 68px;
    height: 24px;
  }

  .amf ${PlayerStat}, .cmf ${PlayerStat}, .dmf ${PlayerStat} {
    height: 16px;
  }
`;
