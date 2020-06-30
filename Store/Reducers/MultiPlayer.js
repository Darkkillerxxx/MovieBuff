import {SET_MP_QUESTIONS} from '../Actions/ActionType'

const initialState={
  Questions:[]
}


const MPReducer=(state=initialState,action)=>{
    switch(action.type)
    {    
        case SET_MP_QUESTIONS:
            console.log("Setting in Reducer")
            return{
                ...state,
                Questions:action.data
            }

        default:
            return state    
    }
}

export default MPReducer;