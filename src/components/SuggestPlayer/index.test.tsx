import * as React from 'react';
import { render } from 'react-dom';
import { SuggestPlayer, Props } from './index';

const props: Props = {
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <SuggestPlayer {...props} />,
    div);
});
