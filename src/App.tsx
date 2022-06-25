import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';

export type FilterValueType = 'all' | 'active' | 'completed'
function App() {

  const [tasks, setTasks] = useState([
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "ReactJS", isDone: false},
    {id: 4, title: "TS", isDone: true},
    {id: 5, title: "Git", isDone: false}
  ])

  const removeTask = (id: number) => {
    let filteredTasks = tasks.filter(el => el.id !== id)
    setTasks(filteredTasks)
  }
  const [filter, setFilter] = useState<FilterValueType>('all')
  let filterForTodolist = tasks;
  if (filter === 'active') {
    filterForTodolist = tasks.filter(el => el.isDone === true);
  }
  if (filter ==='completed') {
    filterForTodolist = tasks.filter(el => el.isDone === false);
  }

  const filterChange = (value:FilterValueType) => {
    setFilter(value)
  }

  return (
    <div className="App">
      <TodoList
        title={'What to learn'}
        task={filterForTodolist}
        removeTask={removeTask}
        filterChange={filterChange}
      />

    </div>
  );
}


export default App;
