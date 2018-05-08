import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import * as React from 'react';
import { pure } from 'recompose';

import { DEFAULT_PLAYER_LEVEL } from '../../shared/utils/player';

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
    <div>
      <input
        type="range"
        value={value}
        min={1}
        max={max}
        onChange={handleChange}
      />{' '}
      Lv. {value} / {max}
      {/* <Trans>
      </Trans> */}
      <IconButton onClick={reset}>
        <Icon>clear</Icon>
      </IconButton>
    </div>
  );
});
