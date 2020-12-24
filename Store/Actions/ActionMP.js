import {SET_MP_QUESTIONS,SET_USERS,SET_STATUS} from './ActionType'

export const setMPQuestions=(response)=>{
    return{
        type:SET_MP_QUESTIONS,
        data:response
    }
}

export const setUsers=(response)=>{
    return{
        type:SET_USERS,
        data:response
    }
}


export const setAppStatus=(response)=>{
    return{
        type:SET_STATUS,
        data:response
    }
}
