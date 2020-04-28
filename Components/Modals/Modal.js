import React from 'react'
import {View,Image, StyleSheet,TouchableOpacity} from 'react-native'
import NormalText from '../NormalText'
import {Ionicons,FontAwesome} from '@expo/vector-icons'


const CustomModal=(props)=>{
    return(
        <View style={styles.Modal}>
        <View style={styles.ModalHeader}>
           
        </View>
        <View style={styles.ModalContent}>
            <NormalText style={styles.ModalContentHeading}>Choose Game Type</NormalText>
            <View style={styles.ModalOverView}>
                <View style={styles.ModalGameStyleButtonSelected}>
                    <NormalText style={styles.ModalButtonTextStyleSelected}>Random Game</NormalText>
                </View>
                <View style={styles.ModalGameStyleButtonUnselected}>
                    <NormalText style={styles.ModalButtonTextStyleUnselected}>Custom Game</NormalText>
                </View>
            </View>

            <NormalText style={styles.ModalContentHeading}>Choose Game Time</NormalText>
            <View style={styles.ModalOverView}>
                <View style={styles.ModalGameStyleButtonSelected}>
                    <NormalText style={styles.ModalButtonTextStyleSelected}>15 sec</NormalText>
                </View>
                <View style={styles.ModalGameStyleButtonUnselected}>
                    <NormalText style={styles.ModalButtonTextStyleUnselected}>30 sec</NormalText>
                </View>
                <View style={styles.ModalGameStyleButtonUnselected}>
                    <NormalText style={styles.ModalButtonTextStyleUnselected}>45 sec</NormalText>
                </View>
            </View>
        </View>
        <View style={styles.ModalFooter}>
            <TouchableOpacity>
                <View style={styles.CloseButtonContainer}>
                    <FontAwesome name="close" size={24} color='white'/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>props.ProceedToCustom()}>
                <View style={styles.PlayButtonContainer}>
                    <FontAwesome name="play" size={24} color='white'/>
                </View>
            </TouchableOpacity>
        </View>             
    </View>
    )
}

const styles=StyleSheet.create({
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
    PlayButtonContainer:{
        height:60,
        width:60,
        marginTop:25,
        borderRadius:30,
        backgroundColor:"#00DF9B",
        elevation:10,
        alignItems:'center',
        justifyContent:'center'
    },
    ModalGameStyleButtonUnselected:{
        borderColor:'#00C0E4',
        borderWidth:1,
        paddingHorizontal:15,
        paddingVertical:6,
        marginHorizontal:5,
        borderRadius:5
    },
    ModalButtonTextStyleUnselected:{
        fontSize:14,
        color:"#00C0E4"
    },
    ModalGameStyleButtonSelected:{
        backgroundColor:'#00C0E4',
        borderWidth:1,
        borderColor:"#00C0E4",
        paddingHorizontal:15,
        paddingVertical:7,
        marginHorizontal:5,
        borderRadius:5
    },
    ModalButtonTextStyleSelected:{
        fontSize:14,
        color:"white"
    },
    ModalOverView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginVertical:10
    },
    ModalContentPic:{
        height:75,
        width:75,
        marginTop:15
    },
    ModalHeading:{
        fontSize:18
    },
    ModalContentHeading:{
        fontSize:15
    },
    ModalContent:{
        backgroundColor:'#34495E',
        alignItems:'center',
        paddingVertical:30,
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
    },
})


export default CustomModal