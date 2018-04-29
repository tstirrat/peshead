import * as React from 'react';
import { render } from 'react-dom';
import { I18nextProvider } from 'react-i18next';

import { Actions, Home, ViewModel } from '.';
import { StaticRouter } from '../../__test__';
import i18n from '../../configureI18n';

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
        <I18nextProvider i18n={i18n}>
          <Home {...props} />
        </I18nextProvider>
      </StaticRouter>,
      div
    );
  });
});
