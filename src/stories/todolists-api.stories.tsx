import React, {useEffect, useState} from 'react'
import axios from 'axios';


export default {
  title: 'API'
}
const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '5983a517-e387-4f12-ac5e-a15dd0cef3b7'
  }
}


export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке
    axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
      .then((res) => {
        setState(res.data)
      })
  }, [])
  return <div>{JSON.stringify(state)}</div>

}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    let title = 'TS-JS-REACT'

    axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists`, {title}, settings)
      .then((res) => {
        setState(res.data)
      })

  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {

    let todolistId = '3fb40402-cfe0-4169-b427-e2b4719de421'
    axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
      .then((res)=>{
        setState(res.data)
      })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    let todolistId = '23a737d7-614f-4879-bae7-6051f841253e'
    let title = 'NEW TITLE2'
    axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings)
      .then((res)=>{
        setState(res.data)
      })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

