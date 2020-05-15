import React from 'react'
import {View,Image, StyleSheet,TouchableOpacity,TouchableWithoutFeedback} from 'react-native'
import NormalText from '../NormalText'
import {Ionicons,FontAwesome} from '@expo/vector-icons'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'


const SettingsModal=(props)=>{
    return(
        <View style={styles.Modal}>
            <View style={styles.ModalHeader}>
            
            </View>
            <View style={styles.ModalContent}>
                <TouchableOpacity style={{width:'100%'}}>
                    <View style={{flexDirection:'row',alignItems:"center",justifyContent:'center',width:'100%',marginVertical:5}}>
                        <FontAwesome name="question" size={24} color='white' />
                        <NormalText style={{marginHorizontal:20}}>Help</NormalText>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity style={{width:'100%'}} onPress={()=>props.Logout()}>
                    <View style={{flexDirection:'row',alignItems:"center",justifyContent:'center',width:'100%',marginVertical:5}}>
                        <FontAwesome name="power-off" size={24} color='white' />
                        <NormalText style={{marginHorizontal:20}}>Logout</NormalText>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.ModalFooter}>
                <TouchableOpacity onPress={()=>props.DismissModal()}>
                    <View style={styles.CloseButtonContainer}>
                        <FontAwesome name="close" size={24} color='white'/>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    ModalContent:{
        backgroundColor:'#34495E',
        alignItems:'center',
        paddingVertical:30,
    },
    CloseButtonContainer:{
        height:60,
        width:60,
        marginTop:25,
        borderRadius:30,
        backgroundColor:"#FF711C",
        elevation:10,
        alignItems:'center',
        justifyContent:'center'
    },
    ModalHeader:{
        height:30,
        backgroundColor:'#23ABDD',
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        paddingRight:10
    },
    ModalFooter:{
        height:30,
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25,
        backgroundColor:'#23ABDD',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    Modal:{
        backgroundColor:'white',
        margin:40,
        borderRadius:25
    }
})

export default SettingsModal;