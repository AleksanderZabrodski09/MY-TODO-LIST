import React, {useEffect, useState} from 'react'
import {todolistAPI} from './todolist-api';


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
    let title = 'TS-TS'
    todolistAPI.createTodolist(title)
      .then((res) => {
        setState(res)
      })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')

  const deleteTodolist = () => {
    todolistAPI.deleteTodolist(todolistId)
      .then((res) => {
        setState(res)
      })
  }
  // useEffect(() => {
  //   let todolistId = '681c642d-7325-48f7-b57c-5dc26017b9dc';
  //   todolistAPI.deleteTodolist(todolistId)
  //     .then((res) => {
  //       setState(res)
  //     })
  // }, [])
  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={'todolistId'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>

      <button onClick={deleteTodolist}>delete todolist</button>
    </div>
  </div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [newTitle, setNewTitle] = useState<string>('')

  const updateTitle = () => {
    todolistAPI.updateTodolist(todolistId, newTitle)
      .then((res) => {
        setState(res)
      })
  }

  // useEffect(() => {
  //   let todolistId = 'a6bc2a7c-ee62-4193-8fa7-b131c7272b55'
  //   let title = 'Good Luck'
  //   todolistAPI.updateTodolist(todolistId,title)
  //     .then((res)=>{
  //       setState(res)
  //     },[])

  // let todolistId = '23a737d7-614f-4879-bae7-6051f841253e'
  // let title = 'NEW TITLE2'
  // axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings)
  //   .then((res) => {
  //     setState(res.data)
  //   })
  // }, [])

  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={'todolistId'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
      <input placeholder={'newTitle'} value={newTitle} onChange={(e) => setNewTitle(e.currentTarget.value)}/>
      <button onClick={updateTitle}>update title</button>
    </div>
  </div>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    let todolistId = 'dafe74fb-cd75-4942-87b5-af5cf9e99e24'
    todolistAPI.getTasks(todolistId)
      .then((res) => {
        setState(res)
      })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [taskId, setTaskId] = useState<string>('')

  const deleteTask = () => {
    todolistAPI.deleteTask(todolistId, taskId)
      .then((res) => {
        setState(res)
      })
  }
  // useEffect(()=>{
  //   let todolistId='asddfadsfg'
  //   let taskId='asdf'
  //   todolistAPI.deleteTask(todolistId, taskId)
  //     .then((res)=>{
  //     setState(res)
  //   })
  // },[])
  //
  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={'todolistId'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
      <input placeholder={'taskId'} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
      <button onClick={deleteTask}>delete task</button>
    </div>
  </div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [title, setTitle] = useState<string>('')

  const createTask = () => {
    todolistAPI.createTask(todolistId, title)
      .then((res) => {
        setState(res)
      })
  }

  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
        setTodolistId(e.currentTarget.value)
      }}/>
      <input placeholder={'title Task'} value={title} onChange={(e) => {
        setTitle(e.currentTarget.value)
      }}/>
      <button onClick={createTask}>create task</button>
    </div>
  </div>
}