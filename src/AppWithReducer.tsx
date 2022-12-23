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


export type TodolistsPropsType = {
  todolistId: string
  title: string
  filter: FilterValueType
}
export type TasksPropsType = {
  [key: string]: TaskType[]
}

export type FilterValueType = 'all' | 'active' | 'completed'

function AppWithReducer() {

  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, dispatchToTodolist] = useReducer( todolistsReducer, [
    {todolistId: todolistId1, title: 'What to learn?', filter: 'all'},
    {todolistId: todolistId2, title: 'What to buy?', filter: 'all'}
  ])
  const [tasks, dispatchToTask] = useReducer(tasksReducer,{
      [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "TS", isDone: true},
        {id: v1(), title: "Git", isDone: false}
      ],
      [todolistId2]: [
        {id: v1(), title: "curs-JS", isDone: true},
        {id: v1(), title: "laptop", isDone: true},
        {id: v1(), title: "screen", isDone: false},
      ]
    }
  )

  const addTask = (todolistId: string, title: string) => {
    dispatchToTask(addTaskAC(todolistId, title))
  }
  const removeTask = (todolistId: string, taskId: string) => {
    dispatchToTask(removeTaskAC(todolistId,taskId))

  }
  const changeTaskStatus = (todolistId: string, taskId: string, value: boolean) => {
    dispatchToTask(changeTaskStatusAC(todolistId,taskId,value))
  }
  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatchToTask(changeTaskTitleAC(todolistId,taskId,title))
  }

  const filterChange = (todolistId: string, value: FilterValueType) => {
    dispatchToTodolist(changeTodolistFilterAC(todolistId,value))
  }
  const removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId)
    dispatchToTodolist(action)
    dispatchToTask(action)
  }
  const addTodolist = (title: string) => {
    const action = addTodolistAC(title)
    dispatchToTodolist(action)
    dispatchToTask(action)
  }
  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatchToTodolist(changeTodolistTitleAC(todolistId,title ))
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


export default AppWithReducer;
