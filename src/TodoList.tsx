import React from 'react';
import {FilterValueType} from './App';
import {InputForm} from './components/InputForm';
import {EditableSpan} from './EditableSpan';
import {Task} from './Task';

type TodoListType = {
  todolistId: string
  title: string
  task: TaskType[]
  removeTask: (todolistId: string, taskId: string) => void
  filter: FilterValueType
  addTask: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, value: boolean) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  filterChange: (todolistId: string, value: FilterValueType) => void
  removeTodolist: (todolistId: string) => void

}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}


export const TodoList = (props: TodoListType) => {


  const addTask = (title: string) => {
    props.addTask(props.todolistId, title)
  }

  const removeTaskHeader = (tID: string) => {
    props.removeTask(props.todolistId, tID)
  }
  const changeTaskStatusHandler = (tID: string, eValue: boolean) => {
    props.changeTaskStatus(props.todolistId, tID, eValue)
  }

  const onAllClickHandler = () => {
    props.filterChange(props.todolistId, 'all')
  }
  const onActiveClickHandler = () => {
    props.filterChange(props.todolistId, 'active')
  }
  const onCompletedClickHandler = () => {
    props.filterChange(props.todolistId, 'completed')
  }


  const changeTaskTitle = (tID: string, title: string) => {
    props.changeTaskTitle(props.todolistId, tID, title)
  }
  const removeTodolistHandler = () => {
    props.removeTodolist(props.todolistId)
  }

  return (
    <div>
      <h3>
        <EditableSpan value={props.title} callBack={(title) => changeTaskTitle(props.todolistId, title)}/>
        <button onClick={removeTodolistHandler}>✖</button>
      </h3>
      <div>
        <InputForm addItem={addTask}/>
      </div>
      <div>
        {
          props.task.map(el => {
            return (
              <Task
                key={el.id}
                task={el}
                changeTaskStatus={changeTaskStatusHandler}
                changeTaskTitle={changeTaskTitle}
                removeTask={removeTaskHeader}
              />
              // <li key={el.id}>
              //   <CheckBox checked={el.isDone} callBack={(value: boolean) => changeTaskStatusHandler(el.id, value)}/>
              //   <EditableSpan value={el.title} callBack={(title)=>changeTaskTitle(el.id,title)}/>
              //   <button onClick={() => removeTaskHeader(el.id)}>✖</button>
              // </li>
            )
          })}
      </div>
      <div>
        <button onClick={onAllClickHandler} className={props.filter === 'all' ? 'activeFilter' : 'buttonFilter'}>All
        </button>
        <button onClick={onActiveClickHandler}
                className={props.filter === 'active' ? 'activeFilter' : 'buttonFilter'}>Active
        </button>
        <button onClick={onCompletedClickHandler}
                className={props.filter === 'completed' ? 'activeFilter' : 'buttonFilter'}>Completed
        </button>
      </div>
    </div>
  )
}


