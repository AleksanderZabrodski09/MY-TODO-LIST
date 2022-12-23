import {TasksPropsType, TodolistsPropsType} from '../App';
import {AddTodolistACType, RemoveTodolistACType} from './todolists-reducer';
import {v1} from 'uuid';


type TodolistsReducerActionType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskStatusAC>
  // | ReturnType<typeof changeTodolistFilterAC>
  | RemoveTodolistACType
  | AddTodolistACType


const initialState: TasksPropsType = {}

export const tasksReducer = (state = initialState, action: TodolistsReducerActionType): TasksPropsType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
      }
    }
    case 'ADD-TASK': {
      return {
        ...state,
        [action.payload.todolistId]: [{
          id: v1(),
          title: action.payload.title,
          isDone: false
        }, ...state[action.payload.todolistId]]
      }
    }
    case 'ADD-TODOLIST': {
      return {...state, [action.payload.todolistId]: []}
    }
    case 'REMOVE-TODOLIST': {
      delete state[action.payload.todolistId]
      return {...state}
    }


    // case 'CHANGE-TASK-TITLE': {
    //   return state.map(tl => tl.todolistId === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
    // }
    case 'CHANGE-TASK-STATUS': {
      return {...state, [action.payload.todolistId]:state[action.payload.todolistId].map(t=>t.id===action.payload.taskId?{...t, isDone:action.payload.isDone}:t)}
    }

    default:
      return state
  }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {todolistId, taskId}
  } as const
}

export const addTaskAC = (todolistId: string, title: string) => {
  return {
    type: 'ADD-TASK',
    payload: {title, todolistId}
  } as const
}
// export const changeTaskTitleAC = (todolistId: string, title: string) => {
//   return {
//     type: 'CHANGE-TODOLIST-TITLE',
//     payload: {title, todolistId}
//   } as const
// }
//
export const changeTaskStatusAC=(todolistId: string, taskId:string, isDone:boolean)=>{
  return{
    type:'CHANGE-TASK-STATUS',
    payload:{todolistId, taskId, isDone}
  }as const
}
