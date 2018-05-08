import * as React from 'react';
import { pure } from 'recompose';

import { PlayerForm, PlayerFormValue } from '../../shared/utils/player';
import { ArrowContainer } from './styles';

export interface Props {
  form: PlayerForm;
}

export const FormArrow = pure<Props>(({ form }) => {
  return (
    <ArrowContainer className={PlayerFormValue[form]}>
      <svg
        viewBox="0 0 530 530"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        {/* Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch */}
        <title>form_arrow</title>
        <desc>Created with Sketch.</desc>
        <g>
          <path
            // tslint:disable-next-line:max-line-length
            d="M510.098322,260.101745 C508.269106,255.716876 504.000568,252.855554 499.263733,252.855554 L370.773375,252.855554 L370.773375,30.7255941 C370.773375,24.2532684 365.519874,19 359.047262,19 L171.434959,19 C164.962348,19 159.708847,24.2532684 159.708847,30.7255941 L159.708847,252.856654 L30.7260071,252.856654 C25.9891721,252.856654 21.7206341,255.717976 19.8914177,260.07976 C18.0852864,264.464629 19.0702491,269.506843 22.4241789,272.860625 L256.352812,507.552783 C258.556886,509.756759 261.535958,511 264.65464,511 C267.773322,511 270.752395,509.756759 272.956468,507.575867 L507.565561,272.883709 C510.919491,269.528828 511.927539,264.487713 510.098322,260.101745 Z"
            className="arrow"
            transform="translate(265.000000, 265.000000) scale(1, -1) translate(-265.000000, -265.000000) "
          />
        </g>
      </svg>
    </ArrowContainer>
  );
});
