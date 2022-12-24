import React, {useCallback} from 'react';
import {FilterValueType} from './App';
import {InputForm} from './components/InputForm';
import {EditableSpan} from './components/EditableSpan';
import {Task} from './Task';
import {Button, Grid} from '@mui/material';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootReducerType} from './state/store';
import {TasksPropsType} from './AppWithRedux';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {changeTodolistFilterAC} from './state/todolists-reducer';

type TodoListType = {
  todolistId: string
  title: string
  // task: TaskType[]
  // removeTask: (todolistId: string, taskId: string) => void
  filter: FilterValueType
  // addTask: (todolistId: string, title: string) => void
  // changeTaskStatus: (todolistId: string, taskId: string, value: boolean) => void
  // changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  // filterChange: (todolistId: string, value: FilterValueType) => void
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string,title: string) => void


}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}


export const TodoList1 = (props: TodoListType) => {



  let tasks = useSelector<AppRootReducerType, TaskType[]>(state => state.tasks[props.todolistId])
  const dispatch = useDispatch()

  // let filterForTodolist = tasks[tl.todolistId];
  if (props.filter === 'active') {
    tasks = tasks.filter(el => el.isDone === true);
  }
  if (props.filter === 'completed') {
    tasks = tasks.filter(el => el.isDone === false);
  }

  const addTask = useCallback( (title: string) => {
    dispatch(addTaskAC(props.todolistId, title))
  },[])

  const removeTaskHeader = (tID: string) => {
    dispatch(removeTaskAC(props.todolistId, tID))
  }
  const changeTaskStatusHandler = (tID: string, eValue: boolean) => {
    dispatch(changeTaskStatusAC(props.todolistId, tID, eValue))
  }
  const changeTaskTitle = (tID: string, title: string) => {
    dispatch(changeTaskTitleAC(props.todolistId, tID, title))
  }

  const onAllClickHandler = () => {
    dispatch(changeTodolistFilterAC(props.todolistId, 'all'))
  }
  const onActiveClickHandler = () => {
    dispatch(changeTodolistFilterAC(props.todolistId, 'active'))
    // props.filterChange(props.todolistId, 'active')
  }
  const onCompletedClickHandler = () => {
    dispatch(changeTodolistFilterAC(props.todolistId, 'completed'))
    // props.filterChange(props.todolistId, 'completed')
  }



  const changeTodolistTitleHandler = ( title: string) => {
    props.changeTodolistTitle(props.todolistId, title)
  }
  const removeTodolistHandler = () => {
    props.removeTodolist(props.todolistId)
  }

  return (
    <div>
      <h3>
        <EditableSpan value={props.title} callBack={changeTodolistTitleHandler}/>
        <Button onClick={removeTodolistHandler}>
          <FolderDeleteIcon/>
        </Button>
      </h3>
      <div>
        <Grid container style={{paddingBottom: '25px'}}>
          <InputForm addItem={addTask}/>
        </Grid>
      </div>
      <div>
        {
          tasks.map(el => {
            return (
              <Task
                key={el.id}
                task={el}
                changeTaskStatus={changeTaskStatusHandler}
                changeTaskTitle={changeTaskTitle}
                removeTask={removeTaskHeader}
              />
            )
          })}
      </div>
      <div>
        <Button onClick={onAllClickHandler}
                color='info'
                size='small'
                variant={props.filter==='all' ? 'outlined':'text'}
                // className={props.filter === 'all' ? 'activeFilter' : 'buttonFilter'}
        >All
        </Button>
        <Button onClick={onActiveClickHandler}
                color='info'
                size='small'
                variant={props.filter==='active' ? 'outlined':'text'}
               >Active
        </Button>
        <Button onClick={onCompletedClickHandler}
                color='primary'
                size='small'
                variant={props.filter==='completed' ? 'outlined':'text'}
               >Completed
        </Button>
      </div>
    </div>
  )
}


