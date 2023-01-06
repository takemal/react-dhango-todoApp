import { Action, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { fetchEndAction, fetchStartAction } from '../slices/fetchStateSlice';
import { setUserInfoAction } from '../slices/userSlice';
import { RootState } from '../store';
import { myselfURL } from '../urls';
const cookies = new Cookies();

// ユーザ情報取得
export const asyncGetUserInfo = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('ユーザ情報取得中'));
    await axios
      .get(myselfURL, {
        headers: {
          Authorization: `JWT ${cookies.get('Token')}`,
        },
      })
      .then((res) => {
        dispatch(setUserInfoAction(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
    dispatch(fetchEndAction());
  };
};
