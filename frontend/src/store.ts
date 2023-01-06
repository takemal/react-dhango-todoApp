import { tasksReducer } from './slices/tasksSlice';
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { fetchStateReducer } from './slices/fetchStateSlice';
import { userReducer } from './slices/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// 永続化の設定
const persistConfig = {
  key: 'root', // Storageに保存されるキー名を指定する
  storage, // 保存先としてlocalStorageがここで設定される
};

const reducers = combineReducers({
  user: userReducer,
  fetchState: fetchStateReducer,
  tasks: tasksReducer,
});

// 永続化設定されたReducerとして定義
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  // シリアライズチェック外し(場合による
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Stateの型定義
export type RootState = ReturnType<typeof store.getState>;

// dispatch設定
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export const persistor = persistStore(store);
