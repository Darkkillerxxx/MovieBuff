import {SET_FB, SET_LOGIN} from './ActionType'

export const setFB=(FBResponse)=>{
    return{
        type:SET_FB,
        data:FBResponse
    }
}

export const setLogin=(LoginResponse)=>{
    return{
        type:SET_LOGIN,
        data:LoginResponse
    }
}