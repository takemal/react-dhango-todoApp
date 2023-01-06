import React from 'react';
import { useSelector } from 'react-redux';
import { selectTasks } from '../../slices/tasksSlice';
import { TaskItem } from './TaskItem';

export const TaskList = () => {
  const tasks = useSelector(selectTasks);
  return (
    <div>
      <ul className="taskList">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};
