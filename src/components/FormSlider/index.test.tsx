import * as React from 'react';
import { render } from 'react-dom';

import { FormSlider } from '.';
import { PlayerForm } from '../../shared/utils/player';

describe('<FormSlider>', () => {
  const onChange = jest.fn();

  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<FormSlider value={PlayerForm.A} onChange={onChange} />, div);
  });
});
