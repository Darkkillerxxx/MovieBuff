import {SET_GAME,SET_QUESTIONS} from '../Actions/ActionType'

const initialState={
  GamePayload:{
      Questions:5,
      Region:[1]
  },
  Questions:[]

}


const SPReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case SET_GAME:
            return{
                ...state,
                GamePayload:action.data
            }
        
        case SET_QUESTIONS:
            return{
                ...state,
                Questions:action.data
            }

        default:
            return state    
    }
}

export default SPReducer;