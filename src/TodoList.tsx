import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType} from './App';

type TodoListType = {
  todolistId:string
  title: string
  tasks: TaskType[]
  removeTask: (todolistId:string, taskId: string) => void
  changeFilter: (todolistId:string,value: FilterValueType) => void
  addTask: (todolistId:string,title: string) => void
  changeTaskStatus: (todolistId:string,taskId: string, value: boolean) => void
  filter: FilterValueType
  removeTodolist:(todolistId:string)=>void
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}


export const TodoList = (props: TodoListType) => {

  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const addTaskHandler = () => {
    if (title.trim() !== '') {
      props.addTask(props.todolistId ,title.trim())
      setTitle('')

    } else {
      setError('Title is required')
    }
  }
  const removeTaskHandler = (tlID: string,tID: string) => {
    props.removeTask(tlID,tID)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === 'Enter') {
      addTaskHandler()
    }
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }


  const onAllClickHandler = () => {
    props.changeFilter(props.todolistId,'all')
  }
  const onActiveClickHandler = () => {
    props.changeFilter(props.todolistId,'active')
  }
  const onCompletedClickHandler = () => {
    props.changeFilter(props.todolistId,'completed')
  }
  const OnChangeStatusHandler = (tlID: string,taskID: string, eValue: boolean) => {
    props.changeTaskStatus(tlID,taskID, eValue)
  }
const removeTodolistHandler=()=>{
    props.removeTodolist(props.todolistId)
}

  return (
    <div>
      <h3>{props.title}
        <button onClick={removeTodolistHandler}>✖</button>
      </h3>
      <div>
        <input
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          className={error ? 'error' : ''}
        />
        <button onClick={addTaskHandler}>+</button>
        {error && <div className={'errorMessage'}>{error}</div>}

      </div>
      <ul>
        {props.tasks.map((t) => {

          return (
            <li key={t.id} className={t.isDone ? 'completed' : ''}>
              <input type="checkbox" checked={t.isDone}
                     onChange={(e) => OnChangeStatusHandler(props.todolistId,t.id, e.currentTarget.checked)}
              />
              <span  >{t.title}</span>
              <button
                onClick={() => removeTaskHandler(props.todolistId,t.id)}
              >✖</button>
            </li>
          )
        })
        }
      </ul>
      <div>
        <button onClick={onAllClickHandler} className={props.filter === 'all' ? 'activeFilter' : 'buttonFilter'}>All</button>
        <button onClick={onActiveClickHandler} className={props.filter === 'active' ? 'activeFilter' : 'buttonFilter'}>Active
        </button>
        <button onClick={onCompletedClickHandler}
                className={props.filter === 'completed' ? 'activeFilter' : 'buttonFilter'}>Completed
        </button>
      </div>
    </div>
  )
}