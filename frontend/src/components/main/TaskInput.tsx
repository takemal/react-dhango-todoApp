import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncCreateTask, asyncUpdateTask } from '../../lib/task';
import { resetSelectTaskAction, selectUser } from '../../slices/userSlice';
import { AppDispatch } from '../../store';
import { OnChange } from '../../types/events';

export const TaskInput = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectTask = useSelector(selectUser).selectTask;
  const [editTitle, setEditTitle] = useState('');

  const isDisabled = editTitle.length === 0;

  const createClicked = () => {
    dispatch(asyncCreateTask({ title: editTitle }));
    setEditTitle('');
  };

  const updateClicked = () => {
    dispatch(asyncUpdateTask(selectTask.id!, { title: editTitle }));
    dispatch(resetSelectTaskAction());
    setEditTitle('');
  };

  useEffect(() => {
    setEditTitle(selectTask.title);
  }, [selectTask]);

  return (
    <div>
      <input
        type="text"
        className="taskInput"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        placeholder="Please ipnut task"
      />
      <div className="switch">
        {selectTask.id === 0 ? (
          <Button variant="contained" disabled={isDisabled} onClick={createClicked} color="primary">
            Create
          </Button>
        ) : (
          <Button variant="contained" disabled={isDisabled} onClick={updateClicked} color="primary">
            Update
          </Button>
        )}
      </div>
    </div>
  );
};
