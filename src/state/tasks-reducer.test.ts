import {addTodolistAC, removeTodolistAC} from './todolists-reducer';
import {TasksPropsType} from '../App';

import {addTaskAC, removeTaskAC, tasksReducer} from './tasks-reducer';


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

const endState= tasksReducer(startState,removeTaskAC( 'todolistId1', '2'))

  expect(endState).toEqual({
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

  expect(endState['todolistId1'].length).toBe(2)
  expect(endState['todolistId2'].length).toBe(3)
  expect(endState['todolistId1'][1].title).toBe('ReactJS')
})
test('new task should be added',()=>{

const newTitle='new task'

const endState= tasksReducer(startState,addTaskAC('todolistId2',newTitle))

  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'][0].title).toBe('new task')

})
test('new array should be added, when new todolist is added',()=>{

const newTitle='new todolist';

const endState= tasksReducer(startState,addTodolistAC(newTitle))

const keys=Object.keys(endState)
const newKey = keys.find(k=> k!='todolistId1' && k!='todolistId2')
  if(!newKey)
    throw Error('new key should be added')

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted',()=> {

  const endState = tasksReducer(startState, removeTodolistAC('todolistId2'))

  let keys = Object.keys(endState)
  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})

test('')

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
