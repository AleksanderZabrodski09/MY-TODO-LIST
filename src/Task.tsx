import {CheckBox} from './components/CheckBox';
import {EditableTitle} from './components/EditableTitle';
import React from 'react';
import {TaskType} from './TodoList';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {IconButton} from '@mui/material';


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
  return <div className={task.isDone ? 'completed' : ''}>
    <CheckBox
      checked={task.isDone}
      callBack={(eValue) => changeTaskStatus(task.id, eValue)}/>
    <EditableTitle
      value={task.title}
      callback={(title) => editTaskTitle(task.id, title)}/>
    <IconButton
      onClick={() => removeTask(task.id)}>
      <RemoveCircleOutlineIcon/>
    </IconButton>
    {/*<button*/}
    {/*  onClick={() => removeTask(task.id)}*/}
    {/*>✖*/}
    {/*</button>*/}
  </div>
}


// yarn add @mui/material @emotion/react @emotion/styled @mui/icons-material
//yarn add @mui/material @emotion/react @emotion/styled