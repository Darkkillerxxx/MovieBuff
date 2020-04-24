import React from 'react'
import { StyleSheet,View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const AppContainer=(props)=>{
    return(
         <LinearGradient
             colors={['#11233A', '#192E4A', '#1D3451']}
             style={styles.AppContainer}>
                 {props.children}
        </LinearGradient>
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