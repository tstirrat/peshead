import { ButtonBase } from 'material-ui';
import Icon from 'material-ui/Icon';
import * as React from 'react';
import { pure } from 'recompose';

import { DEFAULT_PLAYER_FORM, PlayerForm, PlayerFormValue } from '../../shared/utils/player';
import { Container, Label, Slider } from '../LevelSlider/styles';

export interface Props {
  value: PlayerForm;
  onChange?: (l: PlayerForm) => void;
}

export const FormSlider = pure<Props>(({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange && onChange(Number(e.target.value));

  const reset = () => onChange && onChange(DEFAULT_PLAYER_FORM);

  return (
    <Container>
      <Slider>
        <input
          type="range"
          value={value}
          min={PlayerForm.E}
          max={PlayerForm.A}
          onChange={handleChange}
        />{' '}
        <ButtonBase onClick={reset}>
          <Icon>clear</Icon>
        </ButtonBase>
      </Slider>
      <Label>{PlayerFormValue[value]}</Label>
    </Container>
  );
});
