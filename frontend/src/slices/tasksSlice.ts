import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TaskState } from '../types/task';

export const initialTasksState: TaskState[] = [];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialTasksState,
  reducers: {
    // データセット
    setTasksAction: (state, action) => {
      return action.payload;
    },
    // 初期化
    resetTasksAction: (state, action) => {
      return initialTasksState;
    },
    // 配列:追加 (データ)
    addTaskAction: (state, action) => {
      return [...state, action.payload];
    },
    // 配列:更新 (データ)
    updateTaskAction: (state, action) => {
      return state.map((video) => {
        if (video.id === action.payload.id) {
          return action.payload;
        }
        return video;
      });
    },
    // 配列:削除(id)
    deleteTaskAction: (state, action) => {
      return state.filter((video) => video.id !== action.payload);
    },
  },
});

export const tasksReducer = tasksSlice.reducer;
export const { setTasksAction, resetTasksAction, addTaskAction, updateTaskAction, deleteTaskAction } =
  tasksSlice.actions;

// state情報をそのままとる
export const selectTasks = (state: RootState) => state.tasks;
