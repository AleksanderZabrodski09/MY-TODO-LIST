import {todolistAPI, TodolistType} from '../api/todolist-api';
import {Dispatch} from 'redux';


type TodolistsReducerActionType =
  | RemoveTodolistACType
  | AddTodolistACType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | SetTodolistsACType

export  type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>

export type FilterValueType = 'all' | 'active' | 'completed'


export type TodolistsDomainType = TodolistType & {
  filter: FilterValueType
}

const initialState: TodolistsDomainType[] = []

export const todolistsReducer = (state = initialState, action: TodolistsReducerActionType): TodolistsDomainType[] => {
  switch (action.type) {
    case 'SET-TODOLISTS':
      return action.payload.todolists.map(tl => ({
          ...tl,
          filter: 'all'
        }))
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.payload.todolistId)
    }
    case 'ADD-TODOLIST':
      return [{
        id: action.payload.todolist.id,
        title: action.payload.todolist.title,
        filter: 'all',
        addedDate: '',
        order: 0
      }, ...state]
    case 'CHANGE-TODOLIST-TITLE': {
      return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
    }
    case 'CHANGE-TODOLIST-FILTER': {
      return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
    }
    default:
      return state
  }
}

export const removeTodolistAC = (todolistId: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {todolistId}
  } as const
}

export const addTodolistAC = (todolist: TodolistType) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {todolist}
  } as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {title, todolistId}
  } as const
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValueType) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {todolistId, filter}
  } as const
}

export const setTodolistsAC = (todolists: TodolistType[]) => {
  return {
    type: 'SET-TODOLISTS',
    payload: {todolists}
  } as const
}


//  thunks

export const getTodolistTC=()=>(dispatch:Dispatch)=>{
  todolistAPI.getTodolist()
  .then((res)=>{
  dispatch(setTodolistsAC(res))
  })
}

export const addTodolistTC =(title:string)=>(dispatch:Dispatch)=>{
  todolistAPI.createTodolist(title)
    .then((res)=>{
      dispatch(addTodolistAC(res.data.item))
    })
}

export const removeTodolistTC=(todolistId:string)=>{
  return (dispatch:Dispatch)=>
    todolistAPI.deleteTodolist(todolistId)
      .then((res)=>{
    dispatch(removeTodolistAC(todolistId))
  })
}
export const changeTodolistTitleTC=(todolistId:string,title:string)=>(dispatch:Dispatch)=>{
  todolistAPI.updateTodolist(todolistId,title)
    .then((res)=>{
      dispatch(changeTodolistTitleAC(todolistId, title))
    })
}