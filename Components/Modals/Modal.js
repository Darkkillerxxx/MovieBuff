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
            Part:1,
            ErrorCode:0
        }
    }

    changeParts=()=>{
        if(this.props.Type === "SP")
        {
            if(this.state.Part === 1)
            {
                if(this.props.Region.length > 0)
                {
                    this.setState({Part:2})
                }
                else
                {
                    this.setState({ErrorCode:1})
                }
        }
            else
            {
                this.props.ProceedToCustom()
            }
        }
        else if(this.props.Type === "Reward")
        {
            this.props.DismissModal()
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
                                    <NormalText style={{fontSize:18,fontFamily:'Roboto-bold'}}>
                                        {this.props.Type === "SP" ? 
                                        "Choose Game":this.props.Type === "Result" ?
                                         "Result":this.props.Type === "Opt" ?
                                          "Options":this.props.Type === "Reward" ?
                                          "Reward":this.props.Type === "Insuff" ? 
                                          "Insufficient Balance":<View></View>}</NormalText>
                                </View>
                            </ImageBackground>
                            {this.props.Type === "SP" ?
                            this.state.ErrorCode === 1 ?  
                            <NormalText style={{fontSize:16,fontFamily:'Roboto-bold',color:'red'}}>Need To Select Atleat One Region</NormalText>:null
                            :<View></View>}

                            {
                                this.props.Type === "Reward" || this.props.Type === "Insuff" ? 
                                <View style={{marginVertical:12}}>
                                    <NormalText style={{fontSize:18,fontFamily:'Roboto-bold',textAlign:'center'}}>{this.props.FMsg}</NormalText>
                                    <NormalText style={{fontSize:16,fontFamily:'Roboto-bold',textAlign:'center',marginVertical:10}}>{this.props.SMsg}</NormalText>
                                </View>:
                                <View></View>
                                
                            }
                            
                            {
                            this.props.Type === "SP" ?
                                this.state.Part === 1 ? 
                                <View style={{width:'100%'}}>
                                    
                                    <TouchableOpacity style={styles.ModalButtonTouchable} onPress={()=>{
                                        this.setState({ErrorCode:0})
                                        this.props.setRegion(2)}
                                        }>
                                        <View style={{...styles.ModalButton,...{borderColor:`${this.props.Region.includes(2) ? "#FED31F":"#4B0E88"}`}}}>
                                            <ImageBackground style={styles.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                                <NormalText style={{fontSize:20}}>Bollywood</NormalText>
                                            </ImageBackground>
                                        </View>
                                    </TouchableOpacity>
                                   
                                    <TouchableOpacity style={styles.ModalButtonTouchable} onPress={()=>{
                                        this.setState({ErrorCode:0})
                                        this.props.setRegion(1)}}>
                                        <View style={{...styles.ModalButton,...{borderColor:`${this.props.Region.includes(1) ? "#FED31F":"#4B0E88"}`}}}>
                                            <ImageBackground style={styles.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                                <NormalText style={{fontSize:20}}>Hollywood</NormalText>
                                            </ImageBackground>
                                        </View>
                                    </TouchableOpacity>

                                </View>:
                                <View style={{width:'100%'}}>
                                     <TouchableOpacity onPress={()=>this.props.SetQuestions(5)} style={styles.ModalButtonTouchable}>
                                        <View style={{...styles.ModalButton,...{borderColor:`${this.props.Questions === 5 ? "#FED31F":"#4B0E88"}`}}}>
                                            <ImageBackground style={styles.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                                <NormalText style={{fontSize:18}}>5 Questions    100 Secs    -10 Coins</NormalText>
                                            </ImageBackground>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={()=>this.props.SetQuestions(15)} style={styles.ModalButtonTouchable}>
                                        <View style={{...styles.ModalButton,...{borderColor:`${this.props.Questions === 15 ? "#FED31F":"#4B0E88"}`}}}>
                                            <ImageBackground style={styles.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                                <NormalText style={{fontSize:18}}>15 Questions    300 Secs    -30 Coins</NormalText>
                                            </ImageBackground>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.ModalButtonTouchable} onPress={()=>this.props.SetQuestions(25)}>
                                        <View style={{...styles.ModalButton,...{borderColor:`${this.props.Questions === 25 ? "#FED31F":"#4B0E88"}`}}}>
                                            <ImageBackground style={styles.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                                <NormalText style={{fontSize:18}}>25 Questions    500 Secs    -50 Coins</NormalText>
                                            </ImageBackground>
                                        </View>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity style={styles.ModalButtonTouchable} onPress={()=>this.props.SetQuestions(30)}>
                                        <View style={{...styles.ModalButton,...{borderColor:`${this.props.Questions === 30 ? "#FED31F":"#4B0E88"}`}}}>
                                            <ImageBackground style={styles.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                                <NormalText style={{fontSize:18}}>30 Questions    600 Secs    -60 Coins</NormalText>
                                            </ImageBackground>
                                        </View>
                                    </TouchableOpacity>
                                </View>:
                                this.props.Type === "Result" ? 
                                <View style={{width:'100%'}}>
                                    <View style={{flexDirection:'row',justifyContent:'center',marginTop:5}}>       

                                        <View style={{width:'50%',alignItems:'center'}}>
                                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                                <Image source={require('../../assets/coins2.png')} style={{width:25,height:20,marginRight:10,resizeMode:'stretch'}}></Image>
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
                                                    <NormalText>{this.props.TimeAloted} Sec</NormalText>
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
                                </View>:
                                this.props.Type === "Opt" ?
                                 <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>
                                    <NormalText style={{fontSize:20,marginVertical:10}}>Help</NormalText>
                                    <TouchableOpacity onPress={()=>this.props.Logout()}>
                                        <NormalText style={{fontSize:20,marginVertical:10}}>Logout</NormalText>    
                                    </TouchableOpacity>
                                    
                                 </View>:
                                 this.props.Type === "Reward" || this.props.Type === "Insuff" ? 
                                   
                                    <View style={{...styles.ModalButton,...{width:'50%',height:100}}}>
                                            <ImageBackground style={styles.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                                <Image source={require('../../assets/Treasure.png')} style={{width:50,height:50,resizeMode:'stretch'}}/>
                                                <NormalText>{this.props.Coins} Coins</NormalText>
                                            </ImageBackground>
                                        </View>
                                 :
                                 <View></View>
                            }
                           
                           
                            
                            <View style={{justifyContent:'space-around',alignItems:'center',flexDirection:'row',marginVertical:30}}>
                                
                                {this.props.Type === "SP" || this.props.Type === "Opt" ?
                                <TouchableOpacity onPress={()=>this.props.DismissModal()} style={{width:'50%',alignItems:'center',justifyContent:'center',paddingHorizontal:20}}>
                                    <SinglePlayer style={{width:'100%',height:70,alignItems:'center'}} icon={"close"}  iconSize={20}>
                                        <NormalText style={{fontSize:20}}>Cancel</NormalText>
                                    </SinglePlayer>
                                </TouchableOpacity>:<View></View>}
                               
                               {this.props.Type !== "Opt" ? 
                                    <TouchableOpacity style={{width:'50%',alignItems:'center',justifyContent:'center',paddingHorizontal:20}} onPress={()=>this.changeParts()}>
                                        <SinglePlayer style={{width:'100%',height:70,alignItems:'center'}} icon={"arrow-right"} iconSize={18}>
                                            <NormalText style={{fontSize:20}}>{this.props.ButtonText === undefined ? "Proceed":this.props.ButtonText} </NormalText>
                                        </SinglePlayer>
                                    </TouchableOpacity>:null
                                }
                              
                              
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
        width:'90%',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        backgroundColor:'#4C0E8B',
        marginTop:50,
        paddingVertical:5
    },
    Modal1:{
        borderRadius:15,
        width:'97%',
        alignItems:'center',
        alignSelf:'center',
        backgroundColor:'#FFD41F',
        paddingVertical:5
    },
    Modal2:{
        borderRadius:15,
        width:'98%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        alignSelf:'center',
        marginTop:2,
        paddingVertical:5
    },
    Modal3:{
        borderRadius:15,
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
