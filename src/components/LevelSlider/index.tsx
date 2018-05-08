import { ButtonBase } from 'material-ui';
import Icon from 'material-ui/Icon';
import * as React from 'react';
import { pure } from 'recompose';

import { DEFAULT_PLAYER_LEVEL } from '../../shared/utils/player';
import { Container, Label, Slider } from './styles';

export interface Props {
  value: number;
  max?: number;
  onChange?: (l: number) => void;
}

export const LevelSlider = pure<Props>(({ value, max = 75, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange && onChange(Number(e.target.value));

  const reset = () => onChange && onChange(DEFAULT_PLAYER_LEVEL);

  return (
    <Container>
      <Slider>
        <input
          type="range"
          value={value}
          min={1}
          max={max}
          onChange={handleChange}
        />
        <ButtonBase onClick={reset}>
          <Icon>clear</Icon>
        </ButtonBase>
      </Slider>
      <Label>
        Lv. {value} / {max}
      </Label>
    </Container>
  );
});
