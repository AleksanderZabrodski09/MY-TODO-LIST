import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from './App';
import {CheckBox} from './components/CheckBox';

type TodoListType = {
  todolistId:string
  title: string
  task: TaskType[]
  removeTask: (todolistId:string,taskId: string) => void
  filterChange: (todolistId:string,value: FilterValueType) => void
  filter: FilterValueType
  addTask: (todolistId:string,title: string) => void
  changeTaskStatus: (todolistId:string,taskId: string, value: boolean) => void
}

type TaskType = {
  id: string
  title: string
  isDone: boolean
}


export const TodoList = (props: TodoListType) => {

  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const addTaskHandler = () => {
    if (title.trim() !== '') {
      props.addTask(props.todolistId,title.trim())
      setTitle('')
    } else {
      setError('Title is required')
    }

  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError( null)
    if (e.key === "Enter") {
      addTaskHandler();
    }
  }
  const removeTaskHeader = (tID: string) => {
    props.removeTask(props.todolistId,tID)
  }
  const onAllClickHandler = () => {
    props.filterChange(props.todolistId, 'all')
  }
  const onActiveClickHandler = () => {
    props.filterChange(props.todolistId, 'active')
  }
  const onCompletedClickHandler = () => {
    props.filterChange(props.todolistId,'completed')
  }

  const changeTaskStatusHandler = (tID: string, eValue: boolean) => {
    props.changeTaskStatus(props.todolistId,tID, eValue)
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onChangeTitleHandler}
          onKeyPress={onKeyPressHandler}
          className={error ? 'error' : ''}
        />
        <button onClick={addTaskHandler}>+</button>
        {error && <div className='errorMessage'>{error}</div>}

      </div>
      <ul>
        {props.task.map(el => {
            return (
              <li key={el.id}>
                <CheckBox checked={el.isDone} callBack={(value: boolean) => changeTaskStatusHandler(el.id, value)}/>

                <span>{el.title}</span>
                <button onClick={() => removeTaskHeader(el.id)}>✖</button>
              </li>)
          }
        )
        }

      </ul>
      <div>
        <button onClick={onAllClickHandler} className={props.filter==='all'? 'activeFilter' : 'buttonFilter'}>All
        </button>
        <button onClick={onActiveClickHandler} className={props.filter==='active'? 'activeFilter' : 'buttonFilter'}>Active
        </button>
        <button onClick={onCompletedClickHandler} className={props.filter==='completed'? 'activeFilter' : 'buttonFilter'}>Completed
        </button>
      </div>
    </div>
  )
}

