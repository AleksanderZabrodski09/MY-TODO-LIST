import React, {useCallback, useEffect} from 'react';
import './App.css';
import {InputForm} from './components/InputForm';
import ButtonAppBar from './components/AppBAR';
import {
  addTodolistAC, addTodolistTC,
  changeTodolistTitleAC, changeTodolistTitleTC, getTodolistTC,
  removeTodolistAC, removeTodolistTC,
  setTodolistsAC,
  TodolistsDomainType
} from './state/todolists-reducer';
import {AppDispatch, AppRootReducerType, useAppSelector} from './state/store';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Grid, Paper} from '@mui/material';
import {TodoList1} from './TodoList1';
import {todolistAPI} from './api/todolist-api';



function AppWithRedux() {

  useEffect(()=>{
    dispatch(getTodolistTC())
    // todolistAPI.getTodolist()
    //   .then((res)=>{
    //     dispatch(setTodolistsAC(res))
    //   })
  },[])

  const todolists = useAppSelector<TodolistsDomainType[]>(state => state.todolists)
  // const tasks = useSelector<AppRootReducerType, TasksPropsType>(state => state.tasks)

  const dispatch = AppDispatch()

  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(removeTodolistTC(todolistId))
  },[dispatch])
  const addTodolist = useCallback((title: string) => {
    // console.log('addItem called TODO')
    dispatch(addTodolistTC(title))
  },[dispatch])
  const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
    dispatch(changeTodolistTitleTC(todolistId, title))
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


              return <Grid item key={tl.id}>
                <Paper style={{padding: '10px'}}>
                  <TodoList1
                    key={tl.id}
                    todolistId={tl.id}
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
