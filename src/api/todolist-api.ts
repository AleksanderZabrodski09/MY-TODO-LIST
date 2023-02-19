import axios, {AxiosResponse} from 'axios';


const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '5983a517-e387-4f12-ac5e-a15dd0cef3b7'
  }
}

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '5983a517-e387-4f12-ac5e-a15dd0cef3b7'
  }
})

// api
export const todolistAPI = {
  getTodolist() {
    return instance.get<TodolistType[]>('todo-lists')
      .then((res) => res.data)
  },
  createTodolist(title: string) {
    // let title = 'TS-JS-REACT'
    return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title})
      .then((res) => res.data)
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
      .then((res) => res.data)
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
      .then((res) => res.data)
  },

  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
      .then((res) => res.data)
  },

  createTask(todolistId: string, title: string) {
    return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title})
      .then((res) => res.data)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
      .then((res) => res.data)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
      .then((res) => res.data)
  }
}


//  types

type GetTasksResponse = {
  totalCount: number
  error: string | null
  items: TaskType[]
}

export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}

export enum ResultCode {
  SUCCEEDED,
  FAILED,
  CAPTCHA = 10
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}

export type TaskType = {
  id: string
  todoListId: string
  status: TaskStatuses
  description: string
  title: string
  priority: TaskPriorities
  startDate: string
  deadline: string
  order: number
  addedDate: string
}
export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
//
// type createTodolistType ={
//   fieldsErrors: string[]
//   messages: string[]
//   resultCode: number
//   data: {
//     item:  TodolistType
//   }
// }
//   type updateTodolistType ={
//   fieldsErrors: string[]
//   messages: string[]
//   resultCode: number
//   data: {}
// }
//   type deleteTodolistType ={
//   fieldsErrors: string[]
//   messages: string[]
//   resultCode: number
//   data: {}
// }

type ResponseType<D = {}> = {
  data: D
  fieldsErrors: string[]
  messages: string[]
  resultCode: number
}