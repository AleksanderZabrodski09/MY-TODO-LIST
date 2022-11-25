import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType} from './App';

type TodoListType = {
  title: string
  tasks: TaskType[]
  removeTask: (id: string) => void
  changeFilter: (value: FilterValueType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, value: boolean) => void
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
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone}
                     onChange={(e) => OnChangeStatusHandler(t.id, e.currentTarget.checked)}

              />
              <span>{t.title}</span>
              <button onClick={() => removeTaskHandler(t.id)}>✖</button>
            </li>
          )
        })
        }
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}