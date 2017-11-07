import * as React from 'react';
import { render } from 'react-dom';
import { ErrorPanel } from './index';

describe('<ErrorPanel>', () => {

  const error = new Error('err');

  it('displays a title', () => {
    const div = document.createElement('div');
    render(
      <ErrorPanel error={error} />,
      div);
    const body = div.querySelector('.ErrorPanel-body')!;
    expect(body.querySelector('h2')!.textContent).toBe('An error has occurred');
  });

  it('displays the error.message', () => {
    const div = document.createElement('div');
    render(
      <ErrorPanel error={error} />,
      div);
    const body = div.querySelector('.ErrorPanel-body')!;
    expect(body.querySelector('p')!.textContent).toBe('err');
  });

});
