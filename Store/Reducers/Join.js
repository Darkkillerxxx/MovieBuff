import {SET_FB, SET_LOGIN} from '../Actions/ActionType'


const initialState={
    FBDetails:null,
    LoginDetails:{}
}


const JoinReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case SET_FB:
            return{
                ...state,
                FBDetails:action.data
            }
        
        case SET_LOGIN:
            return{
                ...state,
                LoginDetails:action.data
            }

        default:
            return state    
    }
}

export default JoinReducer;

