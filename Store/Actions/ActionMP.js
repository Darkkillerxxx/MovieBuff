import {SET_MP_QUESTIONS,SET_USERS} from './ActionType'

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

