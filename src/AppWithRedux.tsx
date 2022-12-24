import React, {useCallback} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {InputForm} from './components/InputForm';
import ButtonAppBar from './components/AppBAR';
import {addTodolistAC, changeTodolistTitleAC, removeTodolistAC} from './state/todolists-reducer';
import {AppRootReducerType} from './state/store';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Grid, Paper} from '@mui/material';
import {TodoList1} from './TodoList1';


export type TodolistsPropsType = {
  todolistId: string
  title: string
  filter: FilterValueType
}
export type TasksPropsType = {
  [key: string]: TaskType[]
}

export type FilterValueType = 'all' | 'active' | 'completed'

function AppWithRedux() {

  // const todolistId1 = v1();
  // const todolistId2 = v1();

  const todolists = useSelector<AppRootReducerType, TodolistsPropsType[]>(state => state.todolists)
  // const tasks = useSelector<AppRootReducerType, TasksPropsType>(state => state.tasks)

  const dispatch = useDispatch()

  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(removeTodolistAC(todolistId))
  },[dispatch])
  const addTodolist = useCallback((title: string) => {
    // console.log('addItem called TODO')
    dispatch(addTodolistAC(title))
  },[dispatch])
  const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
    dispatch(changeTodolistTitleAC(todolistId, title))
  },[dispatch])

  return (
    <div className="App">
      <ButtonAppBar/>

      <Container fixed>
        <Grid container style={{padding: '25px'}}>
          <InputForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {


              return <Grid item key={tl.todolistId}>
                <Paper style={{padding: '10px'}}>
                  <TodoList1
                    key={tl.todolistId}
                    todolistId={tl.todolistId}
                    title={tl.title}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>


      </Container>
    </div>
  );
}


export default AppWithRedux;
