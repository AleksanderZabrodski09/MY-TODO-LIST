import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';
import {InputForm} from './components/InputForm';


export type TodolistsPropsType={
  todolistId: string
  title:string
  filter:FilterValueType
}
export type TasksPropsType={
  [key:string]:TaskType[]
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

  const todolistId1=v1();
  const todolistId2=v1();

  const[todolists, setTodolists]=useState<TodolistsPropsType[]>([
    {todolistId: todolistId1, title:'What to learn?', filter:'all'},
    {todolistId: todolistId2, title:'What to buy?', filter:'all'}
  ])
  const [tasks, setTasks] = useState<TasksPropsType>({
    [todolistId1]:[
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "TS", isDone: true},
      {id: v1(), title: "Git", isDone: false}
    ],
    [todolistId2]:[
      {id: v1(), title: "curs-JS", isDone: true},
      {id: v1(), title: "laptop", isDone: true},
      {id: v1(), title: "screen", isDone: false},
    ]
  }
  )

  const addTask = (todolistId:string,title: string) => {
    setTasks({...tasks, [todolistId]:[{id: v1(), title: title, isDone: false}, ...tasks[todolistId]]})
  }
  const removeTask = (todolistId:string,taskId: string) => {
    setTasks({...tasks, [todolistId]:tasks[todolistId].filter(t=>t.id!==taskId)})

  }
  const changeTaskStatus = (todolistId:string, taskId: string, value: boolean) => {
    setTasks({...tasks, [todolistId]:tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: value} : t)})
  }

  const changeTaskTitle=(todolistId:string, taskId: string, title: string)=>{
    setTasks({...tasks, [todolistId]:tasks[todolistId].map(t=>t.id===taskId?{...t, title}:t)})
  }

  const filterChange = (todolistId:string,value: FilterValueType) => {
    setTodolists(todolists.map(tl=>tl.todolistId===todolistId?{...tl, filter: value}:tl))
  }

  const removeTodolist=(todolistId:string)=>{
    setTodolists(todolists.filter(tl=>tl.todolistId!==todolistId))
    delete tasks[todolistId]
    setTasks({...tasks})
  }

  const addTodolist=(title:string)=>{
    let newTodolistId=v1()
    let newTodolist:TodolistsPropsType={todolistId: newTodolistId, title, filter:'all'}
    setTodolists([newTodolist,...todolists])
    setTasks({...tasks, [newTodolistId]:[]})
  }

  return (
    <div className="App">
        <InputForm addItem={addTodolist}/>
      {
        todolists.map(tl=>{

          let filterForTodolist = tasks[tl.todolistId];
          if (tl.filter === 'active') {
            filterForTodolist = filterForTodolist.filter(el => el.isDone === true);
          }
          if (tl.filter === 'completed') {
            filterForTodolist = filterForTodolist.filter(el => el.isDone === false);
          }

          return <TodoList
            key={tl.todolistId}
            todolistId={tl.todolistId}
            addTask={addTask}
            title={tl.title}
            task={filterForTodolist}
            removeTask={removeTask}
            filterChange={filterChange}
            filter={tl.filter}
            changeTaskStatus={changeTaskStatus}
            removeTodolist={removeTodolist}
            changeTaskTitle={changeTaskTitle}
          />
        })
      }
    </div>
  );
}


export default App;
