import 'rc-slider/assets/index.css';

import ButtonBase from 'material-ui/ButtonBase';
import Hidden from 'material-ui/Hidden';
import Icon from 'material-ui/Icon';
import Slider, { Marks } from 'rc-slider';
import * as React from 'react';
import { pure } from 'recompose';

import { DEFAULT_PLAYER_FORM, PlayerForm } from '../../shared/utils/player';
import { FormArrow } from '../FormArrow';
import { Container } from '../LevelSlider/styles';

export interface Props {
  value: PlayerForm;
  onChange?: (l: PlayerForm) => void;
}

const marks: Marks = {
  [PlayerForm.E]: (
    <Hidden xsDown={true}>
      <FormArrow form={PlayerForm.E} />
    </Hidden>
  ),
  [PlayerForm.D]: (
    <Hidden xsDown={true}>
      <FormArrow form={PlayerForm.D} />
    </Hidden>
  ),
  [PlayerForm.C]: (
    <Hidden xsDown={true}>
      <FormArrow form={PlayerForm.C} />
    </Hidden>
  ),
  [PlayerForm.B]: (
    <Hidden xsDown={true}>
      <FormArrow form={PlayerForm.B} />
    </Hidden>
  ),
  [PlayerForm.A]: (
    <Hidden xsDown={true}>
      <FormArrow form={PlayerForm.A} />
    </Hidden>
  )
};

export const FormSlider = pure<Props>(({ value, onChange }) => {
  const handleChange = (form: PlayerForm) => onChange && onChange(form);

  const reset = () => onChange && onChange(DEFAULT_PLAYER_FORM);

  return (
    <Container>
      <Slider
        value={value}
        min={PlayerForm.E}
        max={PlayerForm.A}
        defaultValue={PlayerForm.C}
        onChange={handleChange}
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
