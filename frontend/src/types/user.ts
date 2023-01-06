import { TaskState } from './task';

export type UserState = {
  uid: number | null;
  username: string;
  isSignedIn: boolean;
  selectTask: TaskState;
};
