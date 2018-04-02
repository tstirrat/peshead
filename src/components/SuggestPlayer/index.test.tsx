import * as React from 'react';
import { render } from 'react-dom';

import { Props, SuggestPlayer } from '.';

const props: Props = {};

describe('<SuggestPlayer>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<SuggestPlayer {...props} />, div);
  });
});
