import {todolistsReducer} from './todolists-reducer';
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from './tasks-reducer';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {appReducer} from '../app/app-reducer';




const rootReducer = combineReducers({
  tasks:tasksReducer,
  todolists: todolistsReducer,
  app:appReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))

export type AppRootReducerType =ReturnType<typeof rootReducer>

type AppDispatchType = ThunkDispatch<AppRootReducerType, any, AnyAction >
export const AppDispatch=()=>useDispatch<AppDispatchType>()

export const useAppSelector:TypedUseSelectorHook<AppRootReducerType>=useSelector

// @ts-ignore
window.store = store