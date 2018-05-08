import * as React from 'react';
import { render } from 'react-dom';
import { I18nextProvider } from 'react-i18next';

import { PlayerActionMenu } from '.';
import { StaticRouter } from '../../__test__';
import i18n from '../../configureI18n';

describe('<PlayerActionMenu>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(
      <StaticRouter url="/players/1">
        <I18nextProvider i18n={i18n}>
          <PlayerActionMenu onCompare={jest.fn()} />
        </I18nextProvider>
      </StaticRouter>,
      div
    );
  });
});
