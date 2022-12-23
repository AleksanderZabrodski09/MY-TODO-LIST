import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';
import {InputForm} from './components/InputForm';
import ButtonAppBar from './components/AppBAR';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {AppRootReducerType} from './state/store';
import {useDispatch, useSelector} from 'react-redux';


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

  const todolistId1 = v1();
  const todolistId2 = v1();

  const todolists= useSelector<AppRootReducerType,TodolistsPropsType[]>(state=>state.todolists)
  const tasks= useSelector<AppRootReducerType, TasksPropsType>(state=>state.tasks)

  const dispatch = useDispatch()

  const addTask = (todolistId: string, title: string) => {
    dispatch(addTaskAC(todolistId, title))
  }
  const removeTask = (todolistId: string, taskId: string) => {
    dispatch(removeTaskAC(todolistId,taskId))

  }
  const changeTaskStatus = (todolistId: string, taskId: string, value: boolean) => {
    dispatch(changeTaskStatusAC(todolistId,taskId,value))
  }
  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatch(changeTaskTitleAC(todolistId,taskId,title))
  }

  const filterChange = (todolistId: string, value: FilterValueType) => {
    dispatch(changeTodolistFilterAC(todolistId,value))
  }
  const removeTodolist = (todolistId: string) => {
    dispatch(removeTodolistAC(todolistId))

  }
  const addTodolist = (title: string) => {
    dispatch(addTodolistAC(title))

  }
  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatch(changeTodolistTitleAC(todolistId,title ))
  }

  return (
    <div className="App">
      <ButtonAppBar/>
      <InputForm addItem={addTodolist}/>
      {
        todolists.map(tl => {

          let filterForTodolist = tasks[tl.todolistId];
          if (tl.filter === 'active') {
            filterForTodolist = filterForTodolist.filter(el => el.isDone === true);
          }
          if (tl.filter === 'completed') {
            filterForTodolist = filterForTodolist.filter(el => el.isDone === false);
          }

          return <TodoList
            key={tl.todolistId}
            todolistId={tl.todolistId}
            title={tl.title}
            filter={tl.filter}
            addTask={addTask}
            task={filterForTodolist}
            removeTask={removeTask}
            filterChange={filterChange}
            changeTaskStatus={changeTaskStatus}
            removeTodolist={removeTodolist}
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle}
          />
        })
      }
    </div>
  );
}


export default AppWithRedux;
