import React from 'react';
import {FilterValueType} from './App';
import {AddInputForm} from './components/AddInputForm';
import {EditableTitle} from './components/EditableTitle';
import {Task} from './Task';

type TodoListType = {
  todolistId: string
  title: string
  tasks: TaskType[]
  removeTask: (todolistId: string, taskId: string) => void
  changeFilter: (todolistId: string, value: FilterValueType) => void
  addTask: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, value: boolean) => void
  filter: FilterValueType
  removeTodolist: (todolistId: string) => void
  editTaskTitle: (todolistId: string, taskId: string, title: string) => void
  editTodolistTitle: (todolistId: string, title: string) => void

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

  const removeTaskHandler = (tID: string) => {
    props.removeTask(props.todolistId, tID)
  }

  const onAllClickHandler = () => {
    props.changeFilter(props.todolistId, 'all')
  }
  const onActiveClickHandler = () => {
    props.changeFilter(props.todolistId, 'active')
  }
  const onCompletedClickHandler = () => {
    props.changeFilter(props.todolistId, 'completed')
  }
  const OnChangeStatusHandler = (taskID: string, eValue: boolean) => {
    props.changeTaskStatus(props.todolistId, taskID, eValue)
  }
  const editTaskTitle = (taskID: string, title: string) => {
    props.editTaskTitle(props.todolistId, taskID, title)
  }
  const editTodolistTitle = (title: string) => {
    props.editTodolistTitle(props.todolistId, title)
  }

  const removeTodolistHandler = () => {
    props.removeTodolist(props.todolistId)
  }

  return (
    <div>
      <h3>
        <EditableTitle value={props.title} callback={editTodolistTitle}/>
        <button onClick={removeTodolistHandler}>✖</button>
      </h3>
      <AddInputForm addInput={addTask}/>
      <ul>
        {props.tasks.map((t) => {
          return (
            <Task
              key={t.id} task={t}
              removeTask={removeTaskHandler}
              editTaskTitle={editTaskTitle}
              changeTaskStatus={OnChangeStatusHandler}
            />
            //   <li key={t.id} className={t.isDone ? 'completed' : ''}>
            //   <CheckBox checked={t.isDone} callBack={(eValue)=>OnChangeStatusHandler(t.id,eValue)}/>
            //   <EditableTitle value={t.title} callback={(title) => editTaskTitle(t.id, title)}/>
            //   <button
            //     onClick={() => removeTaskHandler(props.todolistId, t.id)}
            //   >✖
            //   </button>
            // </li>
          )
        })}
      </ul>
      <div>

        {/*<Button name={'All'} callBack={onAllClickHandler} className={props.filter === 'all' ? 'activeFilter' : 'buttonFilter'}/>*/}

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


// export type ButtonType = {
//   name: string
//   callBack: () => void
//
// }
// export const Button = ({name, callBack}: ButtonType) => {
//   const onClickHandler = () => {
//     callBack()
//   }
//
//   return <>
//     <button onClick={onClickHandler}>{name}</button>
//   </>
// }