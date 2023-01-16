import axios from 'axios';


const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '5983a517-e387-4f12-ac5e-a15dd0cef3b7'
  }
}

export const todolistAPI = {
  getTodolist(){
    return  axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
  }
}