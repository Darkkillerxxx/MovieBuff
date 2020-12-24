import {SET_MP_QUESTIONS, SET_USERS,SET_STATUS} from '../Actions/ActionType'

const initialState={
  Questions:[],
  Users:[],
  AppStatus:null
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
        
        case SET_STATUS:
            return{
                ...state,
                AppStatus:action.data
            }

        default:
            return state    
    }
}

export default MPReducer;