import {SET_GAME,SET_QUESTIONS} from './ActionType'

export const setGame=(response)=>{
    return{
        type:SET_GAME,
        data:response
    }
}

export const setQuestions=(response)=>{
    return{
        type:SET_QUESTIONS,
        data:response
    }
}

