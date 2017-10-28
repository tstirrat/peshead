import * as React from 'react';
import { render } from 'react-dom';

import { base } from '../../__test__/fixtures';

import { PlayerBasics } from './index';


it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <PlayerBasics player={base} />,
    div);
});
