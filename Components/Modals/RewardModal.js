import React from 'react'
import { StyleSheet,View, Image, FlatList, TouchableOpacity } from 'react-native'
import NormalText from '../NormalText'
import {Ionicons,FontAwesome} from '@expo/vector-icons'

const RewardModal=props=>{
    return(
        <View style={styles.Modal}>
            <View style={styles.ModalHeader}>
            </View>
            <View style={styles.ModalContent}>
                <Image source={require('../../assets/confetti.png')} style={{height:50,width:50}}/>
                <NormalText style={{fontSize:16,marginVertical:10}}>{props.FirstMsg}</NormalText>
                <NormalText style={{fontSize:14}}>{props.SecondMsg}</NormalText>
                <View style={styles.WinContainerSelected}>
                 <Image source={require('../../assets/coinbig.png')} style={styles.Coins}/>
                 <NormalText style={{color:"#8B96A6"}}>{props.Coins} Coins</NormalText>
             </View>
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
    },
    ModalContent:{
        backgroundColor:'#34495E',
        alignItems:'center',
        paddingVertical:30,
    },
    WinContainerSelected:{
        width:75,
        margin:5,
        padding:5,
        borderColor:'yellow',
        borderWidth:1,
        borderRadius:10,
        backgroundColor:"#4E515A",
        alignItems:'center',
    },
    Coins:{
        width:30,
        height:30,
        margin:5
    },
    CloseButtonContainer:{
        height:60,
        width:60,
        borderRadius:30,
        backgroundColor:"#FF711C",
        elevation:10,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default RewardModal;