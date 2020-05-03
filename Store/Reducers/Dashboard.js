import {SET_DASHBOARD} from '../Actions/ActionType'

const initialState={
    Dashboard:{}
}


const DashboardReducer=(state=initialState,action)=>{
    switch(action.type)
    {    
        case SET_DASHBOARD:
            return{
                ...state,
                Dashboard:action.data
            }

        default:
            return state    
    }
}

export default DashboardReducer;