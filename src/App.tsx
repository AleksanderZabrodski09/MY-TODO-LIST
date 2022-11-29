import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {v1} from 'uuid';

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

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
  const [filter, setFilter] = useState<FilterValueType>('all')
  let filterForTodolist = tasks;
  if (filter === 'active') {
    filterForTodolist = tasks.filter(el => el.isDone === true);
  }
  if (filter === 'completed') {
    filterForTodolist = tasks.filter(el => el.isDone === false);
  }

  const filterChange = (value: FilterValueType) => {
    setFilter(value)
  }
  const changeTaskStatus = (taskId: string, value: boolean) => {
    setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: value} : t))
  }



  return (
    <div className="App">
      <TodoList
        addTask={addTask}
        title={'What to learn'}
        task={filterForTodolist}
        removeTask={removeTask}
        filterChange={filterChange}
        changeTaskStatus={changeTaskStatus}
      />

    </div>
  );
}


export default App;
