import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import auth from '../slices/AuthSlice/index.ts';
import appConfig from '../slices/ConfigSlice/index.ts';
import role from '../slices/RoleSlice/index.ts';
import user from '../slices/UserSlice/index.ts';
import materi from '../slices/MateriSlice/index.ts';
import forum from '../slices/ForumSlice/index.ts';
import product from '../slices/ProductSlice/index.ts';
import sale from '../slices/SaleSlice/index.ts';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['menu', 'appConfig', 'tracking', 'auth'],
};

const reduers = combineReducers({
  auth,
  appConfig,
  role,
  user,
  materi,
  forum,
  product,
  sale,
});

const persistedReducer = persistReducer(persistConfig, reduers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
});

const persistor = persistStore(store);
export { persistor };
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
