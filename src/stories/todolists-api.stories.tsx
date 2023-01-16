import React, {useEffect, useState} from 'react'
import {todolistAPI} from '../api/todolist-api';


export default {
  title: 'API'
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {

    todolistAPI.getTodolist()
      .then((res) => {
        setState(res)
      })

    // axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    //   .then((res) => {
    //     setState(res.data)
    //   })
  }, [])
  return <div>{JSON.stringify(state)}</div>

}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    let title = 'TS-JS-REACT'
    todolistAPI.createTodolist(title)
      .then((res) => {
        setState(res)
      })

  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    let todolistId = '93c1dad1-d6ee-46be-836e-842cd891b185';
    todolistAPI.deleteTodolist(todolistId)
      .then((res)=>{
        setState(res)
      })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    let todolistId = '91321b48-9de0-4944-976c-c79ad4259a3e'
    let title = 'NEW TITLE-4'
    todolistAPI.updateTodolist(todolistId,title)
      .then((res)=>{
        setState(res)
      })


    // let todolistId = '23a737d7-614f-4879-bae7-6051f841253e'
    // let title = 'NEW TITLE2'
    // axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings)
    //   .then((res) => {
    //     setState(res.data)
    //   })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

