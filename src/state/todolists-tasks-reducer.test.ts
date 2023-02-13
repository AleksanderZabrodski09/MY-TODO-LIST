import {TasksPropsType} from '../AppWithRedux';
import {addTodolistAC, todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';


test('ids should be equals', ()=>{
  const startTasksState:TasksPropsType= {}
  const startTodolistsState: Array<TodolistsDomainType>=[]

  let todolist:TodolistType={
    id:'qwertt',
    title:'New Todolist',
    order:0,
    addedDate:''
  }

  const action = addTodolistAC(todolist)

  const endTaskState=tasksReducer(startTasksState, action)
  const endTodolistsState=todolistsReducer(startTodolistsState,action)

  const keys= Object.keys(endTaskState)
  const idFromTasks=keys[0]
  const idFromTodolists=endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})