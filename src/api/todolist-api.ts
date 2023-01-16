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
    return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
      .then((res) => res.data)
  },

  createTodolist(title:string) {
    // let title = 'TS-JS-REACT'
    return axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists`, {title}, settings)
      .then((res) => res.data)
  },
  deleteTodolist(todolistId: string,) {

    return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
      .then((res) => res.data)
  },
  updateTodolist(todolistId: string,title:string) {

    return  axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings)
      .then((res) => res.data)
  }
}
