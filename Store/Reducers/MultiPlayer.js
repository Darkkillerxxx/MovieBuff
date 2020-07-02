import {SET_MP_QUESTIONS, SET_USERS} from '../Actions/ActionType'

const initialState={
  Questions:[],
  Users:[]
}


const MPReducer=(state=initialState,action)=>{
    switch(action.type)
    {    
        case SET_MP_QUESTIONS:
            return{
                ...state,
                Questions:action.data
            }
        
        case SET_USERS:
            return{
                ...state,
                Users:action.data
            }

        default:
            return state    
    }
}

export default MPReducer;