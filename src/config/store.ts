import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';
import { createLogger } from 'redux-logger';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/es/storage';
import api from './api';
import rootReducerMapObject from './reducers';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['app'],
  blacklist: [api.reducerPath],
};

export const rootReducer = persistReducer(
  rootPersistConfig,
  combineReducers({
    ...rootReducerMapObject,
  })
);
export type RootState = ReturnType<typeof rootReducer>;

const logger = createLogger();
export const setupStore = (preloadedState?: RootState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these field paths in all actions.
          // This is included because some fields in the axios responses are
          // non-serializable.
          // 'meta.baseQueryMeta' is for RTK Query.
          ignoredActionPaths: [
            'payload.headers',
            'payload.config',
            'payload.request',
            'error',
            'meta.arg',
            'meta.baseQueryMeta',
          ],
          // The `redux-persist` actions also have to be ignored, see
          // https://github.com/rt2zz/redux-persist/issues/988.
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware, logger),
  });

export const store = setupStore();
export const persistor = persistStore(store);
setupListeners(store.dispatch);

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;

export const getStore = () => store;
