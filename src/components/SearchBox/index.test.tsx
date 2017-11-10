import * as React from 'react';
import { render } from 'react-dom';
import { SearchBox, Props } from './index';

const props: Props = {
  onSubmit: jasmine.createSpy('onClick'),
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <SearchBox {...props} />,
    div);
});
