import {SET_DASHBOARD,SET_REWARDS} from '../Actions/ActionType'

const initialState={
    Dashboard:{},
    Rewards:null
}


const DashboardReducer=(state=initialState,action)=>{
    
    switch(action.type)
    {    
        case SET_DASHBOARD:
            return{
                ...state,
                Dashboard:action.data
            }
        
        case SET_REWARDS:
                return {
                    ...state,
                    Rewards:action.data
                }
            

        default:
            return state    
    }
}

export default DashboardReducer;