import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType} from './App';

type TodoListType = {
  title: string
  tasks: TaskType[]
  removeTask: (id: string) => void
  changeFilter: (value: FilterValueType) => void
  addTask: (title: string) => void
}

type TaskType = {
  id: string
  title: string
  isDone: boolean
}


export const TodoList = (props: TodoListType) => {
  const [title, setTitle] = useState('')
  const addTaskHandler = () => {
    props.addTask(title)
    setTitle('')
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
const removeTaskHandler =(tID:string)=>{
    props.removeTask(tID)
  }
  const onKeyPressHandler =(e: KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==='Enter'){
      addTaskHandler()
    }
  }
  const onChangeHandler =(e:ChangeEvent<HTMLInputElement>)=> {
    setTitle(e.currentTarget.value)
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
        />
        <button onClick={addTaskHandler}>+</button>
      </div>
      <ul>
        {props.tasks.map((el) => {
          return (
            <li key={el.id}>
              <input type="checkbox" checked={el.isDone}/>
              <span>{el.title}</span>
              <button onClick={() => {removeTaskHandler(el.id)}}>✖</button>
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