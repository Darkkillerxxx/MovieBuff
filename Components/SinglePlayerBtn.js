import React from 'react'
import { StyleSheet,View,Button, ImageBackground,Image} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import NormalText from './NormalText';
import {Ionicons,FontAwesome} from '@expo/vector-icons'
const SinglePlayer=(props)=>{
    return(
        // <View style={styles.ButtonContainer}>
        //     {props.children}
        // </View>
        <View style={{width:'100%',height:50,alignItems:'center'}}>
            <FontAwesome name={props.icon} size={18} color={'white'} style={{marginVertical:5}}/>
            {props.children}
            <Image source={require('../assets/Yellow.png')} style={{width:'100%',height:75,resizeMode:'contain',marginTop:-60,zIndex:-1}} />
        </View>
    //    <ImageBackground  style={styles.InnerButton}>

    //    </ImageBackground>
    )
}


const styles=StyleSheet.create({
    ButtonContainer:{
        width:'95%',
        marginVertical:10,
        overflow:'hidden',
        borderRadius:25,
        height:40,
        alignItems:'center',
        justifyContent:'center'
    },
    InnerButton:{
        height:70,
        width:70,
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        resizeMode:'contain'
    },
    InnerButtonView:{
        flexDirection:'row',
        width:'85%',
        justifyContent:'center',
        alignItems:'center'
    },
    InnerButtonView1:{
        flexDirection:'row',
        width:'15%',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    NormalText:{
        fontSize:16,
        color:'#00C08A'
    }
})
export default SinglePlayer