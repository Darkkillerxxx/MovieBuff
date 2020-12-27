import {SET_DASHBOARD,SET_REWARDS} from './ActionType'

export const setDashboard=(response)=>{
    return{
        type:SET_DASHBOARD,
        data:response
    }
}

export const setRewards=(response)=>{
    // console.log("From Action",response)
    return{
        type:SET_REWARDS,
        data:response
    }
}

