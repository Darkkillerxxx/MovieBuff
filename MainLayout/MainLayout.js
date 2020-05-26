import React from 'react'
import {ToastAndroid} from 'react-native'
import BuffNavigator from '../Navigator/BuffNavigator'
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
            <BuffNavigator />
        )
    }
}

export default MainLayout;