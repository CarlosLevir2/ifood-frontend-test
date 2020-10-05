import reducer from '../../../../../store/modules/playlists/reducer';
import { FetchStatus } from '../../../../../store/modules/playlists/types';

describe('[REDUCER]: Playlists', () => {
  it('It should change fetchStatus when call action with type @playlists/GET_PLAYLISTS_REQUEST', () => {
    const previousState = {
      playlists: null,
      filters: null,
      fetchPlaylistsStatus: 'notFetched' as FetchStatus,
    };

    const payload = {
      filters: {
        offset: 0,
        limit: 20,
      },
    };

    const expectedState = {
      fetchPlaylistsStatus: 'fetching',
      filters: null,
      playlists: null,
    };

    const state = reducer(previousState, {
      type: '@playlists/GET_PLAYLISTS_REQUEST',
      payload,
    });

    expect(state).toEqual(expectedState);
  });

  it('It should add auth values when call action with type @playlists/GET_PLAYLISTS_SUCCESS', () => {
    const previousState = {
      playlists: null,
      filters: null,
      fetchPlaylistsStatus: 'fetched' as FetchStatus,
    };

    const payload = {
      playlists: {
        message: 'Playlist Set Title',
        playlists: {
          items: [],
          limit: 20,
          next: null,
          offset: 0,
          previous: null,
          total: 20,
        },
      },
      filters: [
        {
          id: '1',
          name: 'locale',
          validation: {
            primitiveType: 'INTEGER',
          },
        },
      ],
      fetchPlaylistsStatus: 'fetched' as FetchStatus,
    };

    const expectedState = {
      playlists: {
        message: 'Playlist Set Title',
        playlists: {
          items: [],
          limit: 20,
          next: null,
          offset: 0,
          previous: null,
          total: 20,
        },
      },
      filters: {
        typedFilters: [
          {
            id: '1',
            name: 'locale',
            validation: {
              primitiveType: 'INTEGER',
            },
          },
        ],
        selectFilters: [],
      },
      fetchPlaylistsStatus: 'fetched' as FetchStatus,
    };

    const state = reducer(previousState, {
      type: '@playlists/GET_PLAYLISTS_SUCCESS',
      payload,
    });

    expect(state).toEqual(expectedState);
  });

  it('It should clean auth values when call action with type @auth/SIGN_OUT', () => {
    const initialState = {
      playlists: null,
      filters: null,
      fetchPlaylistsStatus: 'notFetched',
    };

    const previousState = {
      playlists: {
        message: 'Playlist Set Title',
        playlists: {
          items: [],
          limit: 20,
          next: null,
          offset: 0,
          previous: null,
          total: 20,
        },
      },
      filters: {
        typedFilters: [
          {
            id: '1',
            name: 'locale',
            validation: {
              primitiveType: 'INTEGER',
            },
          },
        ],
        selectFilters: [],
      },
      fetchPlaylistsStatus: 'fetched' as FetchStatus,
    };

    const state = reducer(previousState, { type: '@auth/SIGN_OUT' });

    expect(state).toEqual(initialState);
  });
});
