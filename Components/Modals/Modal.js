import React from 'react'
import {View,Image, StyleSheet,TouchableOpacity,TouchableWithoutFeedback, ImageBackground} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import NormalText from '../NormalText'
import SinglePlayer from '../SinglePlayerBtn'
import {Ionicons,FontAwesome} from '@expo/vector-icons'


class CustomModal extends React.Component{
    constructor()
    {
        super()
        this.state={
            Part:1
        }
    }

    changeParts=()=>{
        if(this.props.Type === "SP")
        {
            if(this.state.Part === 1)
            {
                this.setState({Part:2})
            }
            else
            {
                this.props.ProceedToCustom()
            }
        }
        else
        {
            this.props.changeModal("Level")
        }
       
    }
    
    render()
    {
    return(
        <View style={{justifyContent:'center'}}>
            <View style={styles.Modal}>
                <View style={styles.Modal1}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['#60B48D', '#55868B', '#3E2788',"#920D92"]} style={styles.Modal2}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['#81CBB7', '#70AAB6', '#5E5DB4',"#4F1DB3","#8113B8","#B613BD"]} style={styles.Modal3}>
                            <ImageBackground resizeMode='stretch' source={require('../../assets/ModalHead.png')} style={styles.ModalHeader}>
                                <View style={{width:'100%',height:'60%',alignItems:'center',justifyContent:'center'}}>
                                    <NormalText style={{fontSize:18,fontFamily:'Roboto-bold'}}>{this.props.Type === "SP" ? "Choose Game":this.props.Type === "Result" ? "Result":""}</NormalText>
                                </View>
                            </ImageBackground>
                            {this.props.Type === "SP" ? 
                            <NormalText style={{fontSize:16,fontFamily:'Roboto-bold'}}>{this.state.Part === 1 ? "Choose Region":"Choose Game Type"}</NormalText>
                            :<View></View>}
                            
                            {
                            this.props.Type === "SP" ?
                                this.state.Part === 1 ? 
                                <View style={{width:'100%'}}>
                                    <TouchableOpacity style={styles.ModalButtonTouchable} onPress={()=>this.props.setRegion(1)}>
                                        <View style={{...styles.ModalButton,...{borderColor:`${this.props.Region.includes(1) ? "#FED31F":"#4B0E88"}`}}}>
                                            <ImageBackground style={styles.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                                <NormalText>Hollywood</NormalText>
                                            </ImageBackground>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.ModalButtonTouchable} onPress={()=>this.props.setRegion(2)}>
                                        <View style={{...styles.ModalButton,...{borderColor:`${this.props.Region.includes(2) ? "#FED31F":"#4B0E88"}`}}}>
                                            <ImageBackground style={styles.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                                <NormalText>Bollywood</NormalText>
                                            </ImageBackground>
                                        </View>
                                    </TouchableOpacity>
                                </View>:
                                <View style={{width:'100%'}}>
                                     <TouchableOpacity onPress={()=>this.props.SetQuestions(5)} style={styles.ModalButtonTouchable}>
                                        <View style={{...styles.ModalButton,...{borderColor:`${this.props.Questions === 5 ? "#FED31F":"#4B0E88"}`}}}>
                                            <ImageBackground style={styles.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                                <NormalText>5 Questions    100 Secs    -50 Coins</NormalText>
                                            </ImageBackground>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={()=>this.props.SetQuestions(15)} style={styles.ModalButtonTouchable}>
                                        <View style={{...styles.ModalButton,...{borderColor:`${this.props.Questions === 15 ? "#FED31F":"#4B0E88"}`}}}>
                                            <ImageBackground style={styles.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                                <NormalText>15 Questions    300 Secs    -150 Coins</NormalText>
                                            </ImageBackground>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.ModalButtonTouchable} onPress={()=>this.props.SetQuestions(25)}>
                                        <View style={{...styles.ModalButton,...{borderColor:`${this.props.Questions === 25 ? "#FED31F":"#4B0E88"}`}}}>
                                            <ImageBackground style={styles.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                                <NormalText>25 Questions    500 Secs    -250 Coins</NormalText>
                                            </ImageBackground>
                                        </View>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity style={styles.ModalButtonTouchable} onPress={()=>this.props.SetQuestions(30)}>
                                        <View style={{...styles.ModalButton,...{borderColor:`${this.props.Questions === 30 ? "#FED31F":"#4B0E88"}`}}}>
                                            <ImageBackground style={styles.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                                <NormalText>30 Questions    600 Secs    -300 Coins</NormalText>
                                            </ImageBackground>
                                        </View>
                                    </TouchableOpacity>
                                </View>:
                                this.props.Type === "Result" ? 
                                <View style={{width:'100%'}}>
                                    <View style={{flexDirection:'row',justifyContent:'center',marginTop:5}}>       

                                        <View style={{width:'50%',alignItems:'center'}}>
                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                                <Image source={require('../../assets/coins.png')} style={{width:25,height:25,marginRight:10}}></Image>
                                                <NormalText>Earned Coins</NormalText>    
                                            </View>
                                            <View style={styles.ModalButton}>
                                                <ImageBackground style={styles.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                                    <NormalText>{this.props.Result[0].coins}</NormalText>
                                                </ImageBackground>
                                            </View>
                                        </View> 

                                        <View style={{width:'50%',alignItems:'center'}}>
                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                                <Image source={require('../../assets/timer.png')} style={{width:25,height:25,marginRight:10}}></Image>
                                                <NormalText>Total TIme</NormalText>    
                                            </View>
                                            <View style={styles.ModalButton}>
                                                <ImageBackground style={styles.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                                    <NormalText>{this.props.TimteAloted} Sec</NormalText>
                                                </ImageBackground>
                                            </View>
                                        </View> 
                                          
                                    </View>

                                    <View style={{flexDirection:'row',justifyContent:'center',marginVertical:3}}>       
                                    
                                        <View style={{width:'50%',alignItems:'center'}}>
                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                                <Image source={require('../../assets/correct.png')} style={{width:20,height:20,marginRight:10}}></Image>
                                                <NormalText>Correct Ans</NormalText>    
                                            </View>
                                            <View style={styles.ModalButton}>
                                                <ImageBackground style={styles.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                                    <NormalText>{this.props.CorrectAns}</NormalText>
                                                </ImageBackground>
                                            </View>
                                        </View> 

                                        <View style={{width:'50%',alignItems:'center'}}>
                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                                <Image source={require('../../assets/wrong.png')} style={{width:20,height:20,marginRight:10}}></Image>
                                                <NormalText>Wrong Ans</NormalText>    
                                            </View>
                                            <View style={styles.ModalButton}>
                                                <ImageBackground style={styles.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                                    <NormalText>{this.props.Questions.length - this.props.CorrectAns}</NormalText>
                                                </ImageBackground>
                                            </View>
                                        </View> 
                                          
                                    </View>

                                    
                                    <View style={{flexDirection:'row',justifyContent:'center',marginVertical:3}}>       
                                    
                                        <View style={{width:'50%',alignItems:'center'}}>
                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                                <Image source={require('../../assets/cheetah.png')} style={{width:35,height:20,marginRight:10}}></Image>
                                                <NormalText>Best Time</NormalText>    
                                            </View>
                                            <View style={styles.ModalButton}>
                                                <ImageBackground style={styles.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                                    <NormalText>{this.props.Result[0].bestTime}</NormalText>
                                                </ImageBackground>
                                            </View>
                                        </View> 

                                        <View style={{width:'50%',alignItems:'center'}}>
                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                                <Image source={require('../../assets/snail.png')} style={{width:20,height:20,marginRight:10}}></Image>
                                                <NormalText>Worst Time</NormalText>    
                                            </View>
                                            <View style={styles.ModalButton}>
                                                <ImageBackground style={styles.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                                    <NormalText>{this.props.Result[0].worstTime}</NormalText>
                                                </ImageBackground>
                                            </View>
                                        </View> 
                                          
                                    </View>
                                </View>:<View></View>
                            }
                           
                           
                            
                            <View style={{flex:1,justifyContent:'space-around',alignItems:'center',flexDirection:'row'}}>
                                
                                {this.props.Type === "SP" ?
                                <TouchableOpacity onPress={()=>this.props.DismissModal()} style={{width:'50%'}}>
                                    <SinglePlayer icon={"close"}>
                                        <NormalText style={styles.NormalTextSP}>Cancel</NormalText>
                                    </SinglePlayer>
                                </TouchableOpacity>:<View></View>}
                               
                                <TouchableOpacity style={{width:'50%'}} onPress={()=>this.changeParts()}>
                                    <SinglePlayer icon={"arrow-right"}>
                                        <NormalText style={styles.NormalTextSP}>Proceed</NormalText>
                                    </SinglePlayer>
                                </TouchableOpacity>
                              
                            </View>
                        </LinearGradient>
                    </LinearGradient>
                </View>
            </View>
        </View>
        
    )
    }
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
        width:'100%',
        height:100,
        marginTop:-40
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
        borderRadius:15,
        height:475,
        width:'90%',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        backgroundColor:'#4C0E8B',
        marginTop:50
    },
    Modal1:{
        borderRadius:15,
        height:'97%',
        width:'97%',
        alignItems:'center',
        alignSelf:'center',
        backgroundColor:'#FFD41F',
        padding:1
    },
    Modal2:{
        borderRadius:15,
        height:'98%',
        width:'98%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        alignSelf:'center',
        marginTop:2
    },
    Modal3:{
        borderRadius:15,
        height:'95%',
        width:'95%',
        alignItems:'center',
        backgroundColor:'white',
        alignSelf:'center',
        marginTop:2
    },
    ModalButtonTouchable:{
        width:'100%',
        alignItems:'center'
    },
    ModalButton:{
        width:'80%',
        height:50,
        borderColor:'#4B0E88',
        borderWidth:4,
        marginVertical:5,
        borderRadius:15,
        backgroundColor:"#FED31F",
        padding:2
    },
    ModalButtonImage:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    }
})


export default CustomModal



{/* <View style={styles.Modal}>
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
    </View> */}