import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {v1} from 'uuid';


export type TodolistsPropsType={
  todolistId: string
  title:string
  filter:FilterValueType
}
export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

  const todolistId1=v1();
  const todolistId2=v1();

  const[todolists, setTodolists]=useState<TodolistsPropsType[]>([
    {todolistId: todolistId1, title:'What to learn?', filter:'all'},
    {todolistId: todolistId2, title:'What to buy?', filter:'all'}
  ])
  const [tasks, setTasks] = useState([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "TS", isDone: true},
    {id: v1(), title: "Git", isDone: false}
  ])


  const addTask = (title: string) => {
    let task = {id: v1(), title: title, isDone: false};
    let newTasks = [task, ...tasks];
    setTasks(newTasks);
  }
  const removeTask = (id: string) => {
    let filteredTasks = tasks.filter(el => el.id !== id)
    console.log(filteredTasks)
    setTasks(filteredTasks)
  }
  // const [filter, setFilter] = useState<FilterValueType>('all')
  // let filterForTodolist = tasks;
  // if (filter === 'active') {
  //   filterForTodolist = tasks.filter(el => el.isDone === true);
  // }
  // if (filter === 'completed') {
  //   filterForTodolist = tasks.filter(el => el.isDone === false);
  // }

  const filterChange = (todolistId:string,value: FilterValueType) => {
    setTodolists(todolists.map(tl=>tl.todolistId===todolistId?{...tl, filter: value}:tl))
  }
  const changeTaskStatus = (taskId: string, value: boolean) => {
    setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: value} : t))
  }



  return (
    <div className="App">
      {
        todolists.map(tl=>{

          let filterForTodolist = tasks;
          if (tl.filter === 'active') {
            filterForTodolist = tasks.filter(el => el.isDone === true);
          }
          if (tl.filter === 'completed') {
            filterForTodolist = tasks.filter(el => el.isDone === false);
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

          />
        })
      }


    </div>
  );
}


export default App;
