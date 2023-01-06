import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { UserState } from '../types/user';

// ユーザー情報の初期化
export const initialUserState: UserState = {
  uid: null,
  isSignedIn: false,
  username: '',
  selectTask: {
    id: null,
    title: '',
    created_at: null,
    updated_at: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    // ログイン
    loginAction: (state) => {
      state.isSignedIn = true;
    },
    // ログアウト
    logoutAction: (state) => {
      return initialUserState;
    },
    // ユーザ情報
    setUserInfoAction: (state, action) => {
      return { ...state, uid: action.payload.id, username: action.payload.username };
    },
    setSelectTaskAction: (state, action) => {
      state.selectTask = action.payload;
    },
    resetSelectTaskAction: (state) => {
      state.selectTask = initialUserState.selectTask;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { loginAction, logoutAction, setUserInfoAction, setSelectTaskAction, resetSelectTaskAction } =
  userSlice.actions;

// state情報をそのままとる
export const selectUser = (state: RootState) => state.user;
