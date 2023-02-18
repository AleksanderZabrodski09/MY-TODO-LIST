import {appReducer, InitialStateType, setErrorAC, setLoadingStatusAC} from './app-reducer';


let startState:InitialStateType;

beforeEach(()=>{
  startState={
    error: null,
    status: 'idle'
  }
})

test('correct error message should be set', ()=> {
  const endState = appReducer(startState, setErrorAC('some error'))

  expect(endState.error).toBe('some error')
})

test('correct status should be set', ()=>{
  const endStatus= appReducer(startState, setLoadingStatusAC('loading'))

  expect(endStatus.status).toBe('loading')
})