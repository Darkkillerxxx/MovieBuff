import React from 'react'
import { StyleSheet,View,Button, ImageBackground} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import NormalText from './NormalText';
import {Ionicons,FontAwesome} from '@expo/vector-icons'
const SmallBtn=(props)=>{
    return(
        <ImageBackground resizeMode="contain" source={require('../assets/Silverbtn.png')} style={styles.InnerButton}>
            {props.children}
        </ImageBackground>
    )
}


const styles=StyleSheet.create({
    ButtonContainer:{
        width:60,
        marginVertical:10,
        overflow:'hidden',
        height:40,
        alignItems:'center',
        justifyContent:'center'
    },
    InnerButton:{
        height:75,
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },
    InnerButtonView:{
        flexDirection:'row',
        width:'85%',
        justifyContent:'center',
        alignItems:'center'
    },
    InnerButtonView1:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    NormalText:{
        fontSize:16,
        color:'#00C08A'
    }
})
export default SmallBtn