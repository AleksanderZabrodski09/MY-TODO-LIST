import React, {memo, useCallback, useMemo} from 'react';
import {FilterValueType} from './App';
import {InputForm} from './components/InputForm';
import {EditableSpan} from './components/EditableSpan';
import {Button, Grid} from '@mui/material';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootReducerType} from './state/store';
import {addTaskAC} from './state/tasks-reducer';
import {changeTodolistFilterAC} from './state/todolists-reducer';
import {TaskWithRedux} from './TaskWithRedux';
import {ButtonUC} from './ButtonUC';

type TodoListType = {
  todolistId: string
  title: string
  filter: FilterValueType
  // filterChange: (todolistId: string, value: FilterValueType) => void
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}


export const TodoList1 = memo((props: TodoListType) => {
  // console.log("Todolist")


  let tasks = useSelector<AppRootReducerType, TaskType[]>(state => state.tasks[props.todolistId])
  const dispatch = useDispatch()

  tasks = [...tasks]
  // if (props.filter === 'active') {
  //   [...tasks] = tasks.filter(el => el.isDone === true);
  // }
  // if (props.filter === 'completed') {
  //   [...tasks] = tasks.filter(el => el.isDone === false);
  // }

  tasks = useMemo(()=>{
    if (props.filter === 'active') {
      [...tasks] = tasks.filter(el => el.isDone === true);
    }
    if (props.filter === 'completed') {
      [...tasks] = tasks.filter(el => el.isDone === false);
    }
    return tasks
  }, [props.filter,tasks])

  const addTask = useCallback((title: string) => {
    dispatch(addTaskAC(props.todolistId, title))
  }, [props.todolistId])

  // const removeTaskHeader = useCallback((tID: string) => {
  //   dispatch(removeTaskAC(props.todolistId, tID))
  // },[dispatch])
  // const changeTaskStatusHandler = useCallback((tID: string, eValue: boolean) => {
  //   dispatch(changeTaskStatusAC(props.todolistId, tID, eValue))
  // },[dispatch])
  // const changeTaskTitle = useCallback((tID: string, title: string) => {
  //   dispatch(changeTaskTitleAC(props.todolistId, tID, title))
  // },[dispatch])

  const onAllClickHandler = useCallback(() => {
    dispatch(changeTodolistFilterAC(props.todolistId, 'all'))
  }, [props.todolistId])
  const onActiveClickHandler = useCallback(() => {
    dispatch(changeTodolistFilterAC(props.todolistId, 'active'))
    // props.filterChange(props.todolistId, 'active')
  }, [props.todolistId])
  const onCompletedClickHandler = useCallback(() => {
    dispatch(changeTodolistFilterAC(props.todolistId, 'completed'))
    // props.filterChange(props.todolistId, 'completed')
  }, [props.todolistId])


  const changeTodolistTitleHandler = useCallback((title: string) => {
    props.changeTodolistTitle(props.todolistId, title)
  }, [props.changeTodolistTitle,props.todolistId])
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
              <TaskWithRedux
                key={el.id}
                task={el}
                todolistId={props.todolistId}
              />
            )
          })}
      </div>
      <div>

        <ButtonUC
          title={'All'}
          onClick={onAllClickHandler}
          color={'info'}
          // size='small'
          variant={props.filter === 'all' ? 'outlined' : 'text'}
        />

        <ButtonUC
          title={'Active'}
          onClick={onActiveClickHandler}
          color={'inherit'}
          // size='small'
          variant={props.filter === 'active' ? 'outlined' : 'text'}
        />

        <ButtonUC
          title={'Completed'}
          onClick={onCompletedClickHandler}
          color={'primary'}
          // size='small'
          variant={props.filter === 'completed' ? 'outlined' : 'text'}
        />

      </div>
    </div>
  )
})


