import {SET_GAME} from '../Actions/ActionType'

const initialState={
  GamePayload:{
      Questions:5,
      Region:[1]
  }
}


const SPReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case SET_GAME:
            return{
                ...state,
                GamePayload:action.data
            }

        default:
            return state    
    }
}

export default SPReducer;