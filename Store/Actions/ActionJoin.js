import {SET_FB, SET_LOGIN, SET_PREVPAGE} from './ActionType'

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

export const setPrevPage=(page)=>{
    console.log("Action Join")
    return{
        type:SET_PREVPAGE,
        data:page
    }
}