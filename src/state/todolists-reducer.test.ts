import {addTodolistAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer} from './todolists-reducer';
import {TodolistsPropsType} from '../App';
import {v1} from 'uuid';



let startState:TodolistsPropsType[]
let todolistId1 = v1()
let todolistId2 = v1()
beforeEach(()=>{
  startState= [
    {todolistId: todolistId1, title: 'What to learn?', filter: 'all'},
    {todolistId: todolistId2, title: 'What to buy?', filter: 'all'}
  ]
})
test('correct todolist should be removed',()=>{

const endStart= todolistsReducer(startState,removeTodolistAC( todolistId1))

  expect(endStart.length).toBe(1)
  expect(endStart[0].todolistId).toBe(todolistId2)
})
test('new todolist should be added',()=>{

const newTitle='new Title'

const endStart= todolistsReducer(startState,addTodolistAC(newTitle))

  expect(endStart.length).toBe(3)
  expect(endStart[2].todolistId).toBe(todolistId2)
})

test('correct todolist\'s title should be changed', ()=>{
  const newTitle='new Title'
  const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId1, newTitle))
  expect(endState[0].title).toBe('new Title')
  expect(endState[1].title).toBe('What to buy?')

})