import React from 'react';
import {FilterValueType} from './App';
import {CheckBox} from './components/CheckBox';
import {InputForm} from './components/InputForm';

type TodoListType = {
  todolistId:string
  title: string
  task: TaskType[]
  removeTask: (todolistId:string,taskId: string) => void
  filter: FilterValueType
  addTask: (todolistId:string,title: string) => void
  changeTaskStatus: (todolistId:string,taskId: string, value: boolean) => void
  filterChange: (todolistId:string,value: FilterValueType) => void
  removeTodolist:(todolistId:string)=>void
  // addTodolist:(title: string)=>void
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}


export const TodoList = (props: TodoListType) => {


  const addTask = (title: string) => {
    props.addTask(props.todolistId,title)
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
const removeTodolistHandler=()=>{
    props.removeTodolist(props.todolistId)
}

  return (
    <div>
      <h3>{props.title}
        <button onClick={removeTodolistHandler}>✖</button>
      </h3>
      <div>
        <InputForm addItem={addTask}/>

      </div>
      <ul>
        {props.task.map(el => {
            return (
              <li key={el.id}>
                <CheckBox checked={el.isDone} callBack={(value: boolean) => changeTaskStatusHandler(el.id, value)}/>
                <span>{el.title}</span>
                <button onClick={() => removeTaskHeader(el.id)}>✖</button>
              </li>
            )     }
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

