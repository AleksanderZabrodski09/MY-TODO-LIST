import {AddTodolistACType, RemoveTodolistACType} from './todolists-reducer';
import {TaskType} from '../api/todolist-api';


export type TasksPropsType = {
  [key: string]: TaskType[]
}

type TodolistsReducerActionType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof changeTaskTitleAC>
  // | ReturnType<typeof changeTodolistFilterAC>
  | RemoveTodolistACType
  | AddTodolistACType

//  reducer

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
        [action.payload.task.id]: [action.payload.task, ...state[action.payload.task.id]]
      }
    }
    case 'ADD-TODOLIST': {
      return {...state, [action.payload.todolist.id]: []}
    }
    case 'REMOVE-TODOLIST': {
      delete state[action.payload.todolistId]
      return {...state}
    }


    case 'CHANGE-TASK-TITLE': {
      return {...state, [action.payload.todolistId]:state[action.payload.todolistId].map(t=>t.id ===action.payload.taskId?{...t, title:action.payload.title}:t)}
    }
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

export const addTaskAC = (task:TaskType) => {
  return {
    type: 'ADD-TASK',
    payload: {task}
  } as const
}
export const changeTaskTitleAC = (todolistId: string, taskId:string,title: string) => {
  return {
    type: 'CHANGE-TASK-TITLE',
    payload: {title, todolistId,taskId}
  } as const
}

export const changeTaskStatusAC=(todolistId: string, taskId:string, isDone:boolean)=>{
  return{
    type:'CHANGE-TASK-STATUS',
    payload:{todolistId, taskId, isDone}
  }as const
}
