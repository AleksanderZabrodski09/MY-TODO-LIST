import {addTodolistAC, removeTodolistAC} from './todolists-reducer';
import {
  addTaskAC,
  removeTaskAC,
  TasksPropsType,
  tasksReducer, updateTaskAC
} from './tasks-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';


let startState:TasksPropsType

beforeEach(()=>{
  startState = {
    'todolistId1': [
      {id: '1', title: "HTML&CSS", status: TaskStatuses.Completed, order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''},
      {id: '2', title: "JS", status: TaskStatuses.Completed,order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''},
      {id: '3', title: "ReactJS", status: TaskStatuses.New,order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''}
    ],
    'todolistId2': [
      {id: '1', title: "curs-JS", status: TaskStatuses.Completed, order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''},
      {id: '2', title: "laptop", status: TaskStatuses.New,order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''},
      {id: '3', title: "screen", status: TaskStatuses.New,order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''}
    ]
  }
})
test('correct task should be removed',()=>{

const endState= tasksReducer(startState,removeTaskAC( 'todolistId1', '2'))

  expect(endState).toEqual({
    'todolistId1': [
      {id: '1', title: "HTML&CSS", status: TaskStatuses.Completed, order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''},
      {id: '3', title: "ReactJS", status: TaskStatuses.New, order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''}
    ],
    'todolistId2': [
      {id: '1', title: "curs-JS", status: TaskStatuses.Completed, order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''},
      {id: '2', title: "laptop", status: TaskStatuses.New, order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''},
      {id: '3', title: "screen", status: TaskStatuses.New, order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''}
    ]
  })

  expect(endState['todolistId1'].length).toBe(2)
  expect(endState['todolistId2'].length).toBe(3)
  expect(endState['todolistId1'][1].title).toBe('ReactJS')
})
test('new task should be added',()=>{

const task= {id: '4', title: "new task", status: TaskStatuses.Completed, order: 0, addedDate: '', todoListId: 'todolistId1', priority: TaskPriorities.Hi, startDate: '', deadline: '', description: ''}

const endState= tasksReducer(startState,addTaskAC(task))

  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'][0].title).toBe('new task')

})
test('new array should be added, when new todolist is added',()=>{


const endState= tasksReducer(startState,addTodolistAC({
  id:'qewqwet',
  title: 'new todolist',
  order:0,
  addedDate:''}))

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

  const endState = tasksReducer(startState, updateTaskAC('todolistId1', '2', {status:TaskStatuses.New}))

expect(endState['todolistId1'][1].status).toBe(false)
expect(endState['todolistId1'][0].status).toBe(true)

})


test('correct title of task should be changed', ()=>{


  const endState = tasksReducer(startState, updateTaskAC('todolistId1', '2', {title:'TS'}))

  expect(endState['todolistId1'][1].title).toBe('TS')
  expect(endState['todolistId2'][1].title).toBe('laptop')
})

