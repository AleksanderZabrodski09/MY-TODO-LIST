import {v1} from 'uuid';
import {TodolistType} from '../api/todolist-api';


type TodolistsReducerActionType =
  | RemoveTodolistACType
  | AddTodolistACType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>

export  type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>

export type FilterValueType = 'all' | 'active' | 'completed'



export type TodolistsDomainType = TodolistType & {
  filter: FilterValueType
}

const initialState: TodolistsDomainType[] = []

export const todolistsReducer = (state = initialState, action: TodolistsReducerActionType): TodolistsDomainType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.payload.todolistId)
    }
    case 'ADD-TODOLIST': {
      return [{id: action.payload.todolist.id, title: action.payload.todolist.title, filter: 'all', addedDate: '', order: 0}, ...state]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
    }
    case 'CHANGE-TODOLIST-FILTER': {
      return state.map(tl=>tl.id===action.payload.todolistId?{...tl, filter:action.payload.filter}:tl)
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

export const addTodolistAC = ( todolist: TodolistType) => {
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

export const changeTodolistFilterAC=(todolistId: string, filter: FilterValueType)=>{
  return{
    type:'CHANGE-TODOLIST-FILTER',
    payload:{todolistId, filter}
  }as const
}

