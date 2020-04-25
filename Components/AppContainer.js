import React from 'react'
import { StyleSheet,View,ImageBackground } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const AppContainer=(props)=>{
    return(
         <LinearGradient
             colors={['#11233A', '#192E4A', '#1D3451']}
             style={styles.AppContainer}>
                 {props.children}
        </LinearGradient>
        // <ImageBackground source={require('../assets/background.png')} style={{flex:1,resizeMode:'cover'}}>
        // {props.children}
        // </ImageBackground>
        
        
    )
} 

const styles=StyleSheet.create({
    AppContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})


export default AppContainer