import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';

export type FilterValueType = 'all' | 'active' | 'completed';
export type TodolistType = {
  todolistId: string
  title: string
  filter: FilterValueType
}

export type TasksPropsType={
  [key:string]:TaskType
}

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();
  const [todolists, setTodolists] = useState<TodolistType[]>([
    {todolistId: todolistId1, title: 'What to learn?', filter: 'all'},
    {todolistId: todolistId2, title: 'What to bay?', filter: 'all'},
  ])

  const [tasks, setTasks] = useState({
      [todolistId1]: [{id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "TS", isDone: true},
        {id: v1(), title: "Redux", isDone: false}
      ],

      [todolistId2]: [ {id: v1(), title: "Bread", isDone: true},
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "juice", isDone: false},
        {id: v1(), title: "apple", isDone: false}
      ]
    }
  )
  const addTask = (todolistId:string, title: string) => {

    let task = {id: v1(), title: title, isDone: false}
    let newTask = [task, ...tasks]
    setTasks(newTask)
  }
  const removeTask = (id: string) => {
    let filteredTask = tasks.filter(el => el.id !== id)
    setTasks(filteredTask)
  }
  // const [filter, setFilter] = useState<FilterValueType>('all')

  // let tasksTodolist = tasks
  // if (filter === 'active') {
  //   tasksTodolist = tasks.filter(el => el.isDone === false)
  // }
  // if (filter === 'completed') {
  //   tasksTodolist = tasks.filter(el => el.isDone === true)
  // }
  const changeFilter = (todolistId:string, value: FilterValueType) => {
    // console.log(value)
    setTodolists(todolists.map(tl=>tl.todolistId===todolistId?{...tl, filter:value}:tl))
  }
  const changeTaskStatus = (taskId: string, value: boolean) => {
    // console.log(taskId, value)
    setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: value} : t))
  }

  return (
    <div className="App">
      {
        todolists.map(tl=> {
          let tasksTodolist = tasks[tl.todolistId]
          if (tl.filter === 'active') {
            tasksTodolist = tasksTodolist.filter(el => el.isDone === false)
          }
          if (tl.filter === 'completed') {
            tasksTodolist = tasksTodolist.filter(el => el.isDone === true)
          }
          return <TodoList
            key={tl.todolistId}
            todolistId={tl.todolistId}
            title={tl.title}
            tasks={tasksTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={tl.filter}
          />

          }
        )
      }


    </div>
  );
}


export default App;
