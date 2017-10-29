import * as React from 'react';
import { render } from 'react-dom';
import { Loading } from './index';

describe('<Loading>', () => {

  it('displays spinner', () => {
    const div = document.createElement('div');
    render(
      <Loading />,
      div);
    expect(div.querySelector('[role=progressbar]')).toBeDefined();
  });

});
