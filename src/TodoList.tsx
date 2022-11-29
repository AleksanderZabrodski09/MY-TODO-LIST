import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from './App';
import {CheckBox} from './CheckBox';

type TodoListType = {
  title: string
  task: TaskType[]
  removeTask: (taskId: string) => void
  filterChange: (value: FilterValueType) => void
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


  const addTaskHandler = () => {
    if (title.trim() !== '') {
      props.addTask(title.trim())
      setTitle('')
    }

  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

    if (e.key === "Enter") {
      addTaskHandler();
    }
  }
  const removeTaskHeader = (tID: string) => {
    props.removeTask(tID)
  }
  const onAllClickHandler = () => {
    props.filterChange('all')
  }
  const onActiveClickHandler = () => {
    props.filterChange('active')
  }
  const onCompletedClickHandler = () => {
    props.filterChange('completed')
  }

  const changeTaskStatusHandler = (tID: string, eValue: boolean) => {
    props.changeTaskStatus(tID, eValue)
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onChangeTitleHandler}
          onKeyPress={onKeyPressHandler}
        />

        <button onClick={addTaskHandler}>+</button>

      </div>
      <ul>
        {props.task.map(el => {
            return (
              <li key={el.id}>
                <CheckBox checked={el.isDone} callBack={(value: boolean) => changeTaskStatusHandler(el.id, value)}/>
                {/*<input type="checkbox" checked={el.isDone} onChange={(e)=>changeTaskStatusHandler(el.id, e.currentTarget.checked)}/>*/}
                <span>{el.title}</span>
                <button onClick={() => removeTaskHeader(el.id)}>✖</button>
              </li>)
          }
        )
        }

      </ul>
      <div>
        <button onClick={onAllClickHandler}>All
        </button>
        <button onClick={onActiveClickHandler}>Active
        </button>
        <button onClick={onCompletedClickHandler}>Completed
        </button>
      </div>
    </div>
  )
}

