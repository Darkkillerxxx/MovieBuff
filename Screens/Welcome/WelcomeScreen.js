import React from 'react'
import { ActivityIndicator,View,Text,Image, StyleSheet,Button,TouchableOpacity,Alert } from 'react-native';
import AppContiner from '../../Components/AppContainer';
import BoldText from '../../Components/BoldText'
import NormalText from '../../Components/NormalText'
import NextButton from '../../Components/NextButton'
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import {setFB, setLogin} from '../../Store/Actions/ActionJoin'
import { connect }from 'react-redux'
import * as Facebook from 'expo-facebook';
import {checkAvailable} from '../../Utils/api'
 
class WelcomeScreen extends React.Component{
    constructor()
    {
        super();
        this.state={
            FacebookResponse:null,
            Username:"",
            UsernameAvailable:true,
            isLoading:false,
            ErrorMessage:""
        }
    }

    async logIn() {
        try {
          await Facebook.initializeAsync('829108874264339');
          const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
          } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile'],
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
                this.props.navigation.navigate('ProfileDetails')
            })
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
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
            this.setState({isLoading:true})
            checkAvailable(this.state.Username).then(response=>{
                this.setState({UsernameAvailable:response.Data.Available},()=>{
                    if(this.state.UsernameAvailable)
                    {
                        let Login=this.props.Login;
                        Login.ScreenName=this.state.Username
                        this.props.onSetLogin(Login)
                        this.props.navigation.navigate('Avatar')
                    }
                })
                this.setState({isLoading:false}) 
            })
          }
        // this.props.navigation.navigate('Dashboard')
      }

      onUserNameChange=(e)=>{
         this.setState({Username:e})
      }

      changeUsernameAvailabilty=()=>{
          this.setState({UsernameAvailable:true})
          this.setState({ErrorMessage:""})
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
                            <BoldText style={styles.WelcomeText}>Welcome</BoldText>
                            <NormalText style={styles.WelcomeNormalText}>Welcome To Movie Buff</NormalText> 
                        </View>
                        <View style={styles.InputContainer}>
                            <TextInput onFocus={()=>this.setState({UsernameAvailable:true})} onChangeText={this.onUserNameChange} placeholder={this.state.UsernameAvailable ? "Enter Screen Name":this.state.ErrorMessage ===  "" ? `${this.state.Username} is Not Available`:this.state.ErrorMessage} placeholderTextColor={this.state.UsernameAvailable ? "#BAC1C9":"#ff6961"} style={this.state.UsernameAvailable ? styles.Input:styles.InputError} />
                            <TouchableOpacity onPress={()=>this.onProceed()}>
                               <NextButton >
                                   {this.state.isLoading ? 
                                    <ActivityIndicator size="small" color="#00C08A" />
                                    :<NormalText style={styles.NormalText}>Join Now</NormalText>
                                    }
                                </NextButton>
                            </TouchableOpacity>

                            <NormalText>OR</NormalText>
                            <View style={styles.FacebookContainer}>
                                <View style={styles.FacebookIconContainer}>
                                    <Image source={require('../../assets/facebook.png')}/>
                                </View>
                                <Button onPress={this.logIn.bind(this)} title="Log-in with Facebook" color="#4c5f87"/>
                            </View>
                        </View>
                        <View style={styles.Terms}>
                            <NormalText style={styles.TermsText}>By Pressing 'Join' You Agree To Our <Text style={{borderBottomColor:'blue',color:'blue'}}>Terms and Conditions</Text></NormalText>
                        </View>
                    </View>  
                </ScrollView>              
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
        fontSize:25,
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
        fontSize:10
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
        onSetLogin:(response)=>dispatch(setLogin(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WelcomeScreen);