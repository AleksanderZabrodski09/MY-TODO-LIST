import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC, TodolistsDomainType,
  todolistsReducer
} from './todolists-reducer';

import {v1} from 'uuid';
import {TodolistType} from '../api/todolist-api';


let startState: TodolistsDomainType[]
let todolistId1 = v1()
let todolistId2 = v1()
beforeEach(() => {
  startState = [
    {id: todolistId1, title: 'What to learn?', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy?', filter: 'all', addedDate: '', order: 0}
  ]
})
test('correct todolist should be removed', () => {

  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})
test('new todolist should be added', () => {

  const todolist:TodolistType =  {id: 'qwerr45', title: 'What to learn?', addedDate: '', order: 0}

  const endState = todolistsReducer(startState, addTodolistAC(todolist))

  expect(endState.length).toBe(3)
  expect(endState[2].id).toBe(todolistId2)
})

test('correct todolist\'s title should be changed', () => {
  const newTitle = 'new Title'
  const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId1, newTitle))
  expect(endState[0].title).toBe('new Title')
  expect(endState[1].title).toBe('What to buy?')

})
test('correct filter of todolist should be changed', () => {

  const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, 'completed'))
  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe('completed')

})
