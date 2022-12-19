import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer
} from './todolists-reducer';
import {TasksPropsType} from '../App';

import {removeTaskAC, tasksReducer} from './tasks-reducer';


let startState:TasksPropsType

beforeEach(()=>{
  startState = {
    'todolistId1': [
      {id: '1', title: "HTML&CSS", isDone: true},
      {id: '2', title: "JS", isDone: true},
      {id: '3', title: "ReactJS", isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: "curs-JS", isDone: true},
      {id: '2', title: "laptop", isDone: false},
      {id: '3', title: "screen", isDone: false}
    ]
  }
})
test('correct task should be removed',()=>{

const endStart= tasksReducer(startState,removeTaskAC( 'todolistId1', '2'))

  expect(endStart).toEqual({
    'todolistId1': [
      {id: '1', title: "HTML&CSS", isDone: true},
      {id: '3', title: "ReactJS", isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: "curs-JS", isDone: true},
      {id: '2', title: "laptop", isDone: false},
      {id: '3', title: "screen", isDone: false}
    ]
  })

  expect(endStart['todolistId1'].length).toBe(2)
  expect(endStart['todolistId2'].length).toBe(3)
  expect(endStart['todolistId1'][1].title).toBe('ReactJS')
})
// test.skip('new todolist should be added',()=>{
//
// const newTitle='new Title'
//
// const endStart= todolistsReducer(startState,addTodolistAC(newTitle))
//
//   expect(endStart.length).toBe(3)
//   expect(endStart[2].todolistId).toBe(todolistId2)
// })
//
// test.skip('correct todolist\'s title should be changed', ()=>{
//   const newTitle='new Title'
//   const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId1, newTitle))
//   expect(endState[0].title).toBe('new Title')
//   expect(endState[1].title).toBe('What to buy?')
//
// })
// test.skip('correct filter of todolist should be changed', ()=>{
//
//   const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, 'completed'))
//   expect(endState[0].filter).toBe('all')
//   expect(endState[1].filter).toBe('completed')
//
// })
