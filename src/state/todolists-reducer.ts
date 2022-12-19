import {TodolistsPropsType} from '../App';


type TodolistsReducerActionType={
  type:string
  [key:string]:any
}


  const initialState:TodolistsPropsType[] = []

export const todolistsReducer=(state = initialState, action:TodolistsReducerActionType)=>{
  switch (action.type){
    case '':{

    }
    case '':{

    }
    default:
      return state
  }
}