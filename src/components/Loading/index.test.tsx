import * as React from 'react';
import { render } from 'react-dom';
import { Loading } from './index';

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

  it('displays ErrorPanel when [error] is defined', () => {
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
    expect(div.querySelector('.ErrorPanel')).not.toBeNull();
  });
});
