import {TasksPropsType, TodolistsPropsType} from '../App';
import {AddTodolistACType, RemoveTodolistACType} from './todolists-reducer';


type TodolistsReducerActionType =
  | ReturnType<typeof removeTaskAC>
  // | ReturnType<typeof changeTodolistFilterAC>
  | RemoveTodolistACType
  | AddTodolistACType



const initialState: TasksPropsType = {}

export const tasksReducer = (state = initialState, action: TodolistsReducerActionType): TasksPropsType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return {...state, [action.payload.todolistId]:state[action.payload.todolistId].filter(t=>t.id!==action.payload.taskId)}
    }
    // case 'ADD-TASK': {
    //   return [{todolistId: action.payload.todolistId, title: action.payload.title, filter: 'all'}, ...state]
    // }
    // case 'CHANGE-TASK-TITLE': {
    //   return state.map(tl => tl.todolistId === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
    // }
    // case 'CHANGE-TASK-STATUS': {
    //   return state.map(tl=>tl.todolistId===action.payload.todolistId?{...tl, filter:action.payload.filter}:tl)
    // }

    default:
      return state
  }
}

export const removeTaskAC = (todolistId: string, taskId:string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {todolistId,taskId}
  } as const
}
//
// export const addTaskAC = (title: string) => {
//   return {
//     type: 'ADD-TODOLIST',
//     payload: {title, todolistId: v1()}
//   } as const
// }
// export const changeTaskTitleAC = (todolistId: string, title: string) => {
//   return {
//     type: 'CHANGE-TODOLIST-TITLE',
//     payload: {title, todolistId}
//   } as const
// }
//
// export const changeTaskFilterAC=(todolistId: string, filter: FilterValueType)=>{
//   return{
//     type:'CHANGE-TODOLIST-FILTER',
//     payload:{todolistId, filter}
//   }as const
// }
