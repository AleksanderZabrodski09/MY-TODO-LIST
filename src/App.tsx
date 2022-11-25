import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';
import {AddInputForm} from './components/AddInputForm';

export type FilterValueType = 'all' | 'active' | 'completed';
export type TodolistType = {
  todolistId: string
  title: string
  filter: FilterValueType
}

export type TasksPropsType = {
  [key: string]: TaskType[]
}

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();
  const [todolists, setTodolists] = useState<TodolistType[]>([
    {todolistId: todolistId1, title: 'What to learn?', filter: 'all'},
    {todolistId: todolistId2, title: 'What to bay?', filter: 'all'},
  ])

  const [tasks, setTasks] = useState<TasksPropsType>({
      [todolistId1]: [{id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "TS", isDone: true},
        {id: v1(), title: "Redux", isDone: false}
      ],

      [todolistId2]: [{id: v1(), title: "Bread", isDone: true},
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "juice", isDone: false},
        {id: v1(), title: "apple", isDone: false}
      ]
    }
  )
  const addTask = (todolistId: string, title: string) => {
    setTasks({...tasks, [todolistId]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistId]]})
  }
  const removeTask = (todolistId: string, taskId: string) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    console.log(tasks)
  }
  const changeTaskStatus = (todolistId: string, taskId: string, value: boolean) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: value} : t)})

  }

  const addTodolist = (todolistId: string, title: string) => {
    // setTodolists([...todolists, {todolistId: todolistId, title: title, filter: 'all'}])
  }

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.todolistId !== todolistId))
    delete tasks[todolistId]
    setTasks({...tasks})
  }


  const changeFilter = (todolistId: string, value: FilterValueType) => {
    setTodolists(todolists.map(tl => tl.todolistId === todolistId ? {...tl, filter: value} : tl))
  }


  return (
    <div className="App">
      <AddInputForm addInput={addTodolist}/>
      {
        todolists.map(tl => {
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
              removeTodolist={removeTodolist}
            />

          }
        )
      }


    </div>
  );
}


export default App;
