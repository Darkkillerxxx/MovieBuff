import React from 'react'
import { View, StyleSheet,TouchableOpacity,Image } from 'react-native';
import NextButton from '../NextButton'
import NormalText from '../NormalText'
import BriefInfo2 from '../BriefInfo2';
import {Ionicons,FontAwesome} from '@expo/vector-icons'

class Result extends React.Component{
    constructor()
    {
        super();
        this.state={

        }
    }
    render()
    {
        return(
            <View style={styles.Modal}>
                <View style={styles.ModalHeader} />
                <View style={styles.ModalContent}>
                    <Image source={require('../../assets/confetti.png')} style={{height:50,width:50}}/>
                    <NormalText style={{fontSize:16}}>Quiz Completed !</NormalText>
                    <View style={styles.Result}>
                        <View style={styles.InfoContainer}>
                            <View style={{width:'50%',alignItems:'center'}}>
                                <NormalText style={{margin:5,color:'#8B96A6'}}>Earned Coins</NormalText>
                                <BriefInfo2 Brief={styles.BriefInfo2} Image={require('../../assets/coins.png')} value={this.props.Result[0].coins}/>
                            </View>
                            <View style={{width:'50%',alignItems:'center'}}>
                            <NormalText style={{margin:5,color:'#8B96A6'}}>Total Time</NormalText>
                                <BriefInfo2 Brief={styles.BriefInfo2} Image={require('../../assets/timer.png')} value={`${this.props.TimteAloted} Sec`}/>
                            </View>
                        </View>

                        <View style={styles.InfoContainer}>
                            <View style={{width:'50%',alignItems:'center'}}>
                                <NormalText style={{margin:5,color:'#8B96A6'}}>Correct Answers</NormalText>
                                <BriefInfo2 Brief={styles.BriefInfo2} Image={require('../../assets/correct.png')} value={this.props.CorrectAns}/>
                            </View>
                            <View style={{width:'50%',alignItems:'center'}}>
                            <NormalText style={{margin:5,color:'#8B96A6'}}>Wrong Answers</NormalText>
                                <BriefInfo2 Brief={styles.BriefInfo2} Image={require('../../assets/wrong.png')} value={this.props.Questions.length - this.props.CorrectAns}/>
                            </View>
                        </View>

                        <View style={styles.InfoContainer}>
                            <View style={{width:'50%',alignItems:'center'}}>
                                <NormalText style={{margin:5,color:'#8B96A6'}}>Best Time</NormalText>
                                <BriefInfo2 Brief={styles.BriefInfo2} Image={require('../../assets/cheetah.png')} value={this.props.Result[0].bestTime}/>
                            </View>
                            <View style={{width:'50%',alignItems:'center'}}>
                            <NormalText style={{margin:5,color:'#8B96A6'}}>Worst Time</NormalText>
                                <BriefInfo2 Brief={styles.BriefInfo2} Image={require('../../assets/snail.png')} value={this.props.Result[0].worstTime}/>
                            </View>
                        </View>
                        <View style={styles.InfoContainer}>
                            <View style={{width:'50%',alignItems:'center'}}>
                                <NormalText style={{margin:5,color:'#8B96A6'}}>Level</NormalText>
                                <BriefInfo2 Brief={styles.BriefInfo2} Image={require('../../assets/cheetah.png')} value={this.props.Result[0].level}/>
                            </View>
                        </View>
                      
                    </View>
                </View>
                <View style={styles.ModalFooter}>
                    <TouchableOpacity onPress={()=>this.props.changeModal("Level")}>
                        <View style={styles.CloseButtonContainer}>
                            <FontAwesome name="close" size={24} color='white'/>
                        </View>
                    </TouchableOpacity>
                </View>    
            </View>
        )
    }
}

const styles=StyleSheet.create({
    BriefInfo2:{
        width:'100%',
    },
    Modal:{
        backgroundColor:'white',
        margin:40,
        borderRadius:25
    },
    ModalHeader:{
        height:30,
        backgroundColor:'#23ABDD',
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        paddingRight:10
    },
    ModalFooter:{
        height:30,
        width:'100%',
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25,
        backgroundColor:'#23ABDD',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:20
    },
    ModalContent:{
        backgroundColor:'#34495E',
        alignItems:'center',
        justifyContent:'space-around',
        paddingVertical:30,
    },
    Result:{
        padding:10,
        width:'100%',
    },
    InfoContainer:{
        flexDirection:'row',
        justifyContent:'flex-start',
        marginVertical:5
    },
    CloseButtonContainer:{
        height:60,
        width:60,
        marginTop:5,
        borderRadius:30,
        backgroundColor:"#FF711C",
        elevation:10,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default Result;