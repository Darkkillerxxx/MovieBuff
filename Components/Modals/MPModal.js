import React from 'react'
import {View,StyleSheet,TouchableOpacity,TextInput,ImageBackground,Text,Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import NormalText from '../NormalText';
import SinglePlayer from '../SinglePlayerBtn'
import Loader from './Loader'
import {CreateRoom,JoinRoom} from '../../Utils/api'
import * as Animatable from 'react-native-animatable';
class MPModal extends React.Component{
    constructor()
    {
        super();
        this.state={
            JoinLobby:false,
            EntryFee:["100","250","500","1000"],
            Region:[1,2],
            EnrtyFeeID:0,
            LobbyId:"",
            EnteredLobbyId:"",
            ShowLoading:false,
            LoaderText:"",
            OtherUser:[]
        }
    }

    IncreaseEntryFee=()=>{
        if(this.state.EnrtyFeeID < 3)
        {
            this.setState({EnrtyFeeID:this.state.EnrtyFeeID + 1})
        }
    }

    
    DecreaseEntryFee=()=>{
        if(this.state.EnrtyFeeID !== 0)
        {
            this.setState({EnrtyFeeID:this.state.EnrtyFeeID - 1})
        }
    }

    JoinOrCreateLobby=()=>{
        if(this.state.JoinLobby)
        {
            let Payload={
                "UserId":this.props.Id.toString(),
                "RoomId":this.state.EnteredLobbyId,
            }
            this.setState({ShowLoading:true})
            this.setState({LoaderText:"Connecting To Your Friends Lobby...."})
            setTimeout(()=>{
                JoinRoom(Payload).then((result)=>{
                    console.log(result)
                    if(result.IsSuccess)
                    {
                        this.setState({LobbyId:result.Data.RoomId},()=>{
                            this.setState({ShowLoading:false})
                        })
                    }
                    else
                    {
                        this.setState({ShowLoading:false})
                    }
                })
            },1500)

        }
        else
        {
            let Payload={
                "UserId":this.props.Id.toString(),
                "nofusers":"5",
                "noQ":"10",
                "Region":[1,2]
            }
            console.log(Payload)
            this.setState({ShowLoading:true})
            this.setState({LoaderText:"Creating a Lobby For You & Your Friends...."})
            setTimeout(()=>{
                CreateRoom(Payload).then((result)=>{
                    console.log(result)
                    if(result.IsSuccess)
                    {
                        this.setState({LobbyId:result.Data.RoomId},()=>{
                            this.setState({ShowLoading:false})
                        })
                    }
                    else
                    {
                        this.setState({ShowLoading:false})
                    }
                })
            },1500)
           
        }
    }

    componentDidMount()
    {
    }

    showPlayers=()=>{
        return(
            <View style={{width:'30%',height:100,alignItems:'center',backgroundColor:"#2E2247",padding:5,borderRadius:5}}>
                <Image source={require('../../assets/EmptyUser.png')} style={{width:'100%',height:'100%',resizeMode:'contain'}}/>
            </View>
        )
    }
    
    render()
    {
        return(
                this.state.ShowLoading ? 
                <Loader 
                Text={this.state.LoaderText}/>:
                this.state.LobbyId.length === 0 ?
                <View style={styles.Modal}>
                    <View style={styles.Modal1}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['#60B48D', '#55868B', '#3E2788',"#920D92"]} style={styles.Modal2}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['#81CBB7', '#70AAB6', '#5E5DB4',"#4F1DB3","#8113B8","#B613BD"]} style={styles.Modal3}>
                                <ImageBackground resizeMode='stretch' source={require('../../assets/ModalHead.png')} style={styles.ModalHeader}>
                                    <View style={{width:'100%',height:'60%',alignItems:'center',justifyContent:'center'}}>
                                        <NormalText style={{fontSize:18,fontFamily:'Roboto-bold'}}>
                                            Play With Friends
                                        </NormalText>
                                    </View>
                                </ImageBackground>

                                <View style={{flexDirection:'row',width:'100%',marginVertical:5}}>
                                    <TouchableOpacity style={styles.ModalButtonTouchable} onPress={()=>this.setState({JoinLobby:false})}>
                                        <View style={{...styles.ModalButton,...{borderColor:`${!this.state.JoinLobby ? "#FED31F":"#4B0E88"}`}}}>
                                            <ImageBackground style={styles.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                                <NormalText style={{fontSize:20}}>Create Lobby</NormalText>
                                            </ImageBackground>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.ModalButtonTouchable} onPress={()=>this.setState({JoinLobby:true})}>
                                        <View style={{...styles.ModalButton,...{borderColor:`${this.state.JoinLobby ? "#FED31F":"#4B0E88"}`}}}>
                                            <ImageBackground style={styles.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                                <NormalText style={{fontSize:20}}>Join Lobby</NormalText>
                                            </ImageBackground>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                {!this.state.JoinLobby ? 
                                <View style={{width:'100%',alignItems:'center'}}>
                                 
                                    <NormalText style={{fontSize:20,marginTop:10}}>Entry Fee</NormalText>
                                    <View style={styles.EntryContainer}>
                                        <View style={{width:'33.33%',alignItems:'center',justifyContent:'center'}}>
                                            <TouchableOpacity style={styles.PlusMinusButton} onPress={()=>this.DecreaseEntryFee()}>
                                                <Text style={{color:'white',fontSize:30}}> - </Text>
                                            </TouchableOpacity>
                                        </View>
                                        
                                        <View style={{width:'33.33%',alignItems:'center',justifyContent:'center'}}>
                                            
                                            <View style={{...styles.ModalButton,...{borderColor:`${this.state.JoinLobby ? "#FED31F":"#4B0E88"}`,height:75}}}>
                                                    <ImageBackground style={styles.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                                        <Image style={{width:25,height:25,resizeMode:'contain'}} source={require('../../assets/coins.png')}></Image>
                                                        <NormalText style={{marginTop:5}}>{this.state.EntryFee[this.state.EnrtyFeeID]}</NormalText>
                                                    </ImageBackground>
                                                </View>
                                        </View>

                                        <View style={{width:'33.33%',alignItems:'center',justifyContent:'center'}}>
                                            <TouchableOpacity style={styles.PlusMinusButton} onPress={()=>this.IncreaseEntryFee()}>
                                                <Text style={{color:'white',fontSize:25}}> + </Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </View>:
                                     <View style={{width:'100%',alignItems:'center'}}>
                                        <View style={styles.RegionContainer}>
                                            <NormalText style={{fontSize:20}}>Enter Lobby ID</NormalText>
                                            <TextInput onChangeText={(e)=>this.setState({EnteredLobbyId:e})} placeholder="Enter Lobby ID" style={styles.EnterLobby}></TextInput>
                                        </View>
                                    </View>
                                }
                               

                                <View style={{justifyContent:'space-around',alignItems:'center',flexDirection:'row',marginVertical:30}}>
                               
                                    <TouchableOpacity onPress={()=>this.props.DismissModal()} style={{width:'50%',alignItems:'center',justifyContent:'center',paddingHorizontal:20}}>
                                        <SinglePlayer style={{width:'100%',height:70,alignItems:'center'}} icon={"close"}  iconSize={20}>
                                            <NormalText style={{fontSize:20}}>Cancel</NormalText>
                                        </SinglePlayer>
                                    </TouchableOpacity>
                               
                                    <TouchableOpacity style={{width:'50%',alignItems:'center',justifyContent:'center',paddingHorizontal:20}} onPress={()=>this.JoinOrCreateLobby()}>
                                        <SinglePlayer style={{width:'100%',height:70,alignItems:'center'}} icon={"arrow-right"} iconSize={18}>
                                            <NormalText style={{fontSize:20}}>{this.state.JoinLobby ? "Join Lobby":"Create Lobby"} </NormalText>
                                        </SinglePlayer>
                                    </TouchableOpacity>
                                </View>
                            </LinearGradient>
                        </LinearGradient>
                    </View>
                </View>:
                <View style={{flex:1,alignItems:'center',justifyContent:'flex-start',marginTop:10}}>
                    <View style={{width:'90%',alignItems:'center',justifyContent:'center',borderColor:'white',borderWidth:1,padding:5,borderRadius:10}}>
                        <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                            <NormalText style={{fontSize:25}}>Lobby Code :</NormalText>
                            <View style={{padding:5,backgroundColor:'#4C0E8B'}}>
                                <NormalText style={{fontSize:25}}>{this.state.LobbyId}</NormalText>
                            </View>
                        </View>
                        <NormalText style={{marginTop:10,fontSize:20,textAlign:'center'}}>Let Your Friend Use The Above Room Id for Joining Your Room</NormalText>
                    </View>

                    <View style={{marginTop:10,width:'100%',alignItems:'center'}}>
                        <Image source={{uri:this.props.ProfileImg}} style={{width:100,height:100,borderRadius:100}}></Image>
                            <NormalText style={{fontSize:20}}>{this.props.UserName}</NormalText>
                    </View>
                    
                    <Animatable.View animation="pulse" iterationCount="infinite" style={{width:'100%',alignItems:'center',marginTop:25}}>
                        <View style={{width:50,height:50,borderColor:'white',borderWidth:1,borderRadius:100,alignItems:'center',justifyContent:'center',backgroundColor:'#f5bb18'}}>
                            <View style={{width:40,height:40,borderColor:'white',borderWidth:1,borderRadius:100,alignItems:'center',justifyContent:'center',backgroundColor:"#2E2247"}}>
                                <NormalText style={{fontSize:18}}>VS</NormalText>
                            </View>
                        </View>
                    </Animatable.View>
                    
                    <View style={{width:'100%',height:100,marginTop:15,flexDirection:'row',justifyContent:'space-evenly',padding:5}}>
                        <View style={{width:'30%',height:100,alignItems:'center',padding:5,borderRadius:5,borderColor:'white',borderWidth:1}}>
                                <Image source={require('../../assets/EmptyUser.png')} style={{width:'100%',height:'100%',resizeMode:'contain'}}/>
                        </View>
                        <View style={{width:'30%',height:100,alignItems:'center',padding:5,borderRadius:5,borderColor:'white',borderWidth:1}}>
                                <Image source={require('../../assets/EmptyUser.png')} style={{width:'100%',height:'100%',resizeMode:'contain'}}/>
                        </View>
                        <View style={{width:'30%',height:100,alignItems:'center',padding:5,borderRadius:5,borderColor:'white',borderWidth:1}}>
                                <Image source={require('../../assets/EmptyUser.png')} style={{width:'100%',height:'100%',resizeMode:'contain'}}/>
                        </View>
                    </View>
                    
                    <View style={{flex:1,alignSelf:'stretch',alignItems:'center',marginVertical:15}}>
                       {this.state.JoinLobby ? 
                        <NormalText>Please Wait For Your Friend To Start the Game....</NormalText>
                        :
                        <TouchableOpacity style={{width:'50%',alignItems:'center',justifyContent:'center',paddingHorizontal:20}} onPress={()=>this.props.MoveToMPGame()}>
                            <SinglePlayer style={{width:'100%',height:70,alignItems:'center'}} icon={"arrow-right"} iconSize={18}>
                                <NormalText style={{fontSize:20}}>Start Game</NormalText>
                            </SinglePlayer>
                        </TouchableOpacity>}
                    </View>
                </View>
        )
    }
}


const styles=StyleSheet.create({
    Modal:{
        borderRadius:15,
        width:'100%',
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
    ModalHeader:{
        width:'100%',
        height:100,
        marginTop:-40
    },
    ModalButtonTouchable:{
        width:'50%',
        alignItems:'center'
    },
    ModalButton:{
        width:'95%',
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
    },
    RegionContainer:{
        width:'100%',
        alignItems:'center'
    },
    RegionHolder:{
        width:'100%',
        flexDirection:'row'
    },
    EntryContainer:{
        width:'100%',
        flexDirection:'row',
        marginBottom:10
    },
    PlusMinusButton:{
        width:30,
        height:30,
        borderColor:'white',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:2,
        borderRadius:5,
        paddingBottom:5
    },
    EnterLobby:{
        width:'70%',
        borderColor:'white',
        borderWidth:1,
        backgroundColor:'white',
        marginTop:10,
        borderRadius:5,
        textAlign:'center',
        fontFamily:'Roboto-bold',
        fontSize:20
    }
})

export default MPModal