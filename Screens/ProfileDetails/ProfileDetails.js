import React from 'react'
import { View,StyleSheet,Text,TextInput,Image,Alert,ActivityIndicator,Keyboard } from 'react-native';
import AppContainer from '../../Components/AppContainer';
import Input from '../../Components/TextInput'
import NormalText from '../../Components/NormalText';
import NextButton from '../../Components/NextButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Ionicons,FontAwesome} from '@expo/vector-icons'
import {setFB, setLogin, setPrevPage} from '../../Store/Actions/ActionJoin'
import { connect }from 'react-redux'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {checkAvailable,registerUser} from '../../Utils/api'
import { setDashboard } from '../../Store/Actions/ActionDashboard';
import {insertUser} from '../../Database/Helper'
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
            ErrorMessage:"",
            isFirstNameEmpty:false,
            isLastNameEmpty:false,
            isPasswordEmpty:false,
            Password:"",
            ConfirmPassword:"",
            PasswordMatch:true
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
        console.log(this.props.PrevPage)
        console.log("FB",this.props.FB)
        this.setState({LoginDetails:this.props.Login},()=>{
            console.log("Login Details",this.state.LoginDetails)
        })
        this.setState({ImageBase64:this.props.Login.AvatarBase64})
        this.setState({FirstName:this.props.PrevPage === "Avatar" ? "":this.props.FB.first_name})
        this.setState({LastName:this.props.PrevPage === "Avatar" ? "":this.props.FB.last_name})
        this.setState({Username:this.props.PrevPage === "Avatar" ? this.props.Login.ScreenName:""})
        
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
        else if(this.state.FirstName.length === 0)
        {
            this.setState({isFirstNameEmpty:true})
            return false;
        }
        else if(this.state.LastName.length === 0)
        {
            this.setState({isLastNameEmpty:true})
            return false;
        }
        else if(this.state.Password.length === 0)
        {
            this.setState({isPasswordEmpty:true})
            return false;
        }
        else if(this.state.Password !== this.state.ConfirmPassword)
        {
            this.setState({PasswordMatch:false})
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
        if(this.props.PrevPage !== "Avatar")
        {
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
                        Login.AvatarBase64=this.state.ImageBase64,
                        Login.Password=this.state.Password
                        this.props.onSetLogin(Login)

                        let RegPayload={
                            "Country":"India",
                            "FB Id":Login.FbId,
                            "ScreenName":Login.ScreenName,
                            "FirstName":Login.FirstName,
                            "LastName":Login.LastName,
                            "MaritalStatus":Login.MaritalStatus,
                            "Profession":Login.Profession,
                            "Email Id":Login.EmailId,
                            "AvatarId":this.state.ImageBase64 === "" ? Login.AvatarFacebook === "" ? Login.AvatarId:"":"",
                            "AvatarBase64":this.state.ImageBase64,
                            "AvatarFacebook":this.state.ImageBase64 === "" ? Login.AvatarFacebook:"",
                            "SelectedGenre":Login.SelectedGenre,
                            "SelectedRegion":Login.SelectedRegion
                        }
                       
                        registerUser(RegPayload).then(response=>{
                            console.log(response)
                            if(response.IsSuccess)
                            {
                                let TempDB=response.Data[0];
                                TempDB.ScreenName=this.props.Login.ScreenName,
                                TempDB.Password="",
                                TempDB.FbId=this.props.Login.FbId
                                TempDB.isNew=true
                                TempDB.Coins=500
                                insertUser(JSON.stringify(TempDB))
                                this.props.onSetDashbaord(TempDB)
                                console.log("Response Genre",response.Data)
                                this.props.navigation.replace('Dashboard')
                            }
                        })
                    }
                })
               
            })
        }
        else
        {
            let LoginRedux=this.props.Login;
            let RegPayload={
                "Country":"India",
                "FB Id":"",
                "ScreenName":this.state.Username,
                "FirstName":this.state.FirstName,
                "LastName":this.state.LastName,
                "MaritalStatus":this.state.MartialStatus,
                "Profession":this.state.Profession,
                "Email Id":this.state.EmailId,
                "AvatarId":this.state.ImageBase64 === "" ? LoginRedux.AvatarId:"",
                "AvatarBase64":this.state.ImageBase64,
                "AvatarFacebook":"",
                "SelectedGenre":"",
                "SelectedRegion":"",
                "Password":this.state.Password
            }

            registerUser(RegPayload).then(response=>{
                console.log(response)
                if(response.IsSuccess)
                {
                    let TempDB=response.Data[0];
                    TempDB.ScreenName=this.props.Login.ScreenName
                    TempDB.Password=this.state.Password
                    TempDB.FbId=""
                    TempDB.isNew=true
                    TempDB.Coins=500
                    insertUser(JSON.stringify(TempDB))
                    this.props.onSetDashbaord(TempDB)
                    console.log("Response Genre",response.Data)
                    this.props.navigation.replace('Dashboard')
                }
            })
        }
       
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
                    {this.props.PrevPage !== "Avatar" ? 
                    this.state.ImageBase64 === "" ? 
                    <Image source={this.state.LoginDetails === null ? require('../../assets/Temp/User1.png'):{uri:this.state.LoginDetails.AvatarFacebook}} style={styles.ProfilePic}/>:
                    <Image source={{uri:`data:image/jpeg;base64,${this.state.ImageBase64}`}} style={styles.ProfilePicBase64}/>
                    :
                    this.state.ImageBase64 === "" ? 
                    <Image source={{uri:`${this.props.Login.AvatarURL}`}} style={styles.ProfilePicBase64}/>:<Image source={{uri:`data:image/jpeg;base64,${this.state.ImageBase64}`}} style={styles.ProfilePicBase64}/>
                    }
                   
                    {/* <View style={styles.EditIconContainer}>
                        <TouchableOpacity onPress={()=>this.pickImage()}>
                            <FontAwesome name="pencil" size={14} color="white"/>
                        </TouchableOpacity>
                    </View> */}
                </View>
                {this.props.PrevPage !== "Avatar" ? 
                    <NormalText>* Enter Your Screen Name</NormalText>:null}
                {this.props.PrevPage !== "Avatar" ? 
                 <TextInput onFocus={()=>this.setState({UsernameAvailable:true})} onChangeText={this.onUserNameChange} style={this.state.UsernameAvailable ? {...styles.Input,...{width:'100%'}}:{...styles.InputError,...{width:'100%'}}} onChangeText={(e)=>this.setState({Username:e})} placeholder={this.state.UsernameAvailable ? "Screen Name":this.state.ErrorMessage === "" ? `${this.state.Username} is Not Available`:this.state.ErrorMessage} placeholderTextColor={this.state.UsernameAvailable ? "#BAC1C9":"#ff6961"}  />:null}
        
                <View style={styles.FLContainer}>
                    <View style={{width:'48%',marginRight:10}}>
                        {this.state.isFirstNameEmpty ? <NormalText style={{color:'#ff6961'}}>First Name is Required</NormalText>:<NormalText>(*) Enter First Name</NormalText>}
                        <TextInput value={this.state.FirstName} style={{...styles.Input,...{width:'100%'}}} onChangeText={(e)=>this.setState({FirstName:e},()=>this.setState({isFirstNameEmpty:false}))} placeholder="First Name" placeholderTextColor="#BAC1C9"  />
                    </View>
                    <View style={{width:'48%'}}>
                        {this.state.isLastNameEmpty ? <NormalText style={{color:'#ff6961'}}>Last Name is Required</NormalText>:<NormalText>(*) Enter Last Name</NormalText>}
                        <TextInput value={this.state.LastName} style={ {...styles.Input,...{width:'100%'}}} onChangeText={(e)=>this.setState({LastName:e},()=>this.setState({isLastNameEmpty:false}))} placeholder="Last Name" placeholderTextColor="#BAC1C9"  />
                    </View>
                </View>
                <View style={styles.FLContainer}>
                    <View style={{width:'48%',marginRight:10}}>
                    {!this.state.PasswordMatch ? <NormalText style={{color:'#ff6961'}}>Passwords Did Not Match</NormalText>:this.state.isPasswordEmpty ? <NormalText style={{color:'#ff6961'}}>Passwords Cannot be Blank</NormalText>:<NormalText>(*) Enter Password</NormalText>}
                        <TextInput style={ {...styles.Input,...{width:'100%'}}} secureTextEntry={true} onChangeText={(e)=>this.setState({Password:e},()=>this.setState({PasswordMatch:true}))} placeholder="Enter Password"  placeholderTextColor="#BAC1C9"  />
                    </View>
                    <View style={{width:'48%'}}>
                    {!this.state.PasswordMatch ? <NormalText style={{color:'#ff6961'}}>Passwords Did Not Match</NormalText>:<NormalText>(*) Re-Enter Password</NormalText>}
                        <TextInput style={ {...styles.Input,...{width:'100%'}}} secureTextEntry={true} onChangeText={(e)=>this.setState({ConfirmPassword:e},()=>this.setState({PasswordMatch:true}))} placeholder="Re-Enter Password" placeholderTextColor="#BAC1C9"  />
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
        Login:state.FB.LoginDetails,
        PrevPage:state.FB.PrevPage
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onSetFB:(response)=>dispatch(setFB(response)),
        onSetLogin:(response)=>dispatch(setLogin(response)),
        onSetPrevPage:(response)=>dispatch(setPrevPage(response)),
        onSetDashbaord:(response)=>dispatch(setDashboard(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileDetails);

// export default ProfileDetails