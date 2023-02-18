import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, legacy_createStore} from 'redux'
import {v1} from 'uuid'
import {tasksReducer} from '../state/tasks-reducer';
import {todolistsReducer} from '../state/todolists-reducer';
import {AppRootReducerType} from '../state/store';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';
import {appReducer} from '../app/app-reducer';


const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app:appReducer
})

const initialGlobalState:AppRootReducerType = {
  todolists: [
    {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
  ],
  tasks: {
    ['todolistId1']: [
      {id: v1(), title: 'HTML&CSS', status: TaskStatuses.New,  order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''},
      {id: v1(), title: 'JS', status: TaskStatuses.Completed,  order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''}
    ],
    ['todolistId2']: [
      {id: v1(), title: 'Milk', status: TaskStatuses.Completed,  order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''},
      {id: v1(), title: 'React Book', status: TaskStatuses.New,  order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''}
    ]
  },
  app:{
    error: null,
    status:'idle'
  }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState )
export const  ReduxStoreProviderDecorator=(storyFn:()=>JSX.Element)=>{
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}