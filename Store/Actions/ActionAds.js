import {SET_SHOW_ADS} from './ActionType'

export const setDashboard=(response)=>{
    return{
        type:SET_SHOW_ADS,
        data:response
    }
}