import React from 'react';
import {FilterValueType} from './App';

type TodoListType = {
  title:string
  task: TaskType[]
  removeTask:(id:number)=>void
  filterChange: (value:FilterValueType)=>void
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
        {props.task.map((el)=>
          (<li key={el.id}>
            <input type="checkbox" checked={el.isDone}/>
            <span>{el.title}</span>
              <button onClick={()=>props.removeTask(el.id)}>x</button>
          </li>
          ))
        }

      {/*  <li><input type="checkbox" checked={props.task[1].isDone}/> <span>{props.task[1].title}</span></li>*/}
      {/*  <li><input type="checkbox" checked={props.task[2].isDone}/> <span>{props.task[2].title}</span></li>*/}
      </ul>
      <div>
        <button onClick={()=>{props.filterChange('all')}}>All</button>
        <button onClick={()=>{props.filterChange('active')}}>Active</button>
        <button onClick={()=>{props.filterChange('completed')}}>Completed</button>
      </div>
    </div>
  )
}