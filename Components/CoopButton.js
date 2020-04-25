import React from 'react'
import { StyleSheet,View,Button} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import NormalText from './NormalText';
import {Ionicons,FontAwesome} from '@expo/vector-icons'
const Coop=(props)=>{
    return(
        // <View style={styles.ButtonContainer}>
        //     {props.children}
        // </View>

        <LinearGradient
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 0}}
             colors={['#FF711C', '#FF6C30', '#FF5D60',"#FF5D60"]}
             style={styles.ButtonContainer}>
            <View style={styles.InnerButton}>
                <View style={styles.InnerButtonView1}>
                    <FontAwesome name="group" size={16} color="#FF5D60"/>
                </View>
                <View style={styles.InnerButtonView}>
                    {props.children}
                </View>
            </View>
        </LinearGradient>
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
        height:36,
        width:'97%',
        borderRadius:20,
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
        width:'15%',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    NormalText:{
        fontSize:16,
        color:'#00C08A'
    }
})
export default Coop