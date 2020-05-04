import {SET_GAME} from './ActionType'

export const setGame=(response)=>{
    return{
        type:SET_GAME,
        data:response
    }
}
