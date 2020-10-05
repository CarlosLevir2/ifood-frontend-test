import { AuthAction } from '../auth/types';
import { normalizeFilters } from './adapter';
import { PlaylistsState, PlaylistsAction, TypedFilters } from './types';

const initialState: PlaylistsState = {
  playlists: null,
  filters: null,
  fetchPlaylistsStatus: 'notFetched',
};

export default function playlists(
  state = initialState,
  action: PlaylistsAction | AuthAction
): PlaylistsState {
  switch (action.type) {
    case '@playlists/GET_PLAYLISTS_REQUEST':
      return {
        ...state,
        fetchPlaylistsStatus: 'fetching',
      }
    case '@playlists/GET_PLAYLISTS_FAILURE':
      return {
        ...state,
        fetchPlaylistsStatus: 'error',
      }
    case '@playlists/GET_PLAYLISTS_SUCCESS':
      return {
        ...state,
        playlists: action.payload.playlists,
        filters: {
          selectFilters: normalizeFilters(action.payload.filters),
          typedFilters: action.payload.filters.filter(
            (filter) => filter.values === undefined
          ) as TypedFilters[],
        },
        fetchPlaylistsStatus: 'fetched',
      };
    case '@auth/SIGN_OUT':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
