import { createStore, applyMiddleware, Middleware, Reducer } from 'redux';
import { AuthAction, AuthState } from './modules/auth/types';
import { PlaylistsAction, PlaylistsState } from './modules/playlists/types';
import { PersistState } from 'redux-persist';

export interface StoreState {
  _persist: PersistState;
  auth: AuthState;
  playlists: PlaylistsState;
}

export type StoreAction = AuthAction & PlaylistsAction;

export default (
  reducers: Reducer<StoreState, StoreAction>,
  middlewares: Middleware[]
) => {
  const enhancer = applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};
