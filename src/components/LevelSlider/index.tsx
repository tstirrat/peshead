import 'rc-slider/assets/index.css';

import ButtonBase from 'material-ui/ButtonBase';
import Hidden from 'material-ui/Hidden/Hidden';
import Icon from 'material-ui/Icon';
import Tooltip from 'material-ui/Tooltip';
import Slider, { Handle, Marks } from 'rc-slider';
import * as React from 'react';
import { pure } from 'recompose';

import { DEFAULT_PLAYER_LEVEL } from '../../shared/utils/player';
import { Container } from './styles';

export interface Props {
  value: number;
  max?: number;
  onChange?: (l: number) => void;
}

const marks: Marks = {
  1: '1',
  [DEFAULT_PLAYER_LEVEL]: '' + DEFAULT_PLAYER_LEVEL,
  75: '75'
};

// tslint:disable-next-line:no-any
const handle = (props: any) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      className="rc-slider-tooltip"
      title={value}
      placement="top"
      key={index}
      enterDelay={0}
      leaveDelay={0}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

export const LevelSlider = pure<Props>(({ value, max = 75, onChange }) => {
  const handleChange = (level: number) => onChange && onChange(level);

  const reset = () => onChange && onChange(DEFAULT_PLAYER_LEVEL);

  return (
    <Container>
      <Slider
        value={value}
        min={1}
        max={max}
        defaultValue={DEFAULT_PLAYER_LEVEL}
        onChange={handleChange}
        handle={handle}
        marks={marks}
      />
      <Hidden xsDown={true}>
        <ButtonBase onClick={reset}>
          <Icon>refresh</Icon>
        </ButtonBase>
      </Hidden>
    </Container>
  );
});
