import {SET_DASHBOARD} from './ActionType'

export const setDashboard=(response)=>{
    return{
        type:SET_DASHBOARD,
        data:response
    }
}

