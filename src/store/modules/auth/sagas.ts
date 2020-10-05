import { takeLatest, put, all } from 'redux-saga/effects';
import queryString from 'query-string';
import history from '../../../services/history';
import { signInSuccess } from './actions';
import { notification } from 'antd';

export function signIn() {
  try {
    if (process.env.REACT_APP_SPOTIFY_AUTHENTICATION_URL) {
      return window.location.assign(
        `${
          process.env.REACT_APP_SPOTIFY_AUTHENTICATION_URL
        }?${queryString.stringify({
          response_type: 'token',
          client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
          redirect_uri: `${process.env.REACT_APP_PUBLIC_URL}/callback`,
        })}`
      );
    }
  } catch (err) {
    notification.error({
      message: 'Oh não, algum erro aconteceu.',
      description: 'Nós pedimos desculpas.',
    });
  }
}

export function* signInCallback() {
  try {
    const { error } = queryString.parse(
      history.location.search,
    );

    if (error) {
      throw new Error('');
    }

    const { access_token, expires_in, token_type } = queryString.parse(
      history.location.hash
    );

    yield put(
      signInSuccess({
        access_token: String(access_token),
        expires_in: Number(expires_in),
        token_type: String(token_type),
      })
    );

    const location = {
      pathname: '/playlists',
      hash: '',
    }

    history.push(location);
  } catch (err) {
    history.push('/');
    notification.error({
      message: 'Oh não, algum erro aconteceu.',
      description: 'Por favor, realize o login novamente.',
    });
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_IN_CALLBACK', signInCallback),
]);
