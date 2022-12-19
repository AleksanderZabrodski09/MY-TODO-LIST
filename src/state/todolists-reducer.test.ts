import {addTodolistAC, removeTodolistAC, todolistsReducer} from './todolists-reducer';
import {TodolistsPropsType} from '../App';
import {v1} from 'uuid';


test('correct todolist should be removed',()=>{

  let todolistId1 = v1()
  let todolistId2 = v1()
const startState:TodolistsPropsType[]= [
  {todolistId: todolistId1, title: 'What to learn?', filter: 'all'},
  {todolistId: todolistId2, title: 'What to buy?', filter: 'all'}
]

const endStart= todolistsReducer(startState,removeTodolistAC( todolistId1))

  expect(endStart.length).toBe(1)
  expect(endStart[0].todolistId).toBe(todolistId2)
})
test('new todolist should be added',()=>{

  let todolistId1 = v1()
  let todolistId2 = v1()
const startState:TodolistsPropsType[]= [
  {todolistId: todolistId1, title: 'What to learn?', filter: 'all'},
  {todolistId: todolistId2, title: 'What to buy?', filter: 'all'}
]
const newTitle='new Title'

const endStart= todolistsReducer(startState,addTodolistAC(newTitle))

  expect(endStart.length).toBe(3)
  expect(endStart[2].todolistId).toBe(todolistId2)
})

