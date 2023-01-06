import { tasksURL, taskURL } from './../urls/index';
import { Action, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { fetchEndAction, fetchStartAction } from '../slices/fetchStateSlice';
import { RootState } from '../store';
import { addTaskAction, deleteTaskAction, setTasksAction, updateTaskAction } from '../slices/tasksSlice';
import { PostTask } from '../types/task';
const cookies = new Cookies();

// 全投稿取得
export const asyncGetTasks = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('プロフィール取得中'));
    await axios
      .get(tasksURL, {
        headers: {
          Authorization: `JWT ${cookies.get('Token')}`,
        },
      })
      .then((res) => {
        dispatch(setTasksAction(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
    dispatch(fetchEndAction());
  };
};

// 投稿作成
export const asyncCreateTask = (postData: PostTask) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('プロフィール作成中'));
    await axios
      .post(tasksURL, postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${cookies.get('Token')}`,
        },
      })
      .then((res) => {
        dispatch(addTaskAction(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
    dispatch(fetchEndAction());
  };
};

// 更新
export const asyncUpdateTask = (id: number, postData: PostTask) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('プロフィール更新中'));
    await axios
      .put(taskURL(id), postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${cookies.get('Token')}`,
        },
      })
      .then((res) => {
        console.log('ここまで');
        dispatch(updateTaskAction(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
    dispatch(fetchEndAction());
  };
};

// 投稿削除
export const asyncDeleteTask = (id: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('プロフィール削除中'));
    await axios
      .delete(taskURL(id), {
        headers: {
          Authorization: `JWT ${cookies.get('Token')}`,
        },
      })
      .then((res) => {
        dispatch(deleteTaskAction(id));
      })
      .catch((e) => {
        console.log(e);
      });
    dispatch(fetchEndAction());
  };
};
