import {AddTodolistACType, RemoveTodolistACType, SetTodolistsACType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {AppRootReducerType} from './store';
import {setLoadingStatusAC, SetLoadingStatusType} from '../app/app-reducer';



//  reducer

const initialState: TasksPropsType = {}
export const tasksReducer = (state = initialState, action: TasksReducerActionType): TasksPropsType => {
  switch (action.type) {
    case 'SET-TODOLISTS': {
      // let copyState: {[p:string]:TaskType[]}
      let copyState: TasksPropsType
      copyState = {...state}
      action.payload.todolists.forEach(tl => {
        copyState[tl.id] = []
      })
        return copyState
    }

    case 'SET-TASKS':{
    return {...state, [action.payload.todolistId]:action.payload.tasks}
  }
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
      }
    }
    case 'ADD-TASK': {
      return {
        ...state,
        [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
      }
    }
    case 'ADD-TODOLIST': {
      return {...state, [action.payload.todolist.id]: []}
    }
    case 'REMOVE-TODOLIST': {
      delete state[action.payload.todolistId]
      return {...state}
    }


    case 'UPDATE-TASK': {
      return {...state, [action.payload.todolistId]:state[action.payload.todolistId].map(t=>t.id ===action.payload.taskId ?{...t, ...action.payload.model}:t)}
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
export const updateTaskAC = (todolistId: string, taskId:string,model: UpdatePropertyModelType) => {
  return {
    type: 'UPDATE-TASK',
    payload: {model, todolistId,taskId}
  } as const
}

// export const changeTaskStatusAC=(todolistId: string, taskId:string, status:TaskStatuses)=>{
//   return{
//     type:'CHANGE-TASK-STATUS',
//     payload:{todolistId, taskId, status}
//   }as const
// }


export const setTasksAC=(todolistId:string, tasks: TaskType[])=>{
  return {
    type:'SET-TASKS',
    payload:{todolistId,tasks}
  }as const
}


//  thunks

export const getTasksTC=(todolistId:string)=>{
  return (dispatch:Dispatch)=>{
    dispatch(setLoadingStatusAC('loading'))
    todolistAPI.getTasks(todolistId)
      .then((res)=>{
        dispatch(setTasksAC(todolistId, res.items))
        dispatch(setLoadingStatusAC('succeeded'))
      })
  }
}

export const addTaskTC =(todolistId:string, title:string)=>(dispatch:Dispatch)=>{
  dispatch(setLoadingStatusAC('loading'))
  todolistAPI.createTask(todolistId, title)
    .then((res)=>{
      dispatch(addTaskAC(res.data.item))
      dispatch(setLoadingStatusAC('succeeded'))
    })
}
export const removeTaskTC =(todolistId:string, taskId:string)=>(dispatch:Dispatch)=>{
  dispatch(setLoadingStatusAC('loading'))
  todolistAPI.deleteTask(todolistId, taskId)
    .then((res)=>{
      dispatch(removeTaskAC(todolistId, taskId))
      dispatch(setLoadingStatusAC('succeeded'))
    })
}

type UpdatePropertyModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
export const updateTaskTC=(todolistId:string, taskId:string, propertyModel: UpdatePropertyModelType)=>{
  return (dispatch: Dispatch, getState:()=>AppRootReducerType)=>{
    const task = getState().tasks[todolistId].find(t=>t.id===taskId)
    if(task){
      const model:UpdateTaskModelType={
        ...task,
        ...propertyModel
      }
      dispatch(setLoadingStatusAC('loading'))
      todolistAPI.updateTask(todolistId, taskId, model)
        .then((res)=>{
          dispatch(updateTaskAC(todolistId, taskId,propertyModel))
          dispatch(setLoadingStatusAC('succeeded'))
        })
    }
  }
}

//  types

export type TasksPropsType = {
  [key: string]: TaskType[]
}

type TasksReducerActionType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTasksAC>
  | RemoveTodolistACType
  | AddTodolistACType
  | SetTodolistsACType
  | SetLoadingStatusType