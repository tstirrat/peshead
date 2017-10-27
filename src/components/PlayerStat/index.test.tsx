import * as React from 'react';
import { render } from 'react-dom';
import { PlayerStat } from './index';

it('displays [value] inside a .stat element', () => {
  const div = document.createElement('div');
  render(
    <PlayerStat value={10} />,
    div);
  expect(div.querySelector('.stat')!.textContent).toBe('10');
});
