import * as React from 'react';
import { render } from 'react-dom';

import { Loading } from '.';

describe('<Loading>', () => {
  it('displays spinner when [when] is true', () => {
    const div = document.createElement('div');
    render(
      <Loading when={true} render={() => <div className="child" />} />,
      div
    );
    expect(div.querySelector('[role=progressbar]')).not.toBeNull();
  });

  it('does not display children when [when] is true', () => {
    const div = document.createElement('div');
    render(
      <Loading when={true} render={() => <div className="child" />} />,
      div
    );
    expect(div.querySelector('.child')).toBeNull();
  });

  it('displays children when [when] is false', () => {
    const div = document.createElement('div');
    render(
      <Loading when={false} render={() => <div className="child" />} />,
      div
    );
    expect(div.querySelector('.child')).not.toBeNull();
  });

  it('displays error message when [error] is defined', () => {
    const div = document.createElement('div');
    const err = new Error('Unable to do things');
    render(
      <Loading
        when={false}
        error={err}
        render={() => <div className="child" />}
      />,
      div
    );
    expect(div.querySelector('p')!.textContent).toBe('Unable to do things');
  });

  it('does not display children when [error] is defined', () => {
    const div = document.createElement('div');
    const err = new Error('Unable to do things');
    render(
      <Loading
        when={false}
        error={err}
        render={() => <div className="child" />}
      />,
      div
    );
    expect(div.querySelector('.child')).toBeNull();
  });
});
