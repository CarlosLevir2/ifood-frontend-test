import React from 'react';
import { render } from '@testing-library/react';
import Callback from '../../../../pages/Callback';
import { Provider } from 'react-redux';
import { store } from '../../../../store'

describe('[PAGE]: Callback', () => {
  it('It should be render Callback page', () => {
    const { container } = render(
      <Provider store={store}>
        <Callback />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
