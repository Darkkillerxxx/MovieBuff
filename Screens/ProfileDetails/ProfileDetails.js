import React from 'react'
import { View,StyleSheet,Text,TextInput,Image,Alert,ActivityIndicator,Keyboard } from 'react-native';
import AppContainer from '../../Components/AppContainer';
import Input from '../../Components/TextInput'
import NormalText from '../../Components/NormalText';
import NextButton from '../../Components/NextButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Ionicons,FontAwesome} from '@expo/vector-icons'
import {setFB, setLogin} from '../../Store/Actions/ActionJoin'
import { connect }from 'react-redux'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {checkAvailable} from '../../Utils/api'

class ProfileDetails extends React.Component{
    constructor()
    {
        super();
        this.state={
            FacebookResponse:null,
            Username:"",
            UsernameAvailable:true,
            isLoading:false,
            LoginDetails:null,
            FirstName:"",
            LastName:"",
            Country:"",
            MartialStatus:"",
            Profession:"",
            EmailId:"",
            ImageBase64:"",
            ErrorMessage:""
        }
    }

     VerifyPermissions = async ()=>{
        const result=await Permissions.askAsync(Permissions.CAMERA,Permissions.CAMERA_ROLL)
        if(result.status !== 'granted')
        {
            Alert.alert('Insufficient permissions','You Need to Grant Permissions',[{text:'Kkay'}])
            return false
        }
        return true
     }

     takeImage=()=>{
     ImagePicker.launchCameraAsync({allowsEditing:true,aspect:[4,4],base64:true,quality:0.5}).then(
         image=>{
            this.setState({ImageBase64:image.base64})
         }
     )
     }

    componentDidMount()
    {
        console.log(this.props.Login)
        this.setState({LoginDetails:this.props.Login})
        this.setState({FirstName:this.props.FB.first_name})
        this.setState({LastName:this.props.FB.last_name})
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


    pickImage=async()=>{
      const hasPermission=await this.VerifyPermissions() 
      if(hasPermission)
      {
        this.takeImage()
      }
    }

    onProceed=()=>{
        Keyboard.dismiss();
        if(this.validation())
        {
            console.log("Here")
        this.setState({isLoading:true})
        checkAvailable(this.state.Username).then(response=>{
            this.setState({UsernameAvailable:response.Data.Available},()=>{
                if(this.state.UsernameAvailable)
                {
                    let Login=this.props.Login;
                    Login.ScreenName=this.state.Username
                    Login.FirstName=this.state.FirstName
                    Login.LastName=this.state.LastName
                    Login.Country=this.state.Country
                    Login.MartialStatus=this.state.MartialStatus
                    Login.Profession=this.state.Profession
                    Login.EmailId=this.state.EmailId
                    Login.AvatarBase64=this.state.ImageBase64
                    this.props.onSetLogin(Login)
                    this.props.navigation.navigate('Genre')
                }
            })
            this.setState({isLoading:false})
        })
        }
    }

    onUserNameChange=(e)=>{
        this.setState({Username:e},()=>{
            this.setState({UsernameAvailable:true})
        })
     }

     onFocus=()=>{
        this.setState({UsernameAvailable:true})
          this.setState({ErrorMessage:""})
     }
   

    render()
    {
        return(
            <AppContainer style={styles.AppContainer}>
                <View style={styles.ProfilePicContainer}>
                    {this.state.ImageBase64 === "" ? 
                         <Image source={this.state.LoginDetails === null ? require('../../assets/Temp/User1.png'):{uri:this.state.LoginDetails.AvatarFacebook}} style={styles.ProfilePic}/>:
                         <Image source={{uri:`data:image/jpeg;base64,${this.state.ImageBase64}`}} style={styles.ProfilePicBase64}/>
                    }
                   
                    <View style={styles.EditIconContainer}>
                        <TouchableOpacity onPress={()=>this.pickImage()}>
                            <FontAwesome name="pencil" size={14} color="white"/>
                        </TouchableOpacity>
                    </View>
                </View>
                <NormalText>* Enter Your Screen Name</NormalText>
                <TextInput onFocus={()=>this.setState({UsernameAvailable:true})} onChangeText={this.onUserNameChange} style={this.state.UsernameAvailable ? {...styles.Input,...{width:'100%'}}:{...styles.InputError,...{width:'100%'}}} onChangeText={(e)=>this.setState({Username:e})} placeholder={this.state.UsernameAvailable ? "Screen Name":this.state.ErrorMessage === "" ? `${this.state.Username} is Not Available`:this.state.ErrorMessage} placeholderTextColor={this.state.UsernameAvailable ? "#BAC1C9":"#ff6961"}  />
                <View style={styles.FLContainer}>
                    <View style={{width:'48%',marginRight:10}}>
                        <NormalText>Enter First Name</NormalText>
                        <TextInput value={this.state.FirstName} style={{...styles.Input,...{width:'100%'}}} onChangeText={(e)=>this.setState({FirstName:e})} placeholder="First Name" placeholderTextColor="#BAC1C9"  />
                    </View>
                    <View style={{width:'48%'}}>
                        <NormalText>Enter Last Name</NormalText>
                        <TextInput value={this.state.LastName} style={ {...styles.Input,...{width:'100%'}}} onChangeText={(e)=>this.setState({LastName:e})} placeholder="Last Name" placeholderTextColor="#BAC1C9"  />
                    </View>
                </View>
                <View style={styles.FLContainer}>
                    <View style={{width:'48%',marginRight:10}}>
                        <NormalText>Enter Country</NormalText>
                        <TextInput style={ {...styles.Input,...{width:'100%'}}} onChangeText={(e)=>this.setState({Country:e})} placeholder="Country" value="India" placeholderTextColor="#BAC1C9"  />
                    </View>
                    <View style={{width:'48%'}}>
                        <NormalText>Enter Martial Status</NormalText>
                        <TextInput style={ {...styles.Input,...{width:'100%'}}} onChangeText={(e)=>this.setState({MartialStatus:e})} placeholder="Martial Status" value="Single" placeholderTextColor="#BAC1C9"  />
                    </View>
                </View>
                <View style={styles.FLContainer}>
                    <View style={{width:'48%',marginRight:10}}>
                        <NormalText>Enter Country</NormalText>
                        <TextInput style={ {...styles.Input,...{width:'100%'}}} onChangeText={(e)=>this.setState({Profession:e})} placeholder="Profession"  placeholderTextColor="#BAC1C9"  />
                    </View>
                    <View style={{width:'48%'}}>
                        <NormalText>Enter Martial Status</NormalText>
                        <TextInput style={ {...styles.Input,...{width:'100%'}}} onChangeText={(e)=>this.setState({EmailId:e})} placeholder="Enter Email Id" placeholderTextColor="#BAC1C9"  />
                    </View>
                </View>
                <View style={styles.ButtonContainer}>
                    <TouchableOpacity onPress={()=>this.onProceed()} style={{width:300,alignItems:'center'}}>
                        <NextButton>
                        {this.state.isLoading ? 
                                    <ActivityIndicator size="small" color="#00C08A" />
                                    :<NormalText style={styles.NormalText}>Proceed</NormalText>
                                    }
                        </NextButton>
                    </TouchableOpacity>
                </View>
            </AppContainer>
        )
    }
}


const styles=StyleSheet.create({
    AppContainer:{
        padding:15,
        alignItems:'flex-start',
        justifyContent:'flex-start'
    },
    Input:{
        borderRadius:5,
        borderColor:'#BAC1C9',
        borderWidth:1,
        width:'100%',
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
        width:'100%',
        paddingVertical:5,
        paddingHorizontal:15,
        marginVertical:7,
        color:'#BAC1C9',
        textAlign:'center'
    },
    FLContainer:{
        flexDirection:'row',
        marginTop:10,
        width:'100%'
    },
    ButtonContainer:{
        marginTop:15,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    ProfilePicContainer:{
        width:'100%',
        height:100,
        alignItems:'center',
        justifyContent:'center'
    },
    ProfilePic:{
        width:75,
        height:75,
        resizeMode:'stretch',
        borderRadius:100
    },
    ProfilePicBase64:{
        width:75,
        height:75,
        resizeMode:'contain',
        borderRadius:300
    },
    EditIconContainer:{
        width:25,
        height:25,
        marginTop:-15,
        borderRadius:20,
        backgroundColor:"#16d39a",
        overflow:'hidden',
        alignItems:'center',
        justifyContent:'center',
        elevation:1
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

export default connect(mapStateToProps,mapDispatchToProps)(ProfileDetails);

// export default ProfileDetails