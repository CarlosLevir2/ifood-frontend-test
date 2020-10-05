import React from 'react';
import { render } from '@testing-library/react';
import SignIn from '../../../../pages/SignIn';
import { Provider } from 'react-redux';
import { store } from '../../../../store'

describe('[PAGE]: SignIn', () => {
  it('It should be render SignIn page', () => {
    const { container } = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
