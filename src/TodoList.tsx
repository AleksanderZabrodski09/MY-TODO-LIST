import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType} from './App';

type TodoListType = {
  todolistId:string
  title: string
  tasks: TaskType[]
  removeTask: (id: string) => void
  changeFilter: (value: FilterValueType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, value: boolean) => void
  filter: FilterValueType
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
      props.addTask(title.trim())
      setTitle('')

    } else {
      setError('Title is required')
    }
  }
  const removeTaskHandler = (tID: string) => {
    props.removeTask(tID)
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
    props.changeFilter('all')
  }
  const onActiveClickHandler = () => {
    props.changeFilter('active')
  }
  const onCompletedClickHandler = () => {
    props.changeFilter('completed')
  }
  const OnChangeStatusHandler = (taskID: string, eValue: boolean) => {
    props.changeTaskStatus(taskID, eValue)
  }


  return (
    <div>
      <h3>{props.title}</h3>
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
                     onChange={(e) => OnChangeStatusHandler(t.id, e.currentTarget.checked)}
              />
              <span  >{t.title}</span>
              <button onClick={() => removeTaskHandler(t.id)} className={'buttonFilter'}>✖</button>
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