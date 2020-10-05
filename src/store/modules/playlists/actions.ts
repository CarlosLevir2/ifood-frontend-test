import { action } from 'typesafe-actions';
import { Playlists, FiltersDTO, FiltersState } from './types';

export function getPlaylistsRequest({ filters }: { filters: FiltersState }) {
  return action('@playlists/GET_PLAYLISTS_REQUEST', {
    filters,
  });
}

export function getPlaylistsSuccess({ playlists, filters }: { playlists: Playlists, filters: FiltersDTO }) {
  return action('@playlists/GET_PLAYLISTS_SUCCESS', {
    playlists,
    filters,
  });
}

export function getPlaylistsFailure() {
  return action('@playlists/GET_PLAYLISTS_FAILURE');
}
