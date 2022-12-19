import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer
} from './todolists-reducer';
import {TodolistsPropsType} from '../App';




let startState:TodolistsPropsType[]

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
test('correct filter of todolist should be changed', ()=>{

  const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, 'completed'))
  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe('completed')

})
