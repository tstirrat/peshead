import * as React from 'react';
import { render } from 'react-dom';

import { Actions, Home, ViewModel } from '.';
import { StaticRouter } from '../../__test__';
import { i18nTest } from '../../configureI18n';
import { I18nextProvider } from 'react-i18next';

const props: ViewModel & Actions = {
  results: [],
  isLoading: false,
  search: jasmine.createSpy('search'),
  dispatch: jasmine.createSpy('dispatch')
};

describe('<Home>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(
      <StaticRouter>
        <I18nextProvider i18n={i18nTest}>
          <Home {...props} />
        </I18nextProvider>
      </StaticRouter>,
      div
    );
  });
});
