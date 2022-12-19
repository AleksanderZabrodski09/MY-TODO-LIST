import {TodolistsPropsType} from '../App';
import {v1} from 'uuid';


type TodolistsReducerActionType =
  | RemoveTodolistACType
  | AddTodolistACType

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
type AddTodolistACType = ReturnType<typeof addTodolistAC>
const initialState: TodolistsPropsType[] = []

export const todolistsReducer = (state = initialState, action: TodolistsReducerActionType): TodolistsPropsType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.todolistId !== action.payload.todolistId)
    }
    case 'ADD-TODOLIST': {
      return [{todolistId: action.payload.todolistId, title:action.payload.title, filter: 'all'}, ...state]
    }
    // case '': {
    //   return state
    // }
    // case '': {
    //   return state
    // }

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
    payload: {title, todolistId:v1()}
  } as const
}