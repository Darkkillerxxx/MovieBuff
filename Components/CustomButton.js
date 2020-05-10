import React from 'react'
import { StyleSheet,View,Button} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import {FontAwesome} from '@expo/vector-icons'

const CustomButton=(props)=>{
    return(
        // <View style={styles.ButtonContainer}>
        //     {props.children}
        // </View>

        <LinearGradient
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 0}}
             colors={['#008BD9', '#00AECD', '#00DA97',"#00F56F"]}
             style={styles.ButtonContainer}>
            <View style={styles.InnerButton}>
                {props.LeftIcon !== null ? 
                 <View style={styles.InnerButtonView1}>
                    <FontAwesome name="user" size={18} color="#00C08A"/>
                </View>:null}
                <View style={styles.InnerButtonView}>
                    {props.children}
                </View>
                {props.RightIcon !== null ? 
                 <View style={styles.InnerButtonView1}>
                    <FontAwesome name={props.RightIcon} size={14} color="#00C08A"/>
                </View>:null}
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
        width:'50%',
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

export default CustomButton;
