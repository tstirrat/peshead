import * as React from 'react';
import { render } from 'react-dom';

import { LevelSlider } from '.';
import { PlayerForm } from '../../shared/utils/player';

describe('<LevelSlider>', () => {
  const onChange = jest.fn();

  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(
      <LevelSlider value={PlayerForm.A} onChange={onChange} max={75} />,
      div
    );
  });
});
