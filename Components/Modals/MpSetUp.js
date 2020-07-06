import React from 'react'
import { View,StyleSheet,Image,TouchableOpacity,FlatList,YellowBox, ToastAndroid } from 'react-native';
import NormalText from '../NormalText';
import * as Animatable from 'react-native-animatable';
import SinglePlayer from '../SinglePlayerBtn'
import firebase from 'firebase';
import {MPGame} from '../../Utils/api'
import {connect} from 'react-redux'
import {setMPQuestions,setUsers} from '../../Store/Actions/ActionMP'


class MpSetUp extends React.Component{
    constructor()
    {
        super();
        this.state={
            LobbyUser:[
                {
                    'screen_name':null,
                    'img_url': null,
                    'User_id': null
                },
                {
                    'screen_name':null,
                    'img_url': null,
                    'User_id': null
                },
                {
                    'screen_name':null,
                    'img_url': null,
                    'User_id': null
                }
            ],
            TotalOtherUsers:0
        }
        YellowBox.ignoreWarnings(['Setting a timer']);
        
        if(!firebase.apps.length)
        {
            firebase.initializeApp({
                apiKey: "AIzaSyA_BAi5DYYPyJhmw-iXPDHnlCbeXgcpIoo",
                authDomain: "filmybuff-test.firebaseapp.com",
                databaseURL: "https://filmybuff-test.firebaseio.com",
                projectId: "filmybuff-test",
                storageBucket: "filmybuff-test.appspot.com",
                messagingSenderId: "242527310199",
                appId: "1:242527310199:web:b6fc88d8a7e47273a8d172",
                measurementId: "G-V06M1572DR"
            });
        }
    }

    AssignedJoinedUsers=(Users)=>{
        let TempLobbyUsers=this.state.LobbyUser
        let i=0
        Users.forEach((element,index) => {
            this.setUsers(element)
            if(element.User_id.toString() !== this.props.Id.toString())
            {
                TempLobbyUsers[i].User_id=element.User_id
                TempLobbyUsers[i].screen_name=element.screen_name
                TempLobbyUsers[i].img_url=element.img_url
                i=i+1
            }
        });
        this.setState({LobbyUser:TempLobbyUsers})
    }

    AssignAddedUsers=(AddedUser)=>{
        AddedUser=JSON.parse(AddedUser.replace(/'/g,'"'))
        let TempLobbyUsers=this.state.LobbyUser;
        this.setUsers(AddedUser)
        // console.log("After Adding User",this.props.MultiUsers)
        // console.log("Before Assigning Values")
        // console.log(AddedUser.User_id.toString(),this.props.Id.toString())
        if(AddedUser.User_id.toString() !== this.props.Id.toString())
        {
            TempLobbyUsers.every((element,index)=>{
                if(element.User_id === null)
                {
                    // console.log("in Null")
                    TempLobbyUsers[index].User_id=AddedUser.User_id
                    TempLobbyUsers[index].screen_name=AddedUser.screen_name
                    TempLobbyUsers[index].img_url=AddedUser.img_url
                    return false
                }
                else
                {
                    return true
                }
            })

            this.setState({LobbyUser:TempLobbyUsers},()=>{
                // console.log(this.props.Id,this.state.LobbyUser)
            })
        }
        
    }

    MoveToMPScreen=()=>{
        this.props.Loading("Loading The Game")
        // firebase.database().ref(`questions/${this.props.LobbyId}/OtherInfo`).set(
        //     {
        //         QuestionNo:0,
        //         UsersAnswered:0
        //     }
        // )
        
        setTimeout(()=>{
            console.log(`${this.props.Id} Move To MP`,this.props.LobbyId,!this.props.JoinLobby ? 1 : 0)
        MPGame({RoomId:this.props.LobbyId,Host:!this.props.JoinLobby ? 1 : 0}).then(result=>{
            if(result.IsSuccess)
            {
                // console.log("110",result.Data[0].Questions)
                this.props.onSetMPQuestions(result.Data[0].Questions)
                this.props.navigation.replace('GameScreenMP',{RoomID:this.props.LobbyId,Host:!this.props.JoinLobby ? true : false})
                this.props.Loading("")
            }
        })
       },1500)
    }

    setUsers=(userObj)=>{
        let isUserPresent=false
        let TempUsers=this.props.MultiUsers
        
        TempUsers.every((element)=>{
        
            if(parseInt(element.User_id) === parseInt(userObj.User_id))
            {
                // console.log("Breaking Loop")
                isUserPresent=true
                return false
            }
            else
            {
                // console.log("Continiung Loop Loop")
                return true
            }
        })
        console.log("138",isUserPresent)

        if(!isUserPresent)
        {
          userObj.hasAnsCorrect=false
          TempUsers.push(userObj)
          this.props.onSetUsers(TempUsers)
        }
        // console.log(`Users Update for Id ${this.props.Dashboard.Id}`,this.props.MultiUsers)
    }


    componentDidMount()
    {
        
        // this.props.Loading()
        // "{'screen_name': 'Trek', 'img_url': 'https://s3.ap-south-1.amazonaws.com/movie.buff.avatars/User+2%401x.png', 'User_id': '104'}"
        

        if(this.props.JoinedUsers.length > 0)
        {
            this.AssignedJoinedUsers(this.props.JoinedUsers)
        }
        else
        {
            let OwnInfo={
                screen_name:this.props.Dashboard.Name,
                img_url:this.props.Dashboard.ImgUrl,
                User_id:this.props.Dashboard.Id
            }   
    
            this.setUsers(OwnInfo)
        }
        
        firebase.database().ref(`room/${this.props.LobbyId}/`).endAt().limitToLast(1).on('child_added',(snapShot)=>{
            console.log(this.props.Id,snapShot.val())
           
            if(snapShot.key === "HasStarted")
            {
                if(this.props.JoinLobby)
                {
                 this.MoveToMPScreen()
                }
            }
            else
            {
                this.AssignAddedUsers(snapShot.val())
            }            
        })
        // console.log("out")
    }

    ExitRoom=()=>{
        this.props.onExitLobby()
    }   



    ShowOtherUsers=(itemData)=>{
        return(
            itemData.item.User_id !== this.props.Id.toString() ?
              itemData.item.User_id !== null ?
              <View style={{width:'30%',height:100,alignItems:'center',padding:5,margin:5}}>
                  <View style={{width:'70%',height:'70%',alignItems:'center',justifyContent:'center',borderRadius:100}}>
                      <Image source={{uri:itemData.item.img_url}} style={{width:'100%',height:'100%',resizeMode:'cover'}}/>
                  </View>
                <NormalText>{itemData.item.screen_name}</NormalText>
              </View>
              :
              <View style={{width:'30%',height:80,alignItems:'center',padding:5,borderRadius:5,borderColor:'white',borderWidth:1,margin:5}}>
                  <Image source={require('../../assets/EmptyUser.png')} style={{width:'100%',height:'100%',resizeMode:'contain'}}/>
              </View>
            :
            null
        )
      }

    render()
    {
        return(
        <View style={{flex:1,alignItems:'center',justifyContent:'flex-start',marginTop:10}}>
                    <View style={{width:'90%',alignItems:'center',justifyContent:'center',borderColor:'white',borderWidth:1,padding:5,borderRadius:10}}>
                        <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                            <NormalText style={{fontSize:25}}>Lobby Code :</NormalText>
                            <View style={{padding:5,backgroundColor:'#4C0E8B'}}>
                                <NormalText style={{fontSize:25}}>{this.props.LobbyId}</NormalText>
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
                    
                    <View style={{width:'100%',height:150,marginTop:15,flexDirection:'row',justifyContent:'space-evenly',padding:5}}>
                        <FlatList 
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.LobbyUser} 
                            renderItem={this.ShowOtherUsers}
                            numColumns={3}
                        />
                    </View>
                    
                    <View style={{flex:1,alignSelf:'stretch',alignItems:'center',marginVertical:15}}>
                       {this.props.JoinLobby ? 

                        <View style={{flex:1,alignSelf:'stretch',alignItems:'center'}}>
                            <NormalText>Please Wait For Your Friend To Start the Game....</NormalText>
                            <TouchableOpacity style={{width:'50%',alignItems:'center',justifyContent:'center',paddingHorizontal:20,marginTop:10}} onPress={()=>this.ExitRoom()}>
                                <SinglePlayer style={{width:'100%',height:70,alignItems:'center'}} icon={"close"} iconSize={18}>
                                    <NormalText style={{fontSize:20}}>Cancel</NormalText>
                                </SinglePlayer>
                            </TouchableOpacity>
                        </View>
                     
                        :
                        <View style={{flex:1,flexDirection:'row',alignSelf:'stretch',alignItems:'center'}}>
                            <TouchableOpacity style={{width:'50%',alignItems:'center',justifyContent:'center',paddingHorizontal:20}} onPress={()=>this.ExitRoom()}>
                                <SinglePlayer style={{width:'100%',height:70,alignItems:'center'}} icon={"close"} iconSize={18}>
                                    <NormalText style={{fontSize:20}}>Cancel</NormalText>
                                </SinglePlayer>
                            </TouchableOpacity>
                            <TouchableOpacity style={{width:'50%',alignItems:'center',justifyContent:'center',paddingHorizontal:20}} onPress={()=>this.MoveToMPScreen()}>
                                <SinglePlayer style={{width:'100%',height:70,alignItems:'center'}} icon={"arrow-right"} iconSize={18}>
                                    <NormalText style={{fontSize:20}}>Start Game</NormalText>
                                </SinglePlayer>
                            </TouchableOpacity>
                        </View>
                        }
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

const mapStateToProps= state =>{
    return{
      Dashboard:state.Dashboard.Dashboard,
      MultiUsers:state.MP.Users,
      SP:state.SP.GamePayload,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onSetMPQuestions:(response)=>dispatch(setMPQuestions(response)),
        onSetUsers:(response)=>dispatch(setUsers(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MpSetUp);