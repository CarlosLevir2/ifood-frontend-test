import { takeLatest, call, put, all } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import queryString from 'query-string';
import { notification } from 'antd';

import * as actions from './actions';
import history from '../../../services/history';
import { spotifyBaseApi, localesBaseApi } from '../../../services/api';
import { signOut } from '../auth/actions';

export function* getPlaylistsRequest({
  payload: { filters },
}: ActionType<typeof actions.getPlaylistsRequest>) {
  try {
    const { data: playlists } = yield call(
      spotifyBaseApi.get,
      `/featured-playlists?${queryString.stringify({
        ...filters,
      })}`
    );

    const { data } = yield call(localesBaseApi.get, '');

    yield put(
      actions.getPlaylistsSuccess({ playlists, filters: data.filters })
    );
  } catch (err) {
    if (err.response.status === 401) {
      yield put(signOut());
      history.push('/');

      return notification.error({
        message: 'Oh não, sua sessão expirou.',
        description: 'Por favor, faça login novamente.',
      });
    }

    yield put(actions.getPlaylistsFailure());
    return notification.error({
      message: 'Oh não, um erro inesperado aconteceu.',
      description: 'Nós sentimentos muito por isso.',
    });
  }
}

export default all([
  takeLatest('@playlists/GET_PLAYLISTS_REQUEST', getPlaylistsRequest),
]);
