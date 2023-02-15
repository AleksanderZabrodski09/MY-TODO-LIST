import {CheckBox} from './CheckBox';
import {EditableSpan} from './EditableSpan';
import React, {memo} from 'react';
import {Button} from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import {TaskStatuses, TaskType} from '../api/todolist-api';

type TaskPropsType = {
  task: TaskType
  removeTask: (taskId: string) => void
  changeTaskStatus: (taskId: string, value: TaskStatuses) => void
  changeTaskTitle: (taskId: string, title: string) => void
}
export const Task = memo(({task, removeTask, changeTaskStatus, changeTaskTitle}: TaskPropsType) => {
  console.log("Task")
  return <div className={task.status ? 'isDoneTask' : ''}>
    <CheckBox
      checked={task.status === TaskStatuses.Completed}
      callBack={(value) => changeTaskStatus(task.id, value ? TaskStatuses.Completed: TaskStatuses.New)}/>
    <EditableSpan
      value={task.title}
      callBack={(title) => changeTaskTitle(task.id, title)}/>
    <Button
      onClick={() => removeTask(task.id)}>
      {/*✖*/}
      <BackspaceIcon/>
    </Button>
  </div>
})

//npm install @mui/material @emotion/react @emotion/styled
//yarn add @mui/material @emotion/react @emotion/styled yarn add @mui/icons-material