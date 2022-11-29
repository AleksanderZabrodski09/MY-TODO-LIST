import React from 'react';
import {FilterValueType} from './App';
import {AddInputForm} from './components/AddInputForm';
import {EditableTitle} from './components/EditableTitle';
import {Task} from './Task';
import {Button, IconButton} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
        <IconButton onClick={removeTodolistHandler}>
          <DeleteForeverIcon fontSize='large'/>
        </IconButton>
      </h3>
      <AddInputForm addInput={addTask}/>
      <div>
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
      </div>
      <div>

        {/*<Button name={'All'} callBack={onAllClickHandler} className={props.filter === 'all' ? 'activeFilter' : 'buttonFilter'}/>*/}

        <Button
          color='primary'
          size='small'
          onClick={onAllClickHandler}
          // className={props.filter === 'all' ? 'activeFilter' : 'buttonFilter'}
          variant={props.filter === 'all' ? 'outlined' : 'text'}
        >All
        </Button>
        <Button
          color='success'
          size='small'
          onClick={onActiveClickHandler}
          // className={props.filter === 'active' ? 'activeFilter' : 'buttonFilter'}
          variant={props.filter === 'active' ? 'outlined' : 'text'}
        >Active
        </Button>
        <Button
          color='secondary'
          size='small'
          onClick={onCompletedClickHandler}
          // className={props.filter === 'completed' ? 'activeFilter' : 'buttonFilter'}
          variant={props.filter === 'completed' ? 'outlined' : 'text'}
        >Completed
        </Button>
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