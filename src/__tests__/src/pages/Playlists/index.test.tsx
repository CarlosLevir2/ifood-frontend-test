import React from 'react';
import { render } from '@testing-library/react';
import Playlists from '../../../../pages/Playlists';
import { Provider } from 'react-redux';
import { store } from '../../../../store'

describe('[PAGE]: Playlists', () => {
  it('It should be render Playlists page', () => {
    const { container } = render(
      <Provider store={store}>
        <Playlists />
      </Provider>);
    expect(container).toMatchSnapshot();
  });
});
