import { store } from '../store';

export function getSpotifyAccessToken() {
  return store.getState().auth.access_token;
}

export function getSpotifyAccessTokenType() {
  return store.getState().auth.token_type;
}