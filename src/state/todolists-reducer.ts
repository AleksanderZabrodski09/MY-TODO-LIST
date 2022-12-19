import {TodolistsPropsType} from '../App';


type TodolistsReducerActionType =
  | RemoveTodolistACType

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
const initialState: TodolistsPropsType[] = []

export const todolistsReducer = (state = initialState, action: TodolistsReducerActionType): TodolistsPropsType[]=> {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl=>tl.todolistId!==action.payload.todolistId)
    }
    // case '': {
    //   return state
    // }
    default:
      return state
  }
}

export const removeTodolistAC = (todolistId:string)=>{
  return{
    type:'REMOVE-TODOLIST',
    payload:{todolistId}
  }as const
}