import { combineReducers } from 'redux';

import { StoreState } from '../createStore';

import auth from './auth/reducer';
import playlists from './playlists/reducer';

export default combineReducers<StoreState>({
  auth,
  playlists,
  _persist: (state: any = null) => state,
});
