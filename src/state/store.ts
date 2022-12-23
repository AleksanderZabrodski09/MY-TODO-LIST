import {todolistsReducer} from './todolists-reducer';
import {combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from './tasks-reducer';


export type AppRootReducerType =ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  tasks:tasksReducer,
  todolists: todolistsReducer
})

export const store = legacy_createStore(rootReducer)

// @ts-ignore
window.store = store