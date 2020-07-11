import React from 'react'
import {ToastAndroid,AppState} from 'react-native'
import BuffSwitchNavigator from '../Navigator/BuffNavigator'
import {SetUnitId} from '../Utils/RewardedAds'

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
        
        // AppState.addEventListener('change', state => {
        //     console.log("App State Change",state)
        //     if (state === 'active') {
        //       // do this
        //     } else if (state === 'background') {
        //       // do that
        //     } else if (state === 'inactive') {
        //       // do that other thing
        //     }
        //   });
    }

    

    render()
    {
        return(
            <BuffSwitchNavigator />
        )
    }
}

export default MainLayout;