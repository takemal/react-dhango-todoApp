import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';

export const TaskDetail = () => {
  const selectTask = useSelector(selectUser).selectTask;
  return (
    <div className="details">
      {selectTask.title && (
        <>
          <h2>{selectTask.title}</h2>
          <p>Created at </p>
          <h3>{String(selectTask.created_at!)}</h3>
          <p>Updated at </p>
          <h3>{String(selectTask.updated_at)}</h3>
        </>
      )}
    </div>
  );
};
