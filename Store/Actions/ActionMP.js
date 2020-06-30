import {SET_MP_QUESTIONS} from './ActionType'

export const setMPQuestions=(response)=>{
    console.log("Setting in Action")
    return{
        type:SET_MP_QUESTIONS,
        data:response
    }
}

