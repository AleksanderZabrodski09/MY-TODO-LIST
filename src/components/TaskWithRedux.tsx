import {CheckBox} from './CheckBox';
import {EditableSpan} from './EditableSpan';
import React, {memo} from 'react';
import {Button} from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import {removeTaskTC, updateTaskAC, updateTaskTC} from '../state/tasks-reducer';
import {TaskStatuses, TaskType} from '../api/todolist-api';
import {AppDispatch} from '../state/store';


type TaskPropsType = {
  task: TaskType
  todolistId: string
}
export const TaskWithRedux = memo(({task, todolistId}: TaskPropsType) => {

  const dispatch = AppDispatch()

  const {id, title, status} = task

  return <div className={status ? 'isDoneTask' : ''}>
    <CheckBox
      checked={status === TaskStatuses.Completed}
      callBack={(value) => dispatch(updateTaskTC(todolistId, id, {status:value ? TaskStatuses.Completed : TaskStatuses.New}))}/>
    <EditableSpan
      value={title}
      callBack={(title) => dispatch(updateTaskTC(todolistId, id, {title}))}/>
    <Button
      onClick={() => dispatch(removeTaskTC(todolistId, id))}>
      {/*✖*/}
      <BackspaceIcon/>
    </Button>
  </div>
})

