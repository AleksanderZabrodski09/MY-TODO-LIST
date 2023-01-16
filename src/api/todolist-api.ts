import axios from 'axios';


const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '5983a517-e387-4f12-ac5e-a15dd0cef3b7'
  }
}

const instance = axios.create({
  baseURL:'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '5983a517-e387-4f12-ac5e-a15dd0cef3b7'
  }
})


export const todolistAPI = {
  getTodolist() {
    return instance.get('todo-lists')
      .then((res) => res.data)
  },

  createTodolist(title:string) {
    // let title = 'TS-JS-REACT'
    return instance.post(`todo-lists`, {title})
      .then((res) => res.data)
  },
  deleteTodolist(todolistId: string,) {

    return instance.delete(`todo-lists/${todolistId}`)
      .then((res) => res.data)
  },
  updateTodolist(todolistId: string,title:string) {

    return  instance.put(`todo-lists/${todolistId}`, {title})
      .then((res) => res.data)
  }
}
