import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { Reducer } from 'redux';
import { StoreAction, StoreState } from './createStore';

export default (reducers: Reducer<StoreState, StoreAction>) => {
  const persistedReducer = persistReducer(
    {
      key: 'spotifood',
      storage,
      whitelist: ['auth', 'playlists'],
    },
    reducers
  );

  return persistedReducer;
};
