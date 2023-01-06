import { PostAuth } from './../types/auth';
import { Action, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { fetchEndAction, fetchStartAction } from '../slices/fetchStateSlice';
import { loginAction, logoutAction, setUserInfoAction } from '../slices/userSlice';
import { RootState } from '../store';
import { authURL, registerURL } from '../urls';

const cookies = new Cookies();

// アカウント登録
export const asyncSignUp = (auth: PostAuth) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('アカウント登録中'));
    await axios
      .post(
        registerURL,
        { username: auth.username, password: auth.password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .catch((e) => {
        console.log(e);
      });
    dispatch(fetchEndAction());
  };
};

// ログイン
export const asyncSignIn = (auth: PostAuth) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(fetchStartAction('ログイン中'));
    await axios
      .post(
        authURL,
        { username: auth.username, password: auth.password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        cookies.set('Token', res.data.access, { path: '/' });
        dispatch(loginAction());
      })
      .catch((e) => {
        console.log(e);
      });
    dispatch(fetchEndAction());
  };
};

export const asyncLogout = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('ログアウト中'));
    cookies.remove('Token');
    dispatch(logoutAction());
    dispatch(fetchEndAction());
  };
};
