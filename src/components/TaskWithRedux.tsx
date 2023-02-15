import {CheckBox} from './CheckBox';
import {EditableSpan} from './EditableSpan';
import React, {memo} from 'react';
import {Button} from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../state/tasks-reducer';
import {TaskStatuses, TaskType} from '../api/todolist-api';


type TaskPropsType = {
  task: TaskType
  todolistId: string
}
export const TaskWithRedux = memo(({task, todolistId}: TaskPropsType) => {

  const dispatch = useDispatch()

  const {id, title, status} = task

  return <div className={status ? 'isDoneTask' : ''}>
    <CheckBox
      checked={status === TaskStatuses.Completed}
      callBack={(value) => dispatch(changeTaskStatusAC(todolistId, id,  value ? TaskStatuses.Completed : TaskStatuses.New))}/>
    <EditableSpan
      value={title}
      callBack={(title) => dispatch(changeTaskTitleAC(todolistId, id, title))}/>
    <Button
      onClick={() => dispatch(removeTaskAC(todolistId, id))}>
      {/*✖*/}
      <BackspaceIcon/>
    </Button>
  </div>
})

