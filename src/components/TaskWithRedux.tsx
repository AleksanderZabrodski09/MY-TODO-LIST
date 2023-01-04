import {CheckBox} from './CheckBox';
import {EditableSpan} from './EditableSpan';
import React, {memo} from 'react';
import {TaskType} from '../TodoList';
import {Button} from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../state/tasks-reducer';


type TaskPropsType = {
  task: TaskType
  todolistId: string
}
export const TaskWithRedux = memo(({task, todolistId}: TaskPropsType) => {

  const dispatch = useDispatch()

  const {id, title, isDone} = task

  return <div className={isDone ? 'isDoneTask' : ''}>
    <CheckBox
      checked={isDone}
      callBack={(value) => dispatch(changeTaskStatusAC(todolistId,id, value))}/>
    <EditableSpan
      value={title}
      callBack={(title) => dispatch(changeTaskTitleAC(todolistId,id, title))}/>
    <Button
      onClick={() => dispatch(removeTaskAC(todolistId,id))}>
      {/*✖*/}
      <BackspaceIcon/>
    </Button>
  </div>
})

