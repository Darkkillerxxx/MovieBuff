const initialState={
    ShowAds:false
}

const AdsReducer=(state=initialState,action)=>{
    switch(action.type)
    {    
        case SET_SHOW_ADS:
            return{
                ...state,
                ShowAds:action.data
            }

        default:
            return state    
    }
}

export default AdsReducer;