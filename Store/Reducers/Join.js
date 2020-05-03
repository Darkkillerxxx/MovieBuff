import {SET_FB, SET_LOGIN} from '../Actions/ActionType'


const initialState={
    FBDetails:null,
    LoginDetails:{
        "Country":"india",
        "FbId": "",
        "ScreenName":"",
        "FirstName":"",
        "LastName":"",
        "MaritalStatus":"true",
        "Profession":"",
        "EmailId":"",
        "AvatarId":1,
        "AvatarBase64":"",
        "AvatarFacebook":"",
        "SelectedGenre":"",
        "SelectedRegion":""
    }
}


const JoinReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case SET_FB:
            return{
                ...state,
                FBDetails:action.data
            }
        
        case SET_LOGIN:
            return{
                ...state,
                LoginDetails:action.data
            }

        default:
            return state    
    }
}

export default JoinReducer;

