import createSagaMiddleware from 'redux-saga';
import { AnyAction, Middleware, Store } from 'redux';
import { persistStore } from 'redux-persist';

import createStore from './createStore';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import persistReducers from './persistReducers';

const sagaMiddleware = createSagaMiddleware();

const middlewares: Middleware[] = [sagaMiddleware];

const store = createStore(persistReducers(rootReducer), middlewares);
const persistor = persistStore(store as unknown as Store<any, AnyAction>);

sagaMiddleware.run(rootSaga);

export { store, persistor };
