import {addTodolistAC, changeTodolistFilterAC, removeTodolistAC} from './todolists-reducer';
import {TasksPropsType} from '../App';

import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';


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

test('correct status of task should be changed', ()=>{

  const endState = tasksReducer(startState, changeTaskStatusAC('todolistId1', '2', false))

expect(endState['todolistId1'][1].isDone).toBe(false)
expect(endState['todolistId1'][0].isDone).toBe(true)

})


test('correct title of task should be changed', ()=>{


  const endState = tasksReducer(startState, changeTaskTitleAC('todolistId1', '2', 'TS'))

  expect(endState['todolistId1'][1].title).toBe('TS')
  expect(endState['todolistId2'][1].title).toBe('laptop')
})

