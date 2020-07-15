import React from 'react'
import {ToastAndroid,AppState} from 'react-native'
import BuffSwitchNavigator from '../Navigator/BuffNavigator'
import {SetUnitId} from '../Utils/RewardedAds'
import {getAvatarList} from '../Utils/api'
import {setAppStatus} from '../Store/Actions/ActionMP'
import { connect } from 'react-redux'

class MainLayout extends React.Component{
   
    componentDidMount=()=>{
        SetUnitId().then((result)=>{
            if(result)
            {
                console.log("Unit Id Set")
            }
            else
            {
                ToastAndroid.show("Error Setting Ad Unit Id",ToastAndroid.SHORT)
            }
        }).catch(err=>{
            ToastAndroid.show("Error Setting Ad Unit Id",ToastAndroid.SHORT)
        })
        
        AppState.addEventListener('change', state => {
            console.log("App State Change",state)
            if (state === 'active') {
                this.props.onSetAppStatus('Active')
            } else if (state === 'background') {
              this.props.onSetAppStatus('background')
            } else if (state === 'inactive') {
              // do that other thing
            }
          });
    }

    CheckAppStatus=(clear)=>{
        getAvatarList().then(result=>{
            console.log(result)
        })            
    }

    

    render()
    {
        return(
            <BuffSwitchNavigator />
        )
    }
}


const mapStateToProps= state =>{
    return{
      AppStatus:state.MP.AppStatus
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onSetAppStatus:(response)=>dispatch(setAppStatus(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainLayout);