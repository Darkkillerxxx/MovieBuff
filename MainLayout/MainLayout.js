import React from 'react'
import {ToastAndroid} from 'react-native'
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
    }
   
    render()
    {
        return(
            <BuffSwitchNavigator />
        )
    }
}

export default MainLayout;