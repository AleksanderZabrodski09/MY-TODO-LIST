import {CheckBox} from './components/CheckBox';
import {EditableSpan} from './EditableSpan';
import React from 'react';
import {TaskType} from './TodoList';
import {Button} from '@mui/material';
// import {Delete} from '@mui/icons-material';
import BackspaceIcon from '@mui/icons-material/Backspace';

type TaskPropsType = {
  task: TaskType
  removeTask: (taskId: string) => void
  changeTaskStatus: (taskId: string, value: boolean) => void
  changeTaskTitle: (taskId: string, title: string) => void
}
export const Task = ({task, removeTask, changeTaskStatus, changeTaskTitle}: TaskPropsType) => {
  return <div className={task.isDone ? 'isDoneTask' : ''}>
    <CheckBox
      checked={task.isDone}
      callBack={(value) => changeTaskStatus(task.id, value)}/>
    <EditableSpan
      value={task.title}
      callBack={(title) => changeTaskTitle(task.id, title)}/>
    <Button
      onClick={() => removeTask(task.id)}>
      {/*✖*/}
      <BackspaceIcon/>
    </Button>
  </div>
}

//npm install @mui/material @emotion/react @emotion/styled
//yarn add @mui/material @emotion/react @emotion/styled yarn add @mui/icons-material