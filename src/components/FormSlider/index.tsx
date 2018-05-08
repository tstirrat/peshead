import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import * as React from 'react';
import { pure } from 'recompose';

import { DEFAULT_PLAYER_FORM, PlayerForm, PlayerFormValue } from '../../shared/utils/player';

export interface Props {
  value: PlayerForm;
  onChange?: (l: PlayerForm) => void;
}

export const FormSlider = pure<Props>(({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange && onChange(Number(e.target.value));

  const reset = () => onChange && onChange(DEFAULT_PLAYER_FORM);

  return (
    <div>
      <input
        type="range"
        value={value}
        min={PlayerForm.E}
        max={PlayerForm.A}
        onChange={handleChange}
      />{' '}
      {PlayerFormValue[value]}
      <IconButton onClick={reset}>
        <Icon>clear</Icon>
      </IconButton>
    </div>
  );
});
