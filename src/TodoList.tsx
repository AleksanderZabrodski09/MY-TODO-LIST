import React from 'react';

type TodoListType = {
  title: string
  tasks: TaskType[]
  removeTask: (id: number) => void
}

type TaskType = {
  id: number
  title: string
  isDone: boolean
}


export const TodoList = (props: TodoListType) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map((el) => {
          return (
            <li key={el.id}>
              <input type="checkbox" checked={el.isDone}/>
              <span>{el.title}</span>
              <button onClick={() => {props.removeTask(el.id)}}>✖</button>
            </li>
          )
        })
        }
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}