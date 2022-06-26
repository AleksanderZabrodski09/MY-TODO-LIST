import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {v1} from 'uuid';

export type FilterValueType = 'all' | 'active' | 'completed';

function App() {

  const [tasks, setTasks] = useState([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "TS", isDone: true},
    {id: v1(), title: "Redux", isDone: false}
  ])

  const removeTask = (id: string) => {
    let filteredTask = tasks.filter(el => el.id !== id)
    setTasks(filteredTask)
  }
  const [filter, setFilter] = useState<FilterValueType>('all')
  let tasksTodolist = tasks
  if (filter === 'active') {
    tasksTodolist = tasks.filter(el => el.isDone === false)
  }
  if (filter === 'completed') {
    tasksTodolist = tasks.filter(el => el.isDone === true)
  }
  const changeFilter = (value: FilterValueType) => {
    console.log(value)
    setFilter(value)
  }


  return (
    <div className="App">
      <TodoList
        title={'What to learn'}
        tasks={tasksTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />

    </div>
  );
}


export default App;
