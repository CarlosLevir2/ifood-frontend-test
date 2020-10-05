import axios from 'axios';
import { getSpotifyAccessToken, getSpotifyAccessTokenType } from './store';

export const localesBaseApi = axios.create({
  baseURL: process.env.REACT_APP_LOCALES_API_URL,
});

export const spotifyBaseApi = axios.create({
  baseURL: process.env.REACT_APP_SPOTIFY_API_URL,
});

spotifyBaseApi.interceptors.request.use(function (config) {
  config.headers.Authorization =  `${getSpotifyAccessTokenType()} ${getSpotifyAccessToken()}}`;

  return config;
});