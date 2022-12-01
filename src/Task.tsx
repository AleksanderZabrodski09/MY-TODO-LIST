import {CheckBox} from './components/CheckBox';
import {EditableSpan} from './EditableSpan';
import React from 'react';
import {TaskType} from './TodoList';

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
    <button
      onClick={() => removeTask(task.id)}>✖
    </button>
  </div>
}