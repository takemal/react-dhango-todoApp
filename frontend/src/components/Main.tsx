import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncLogout } from '../lib/auth';
import { AppDispatch } from '../store';
import { FaSignInAlt } from 'react-icons/fa';
import { Header } from './main/Header';
import { TaskInput } from './main/TaskInput';
import { TaskList } from './main/TaskList';
import { TaskDetail } from './main/TaskDetail';
import { asyncGetTasks } from '../lib/task';

export const Main = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const logout = async () => {
    await dispatch(asyncLogout());
    navigate('/');
  };

  useEffect(() => {
    dispatch(asyncGetTasks());
  }, []);

  return (
    <div className="containerTasks">
      <div className="appTasks">
        <button onClick={logout} className="signBtn">
          <FaSignInAlt />
        </button>
        <Header />
        <TaskInput />
        <TaskList />
      </div>
      <div className="appDetails">
        <TaskDetail />
      </div>
    </div>
  );
};
