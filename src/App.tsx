import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';


function App() {

  const [tasks, setTasks] =useState( [
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "ReactJS", isDone: false},
    {id: 4, title: "TS", isDone: true},
    {id: 5, title: "Redux", isDone: false}
  ])

  const removeTask = (id: number) => {
    let filteredTask = tasks.filter(el => el.id !== id)
    setTasks(filteredTask)
  }

  return (
    <div className="App">
      <TodoList
        title={'What to learn'}
        tasks={tasks}
        removeTask={removeTask}
      />

    </div>
  );
}


export default App;
