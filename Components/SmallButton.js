import React from 'react'
import { StyleSheet,View,Button} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import NormalText from './NormalText';
import {Ionicons,FontAwesome} from '@expo/vector-icons'
const SmallBtn=(props)=>{
    return(
        // <View style={styles.ButtonContainer}>
        //     {props.children}
        // </View>

        <LinearGradient
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 0}}
             colors={[props.color1,props.color2,props.color3,props.color4]}
             style={styles.ButtonContainer}>
            <View style={styles.InnerButton}>
                <View style={styles.InnerButtonView1}>
                   {props.children}
                </View>
            </View>
        </LinearGradient>
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
        height:36,
        width:'97%',
        backgroundColor:"#1D3451",
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
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