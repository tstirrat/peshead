import * as React from 'react';
import { render } from 'react-dom';
import { App } from './index';
import { StaticRouter } from 'react-router-dom';

const context = {};

const props = {
  login: jasmine.createSpy('login'),
  logout: jasmine.createSpy('logout'),
  loadSession: jasmine.createSpy('loadSession'),
  dispatch: jasmine.createSpy('dispatch'),
  history: {
    push: jasmine.createSpy('history.push'),
    // tslint:disable-next-line:no-any
  } as any,
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <StaticRouter location="/" context={context}>
      <App {...props} />
    </StaticRouter>,
    div);
});
