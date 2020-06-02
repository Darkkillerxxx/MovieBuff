import React from 'react'
import { ActivityIndicator,View,Text,Image, StyleSheet,Button,TouchableOpacity,Alert, ToastAndroid } from 'react-native';
import Modal from 'react-native-modal'
import AppContiner from '../../Components/AppContainer';
import BoldText from '../../Components/BoldText'
import NormalText from '../../Components/NormalText'
import NextButton from '../../Components/NextButton'
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import {setFB, setLogin} from '../../Store/Actions/ActionJoin'
import {setDashboard} from '../../Store/Actions/ActionDashboard'
import { connect }from 'react-redux'
import * as Facebook from 'expo-facebook';
import SinglePlayer from '../../Components/SinglePlayerBtn'
import {checkAvailable,login} from '../../Utils/api'
import {fetchUser,insertUser} from '../../Database/Helper'
import Loader from '../../Components/Modals/Loader'


class WelcomeScreen extends React.Component{
    constructor()
    {
        super();
        this.state={
            FacebookResponse:null,
            Username:"",
            UsernameAvailable:true,
            isLoading:false,
            ErrorMessage:"",
            IsReg:true,
            Password:""
        }
    }
    

    loginToBuff=(Username,FId,Password)=>{
     
        let LoggedIn=false
        let payload={
            UserId:"",
            ScreenName:Username,
            FacebookId:FId.toString(),
            Password:Password
        }
        console.log("Login Pay",payload)
        return login(payload).then(result=>{
            console.log("Login result",result)
            if(result.IsSuccess)
            {
                if(result.Data.length > 0)
                {
                    let DBData=result.Data[0];
                    DBData.Password=Password
                    DBData.FbId=FId.toString();
                    DBData.ScreenName=Username;
                    // console.log(DBData)
                    // DBData.Level="";
                    insertUser(JSON.stringify(DBData)).then(result=>{
                        console.log("Update",result)
                     }).catch(err=>{
                         ToastAndroid.show("Failed To Update Database",ToastAndroid.SHORT)
                     })
                    this.props.onSetDashboard(DBData)
                    return true
                }
                else
                {
                    return false
                }
            }
            else
            {
                return false
            }
        })
      
    }

    

    async logIn() {
        try {
          await Facebook.initializeAsync('671419343403898');
          const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
          } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['email'],
          });
          if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?fields=id,name,first_name,last_name,middle_name,picture.width(500).height(500),email&access_token=${token}`);
            let FB= await response.json()
            this.setState({FacebookResponse:FB},()=>{
                // console.log(this.state.FacebookResponse)
                let Login=this.props.Login;
                Login.FbId=this.state.FacebookResponse.id,
                Login.FirstName=FB.first_name,
                Login.LastName=FB.last_name,
                Login.AvatarFacebook=FB.picture.data.url,
                this.props.onSetLogin(Login)
                this.props.onSetFB(this.state.FacebookResponse)
                console.log("FBRedux",this.props.FB)
                // if(this.loginToBuff("",this.state.FacebookResponse.id))
                // {
                //     this.props.navigation.navigate('Dashboard')
                // }
                // else
                // {
                //     this.props.navigation.navigate('ProfileDetails')    
                // }

                this.loginToBuff("",this.state.FacebookResponse.id,"").then(result=>{
                       if(result)
                       {
                        this.props.navigation.replace('Dashboard')
                       }
                       else
                       {
                        this.props.navigation.navigate('ProfileDetails') 
                       }
                })
                
            })
          } else {
            // type === 'cancel'
          }
        } catch (message) {
          alert(`Facebook Login Error: ${message}`);
          console.log("Facebook Error",message)
        }
      }

      validation=()=>{
        if(this.state.Username.length < 3)
        {
            this.setState({ErrorMessage:"Username Cannot be Less Than 3 Letter"})
            this.setState({UsernameAvailable:false})
            return false;
        }
        else if(this.state.Username.length > 10)
        {
            this.setState({ErrorMessage:"Username Cannot be More Than 10 Letter"})
            this.setState({UsernameAvailable:false})
            return false;
        }
        return true;
    }

      onProceed=()=>{
          if(this.validation())
          {
              if(this.state.IsReg)
              { 
                this.setState({isLoading:true},()=>{
                    setTimeout(()=>{
                        checkAvailable(this.state.Username).then(response=>{
                            this.setState({UsernameAvailable:response.Data.Available},()=>{
                                if(this.state.UsernameAvailable)
                                {
                                    let Login=this.props.Login;
                                    Login.ScreenName=this.state.Username
                                    this.props.onSetLogin(Login)
                                    this.setState({isLoading:false},()=>{
                                        this.props.navigation.replace('Avatar')
                                        }) 
                                    }
                                else 
                                {
                                    this.setState({isLoading:false})
                                }
                                })
                            })
                    },1500)
                })
              }
              else
              {
                 this.setState({isLoading:true},()=>{

                    setTimeout(()=>{
                        this.loginToBuff(this.state.Username,"",this.state.Password).then(result=>{
                        // console.log("149",result)
                        if(result)
                        {
                         this.setState({isLoading:false},()=>{
                             this.props.navigation.replace('Dashboard')
                         })
                         
                        }
                        else
                        {
                            this.setState({isLoading:false},()=>{
                                ToastAndroid.show("Username Or Password Incorrect",ToastAndroid.SHORT) 
                            })
                        }
                    })
                    },1500)
                    
                 })
              }
            
          }
      }

      onUserNameChange=(e)=>{
         this.setState({Username:e})
      }

      onPasswordChange=(e)=>{
        this.setState({Password:e})
     }

      changeUsernameAvailabilty=()=>{
          this.setState({UsernameAvailable:true})
          this.setState({ErrorMessage:""})
      }

      componentDidMount()
      {
        ToastAndroid.show("V 1.0.10",ToastAndroid.SHORT)
        console.log("Welcome Screen")
        fetchUser().then(result => {
            console.log("Debug Welcome",result)
            if(result.rows.length > 0)
            {
                let JSONUser=JSON.parse(result.rows._array[0].DBData)
                this.props.onSetDashboard(JSONUser)       
                this.props.navigation.navigate('Dashboard')
            }
            else
            {
                console.log("Stay")
            }
        }).catch(err=>{
            console.log(err)
        })
      }
    

    render()
    {
        
        return(
            <AppContiner>
                <ScrollView>
                    <View style={styles.WelcomeView}>
                        <View style={styles.BackImageContainer}>
                            <Image style={styles.BackImage} source={require('../../assets/moviebuffback.png')}  />
                        </View>
                        <View style={styles.JoiningView}>
                            <BoldText style={styles.WelcomeText}>Welcome To</BoldText>
                            <BoldText style={styles.WelcomeText}>Filmy Buzz</BoldText>
                        </View>
                        <View style={styles.InputContainer}>
                            <TextInput onFocus={()=>this.setState({UsernameAvailable:true})} onChangeText={this.onUserNameChange} placeholder={this.state.UsernameAvailable ? "Enter Screen Name":this.state.ErrorMessage ===  "" ? `${this.state.Username} is Not Available`:this.state.ErrorMessage} placeholderTextColor={this.state.UsernameAvailable ? "#BAC1C9":"#ff6961"} style={this.state.UsernameAvailable ? styles.Input:styles.InputError} />
                            {!this.state.IsReg ? 
                            <TextInput secureTextEntry={true} onChangeText={this.onPasswordChange} placeholder={"Enter Password"} style={styles.Input} />:null
                            }
                            <TouchableOpacity style={{width:'100%',justifyContent:'center',alignItems:'center',marginVertical:5}} onPress={()=>this.onProceed()}>
                                <SinglePlayer style={{width:100,flexDirection:'row'}} FlexDirection="row" icon='chevron-right' iconSize={18}>
                                    <NormalText style={{fontSize:16}}>{this.state.IsReg ? "Join Now":"Log-In"}</NormalText>
                                </SinglePlayer>
                                
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.setState({IsReg:!this.state.IsReg})}>
                                <NormalText style={{fontSize:15,color:'#1890ff',marginBottom:10}}> {this.state.IsReg ? "Already Registered ? Click Here":"New User ? Click Here" } </NormalText>
                            </TouchableOpacity>
                        
                            <NormalText>OR</NormalText>
                            
                            <TouchableOpacity onPress={this.logIn.bind(this)}>
                                <Image source={require('../../assets/Fb.png')} style={{height:100,resizeMode:'contain'}} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.Terms}>
                            <NormalText style={styles.TermsText}>By Pressing 'Join' You Agree To Our <Text style={{borderBottomColor:'blue',color:'blue'}}>Terms and Conditions</Text></NormalText>
                        </View>
                    </View>  
                </ScrollView>  

                <Modal isVisible={this.state.isLoading}>
                    <Loader Text={"Please Wait ..."}/>
                </Modal>            
            </AppContiner>
        )
    }
}

const styles=StyleSheet.create({
    WelcomeView:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    BackImageContainer:{
       height:325,
       width:325,
       maxWidth:'90%',
       maxHeight:'90%',
       overflow:'hidden'
    },
    Scroll:{
        flex:1
    },
    BackImage:{
        flex:1,
        width:null,
        height:null,
        resizeMode:'contain'
    },
    NormalText:{
        fontSize:16,
        color:'#00C08A'
    },
    WelcomeText:{
        fontSize:22
    },
    WelcomeNormalText:{
        marginHorizontal:'10%',
        marginVertical:10,
        color:'#BAC1C9'
    },
    JoiningView:{
        alignItems:'center'
    },
    Input:{
        fontFamily:'Niagara',
        borderRadius:5,
        borderColor:'#BAC1C9',
        borderWidth:1,
        width:'90%',
        paddingVertical:5,
        paddingHorizontal:15,
        marginVertical:7,
        color:'#BAC1C9',
        textAlign:'center'
    },
    InputError:{
        fontFamily:'Niagara',
        borderRadius:5,
        borderColor:'#ff6961',
        borderWidth:1,
        width:'90%',
        paddingVertical:5,
        paddingHorizontal:15,
        marginVertical:7,
        color:'#BAC1C9',
        textAlign:'center'
    },
    InputContainer:{
        width:'80%',
        alignItems:'center'
    },
    ButtonContainer:{
        width:'60%',
        marginVertical:10,
        overflow:'hidden',
        borderRadius:20
    },
    FacebookContainer:{
        // width:'60%',
        flexDirection:'row',
        marginVertical:10,
        backgroundColor:"#4c5f87",
        alignItems:'center'
    },
    FacebookIconContainer:{
        paddingHorizontal:5
    },
    Terms:{
        width:'100%',
        alignItems:'center',
        marginVertical:10
    },
    TermsText:{
        fontSize:12,
        textAlign:'center'
    }

})

const mapStateToProps= state =>{
    return{
        FB:state.FB.FBDetails,
        Login:state.FB.LoginDetails
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onSetFB:(response)=>dispatch(setFB(response)),
        onSetLogin:(response)=>dispatch(setLogin(response)),
        onSetDashboard:(response)=>dispatch(setDashboard(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WelcomeScreen);