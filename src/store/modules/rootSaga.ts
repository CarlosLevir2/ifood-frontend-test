import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import playlists from './playlists/sagas';

export default function* rootSaga() {
  return yield all([auth, playlists])
}