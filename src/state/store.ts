import {todolistsReducer} from './todolists-reducer';
import {combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from './tasks-reducer';


type AppRootReducerType =ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  tasks:tasksReducer,
  todolists: todolistsReducer
})

export const store = legacy_createStore(rootReducer)