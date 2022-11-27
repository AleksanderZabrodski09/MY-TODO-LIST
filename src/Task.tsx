import {CheckBox} from './components/CheckBox';
import {EditableTitle} from './components/EditableTitle';
import React from 'react';
import {TaskType} from './TodoList';

export type TaskPropsType = {
  task: TaskType
  removeTask: (taskId: string) => void
  editTaskTitle: (taskId: string, title: string) => void
  changeTaskStatus: (taskId: string, value: boolean) => void
}
export const Task = (
  {
    task,
    editTaskTitle,
    removeTask,
    changeTaskStatus
  }: TaskPropsType
) => {
  return <li className={task.isDone ? 'completed' : ''}>
    <CheckBox
      checked={task.isDone}
      callBack={(eValue) => changeTaskStatus(task.id, eValue)}/>
    <EditableTitle
      value={task.title}
      callback={(title) => editTaskTitle(task.id, title)}/>
    <button
      onClick={() => removeTask(task.id)}
    >✖
    </button>
  </li>
}


// yarn add @mui/material @emotion/react @emotion/styled @mui/icons-material
//yarn add @mui/material @emotion/react @emotion/styled