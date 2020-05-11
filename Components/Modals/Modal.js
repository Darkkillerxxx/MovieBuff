import React from 'react'
import {View,Image, StyleSheet,TouchableOpacity,TouchableWithoutFeedback} from 'react-native'
import NormalText from '../NormalText'
import {Ionicons,FontAwesome} from '@expo/vector-icons'


const CustomModal=(props)=>{
    
    
    
    return(
        <View style={styles.Modal}>
        <View style={styles.ModalHeader}>
           
        </View>
        <View style={styles.ModalContent}>
            <NormalText style={styles.ModalContentHeading}>Choose Number of Questions</NormalText>
            <View style={styles.ModalOverView}>
                <TouchableWithoutFeedback onPress={()=>props.SetQuestions(5)}>
                    <View style={props.Questions === 5 ? styles.ModalGameStyleButtonSelected:styles.ModalGameStyleButtonUnselected}>
                            <NormalText style={props.Questions === 5 ? styles.ModalButtonTextStyleSelected:styles.ModalButtonTextStyleUnselected}>5 Questions</NormalText>
                            <NormalText style={props.Questions === 5 ? styles.ModalButtonTextStyleSelected:styles.ModalButtonTextStyleUnselected}>100 Seconds</NormalText>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>props.SetQuestions(15)}>
                    <View style={props.Questions === 15 ? styles.ModalGameStyleButtonSelected:styles.ModalGameStyleButtonUnselected}>
                            <NormalText style={props.Questions === 15 ? styles.ModalButtonTextStyleSelected:styles.ModalButtonTextStyleUnselected}>15 Questions</NormalText>
                            <NormalText style={props.Questions === 15 ? styles.ModalButtonTextStyleSelected:styles.ModalButtonTextStyleUnselected}>250 Seconds</NormalText>
                    </View>
                </TouchableWithoutFeedback>
               
            </View>

            <View style={styles.ModalOverView}>
                 <TouchableWithoutFeedback onPress={()=>props.SetQuestions(25)}>
                    <View style={props.Questions === 25 ? styles.ModalGameStyleButtonSelected:styles.ModalGameStyleButtonUnselected}>
                            <NormalText style={props.Questions === 25 ? styles.ModalButtonTextStyleSelected:styles.ModalButtonTextStyleUnselected}>25 Questions</NormalText>
                            <NormalText style={props.Questions === 25 ? styles.ModalButtonTextStyleSelected:styles.ModalButtonTextStyleUnselected}>500 Seconds</NormalText>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>props.SetQuestions(30)}>
                    <View style={props.Questions === 30 ? styles.ModalGameStyleButtonSelected:styles.ModalGameStyleButtonUnselected}>
                            <NormalText style={props.Questions === 30 ? styles.ModalButtonTextStyleSelected:styles.ModalButtonTextStyleUnselected}>30 Questions</NormalText>
                            <NormalText style={props.Questions === 30 ? styles.ModalButtonTextStyleSelected:styles.ModalButtonTextStyleUnselected}>600 Seconds</NormalText>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <NormalText style={styles.ModalContentHeading}>Choose Region</NormalText>
            <View style={styles.ModalOverView}>
                <TouchableWithoutFeedback onPress={()=>props.setRegion(1)}>
                    <View style={props.Region.includes(1) ? styles.ModalGameStyleButtonSelected:styles.ModalGameStyleButtonUnselected}>
                            <NormalText style={props.Region.includes(1) ? styles.ModalButtonTextStyleSelected:styles.ModalButtonTextStyleUnselected}>Hollywood</NormalText>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>props.setRegion(2)}>
                    <View style={props.Region.includes(2) ? styles.ModalGameStyleButtonSelected:styles.ModalGameStyleButtonUnselected}>
                            <NormalText style={props.Region.includes(2) ? styles.ModalButtonTextStyleSelected:styles.ModalButtonTextStyleUnselected}>Bollywood</NormalText>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
        <View style={styles.ModalFooter}>
            <TouchableOpacity onPress={()=>props.DismissModal()}>
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
        borderRadius:5,
        alignItems:'center'
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
        borderRadius:5,
        alignItems:'center'
    },
    ModalButtonTextStyleSelected:{
        fontSize:14,
        color:"white"
    },
    ModalOverView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginVertical:7
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
        fontSize:15,
        marginTop:10
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