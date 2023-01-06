import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectTaskAction } from '../../slices/userSlice';
import { AppDispatch } from '../../store';
import { TaskState } from '../../types/task';
import { BsTrash } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { asyncDeleteTask } from '../../lib/task';

type Props = {
  task: TaskState;
};

export const TaskItem = (props: Props) => {
  const { task } = props;
  const dispatch = useDispatch<AppDispatch>();
  return (
    <li className="listItem">
      <span className="cursor" onClick={() => dispatch(setSelectTaskAction(task))}>
        {task.title}
      </span>
      <div>
        <button onClick={() => dispatch(asyncDeleteTask(task.id!))} className="taskIcon">
          <BsTrash />
        </button>

        <button className="taskIcon">
          <FaEdit />
        </button>
      </div>
    </li>
  );
};
