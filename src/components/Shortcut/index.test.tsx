import * as React from 'react';
import { render } from 'react-dom';

import { Shortcut } from '.';

const mockMousetrap = {
  bind: jest.fn(),
  unbind: jest.fn()
};

jest.mock('mousetrap', () => mockMousetrap);

describe.skip('<Shortcut>', () => {
  const noop = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('binds the supplied key', () => {
    const div = document.createElement('div');
    render(<Shortcut keys="ctrl+s" handler={noop} />, div);
    expect(mockMousetrap.bind).toHaveBeenCalledWith('ctrl+s', noop);
  });

  it('binds the supplied handler', () => {
    const div = document.createElement('div');
    render(<Shortcut keys="ctrl+s" handler={noop} />, div);
    expect(mockMousetrap.bind).toHaveBeenCalledWith('ctrl+s', noop);
  });

  it('passes the supplied eventType', () => {
    const div = document.createElement('div');
    render(<Shortcut keys="ctrl+s" handler={noop} event="keyup" />, div);
    expect(mockMousetrap.bind).toHaveBeenCalledWith('ctrl+s', noop, 'keyup');
  });
});
