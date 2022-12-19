import {FilterValueType, TodolistsPropsType} from '../App';
import {v1} from 'uuid';


type TodolistsReducerActionType =
  | RemoveTodolistACType
  | AddTodolistACType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>

export  type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>

const initialState: TodolistsPropsType[] = []

export const todolistsReducer = (state = initialState, action: TodolistsReducerActionType): TodolistsPropsType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.todolistId !== action.payload.todolistId)
    }
    case 'ADD-TODOLIST': {
      return [{todolistId: action.payload.todolistId, title: action.payload.title, filter: 'all'}, ...state]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      return state.map(tl => tl.todolistId === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
    }
    case 'CHANGE-TODOLIST-FILTER': {
      return state.map(tl=>tl.todolistId===action.payload.todolistId?{...tl, filter:action.payload.filter}:tl)
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

export const addTodolistAC = (title: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {title, todolistId: v1()}
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
