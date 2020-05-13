import React from 'react'
import { View, StyleSheet,Image,FlatList,Button,TouchableOpacity } from 'react-native';
import AppContainer from '../../Components/AppContainer'
import BoldText from '../../Components/BoldText'
import NormalText from '../../Components/NormalText';
import FacebookButton from '../../Components/FacebookButton'
import NextButton from '../../Components/NextButton'
import {setFB,setLogin,setPrevPage} from '../../Store/Actions/ActionJoin'
import { connect }from 'react-redux'
import {getAvatarList} from '../../Utils/api'
import {Ionicons,FontAwesome} from '@expo/vector-icons'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

class Avatar extends React.Component{
    constructor()
    {
        super();
        this.state={
           Icons:[],
           SelectedIcon:1,
           ImageBase64:""
        }
        
    }

    componentDidMount()
    {
        console.log("Avatar Redux",this.props.FB)
        console.log("Avatar Login Redux",this.props.Login)

        getAvatarList().then(result=>{
            console.log("Avatar List",result)
            if(result.IsSuccess)
            {
                this.setState({Icons:result.Data})
            }   
           
        })
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
     ImagePicker.launchCameraAsync({allowsEditing:true,aspect:[4,4],base64:true,quality:0.3}).then(
         image=>{
            this.setState({ImageBase64:image.base64})
         }
     )
     }

     pickImage=async()=>{
        const hasPermission=await this.VerifyPermissions() 
        if(hasPermission)
        {
          this.takeImage()
        }
      }

    onIconsSelected=(id)=>{
        this.setState({SelectedIcon:id},()=>{
            this.setState({ImageBase64:""})
        })
    }


    miniIcon=(itemData)=>{
        return(
            <TouchableOpacity onPress={()=>this.onIconsSelected(itemData.item.avatar_id)}>
                <View style={{ height:50,width:55,borderColor:`${itemData.item.avatar_id === this.state.SelectedIcon ? "#6665FF":"#1D3451"}`,borderWidth:itemData.item.avatar_id === this.state.SelectedIcon ? 1: 0,alignItems:'center',justifyContent:'center'}}>  
                    <Image source={{uri:itemData.item.a_img_url}} style={{height:40,width:40}}/>
                </View>
            </TouchableOpacity>
           
        )
    }

    onProceedClick=()=>{
        let Login=this.props.Login;
        Login.AvatarId = this.state.SelectedIcon;
        Login.AvatarBase64 = this.state.ImageBase64
        Login.AvatarURL=this.state.Icons[this.state.SelectedIcon -1].a_img_url
        this.props.onSetLogin(Login)
        this.props.onSetPrevPage('Avatar')
        this.props.navigation.navigate('ProfileDetails')
    }

    render()
    {
        return(
            <AppContainer>
                <BoldText style={style.BoldText}>Choose Your Avatar</BoldText>
                <View style={style.AvatarContainer}>
                    {this.state.ImageBase64 !==  "" ? 
                    <Image source={{uri: `data:image/jpeg;base64,${this.state.ImageBase64}`}} style={style.AvatarBase64} />:
                    <Image source={{uri:this.state.Icons.length > 0 ? this.state.Icons[this.state.SelectedIcon - 1].a_img_url:null}} style={style.Avatar} />}
                   
                    <View style={style.EditIconContainer}>
                        <TouchableOpacity onPress={()=>this.pickImage()}>
                            <FontAwesome name="pencil" size={14} color="white"/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={style.MiniIconContainer}>
                    <View>
                        <FlatList keyExtractor={(item, index) => item.avatar_id} data={this.state.Icons} renderItem={this.miniIcon} numColumns={5} />
                    </View>
                </View>
               <TouchableOpacity onPress={()=>this.onProceedClick()}>
                    <NextButton>
                        <NormalText style={style.NormalText}>Proceed</NormalText>
                    </NextButton>   
               </TouchableOpacity>
                        
            </AppContainer>
        )
    }
}


const style=StyleSheet.create({
    BoldText:{
        fontSize:18
    },
    BoldText2:{
        fontSize:14,
        marginVertical:5  
    },
    AvatarContainer:{
        marginVertical:20,
        alignItems:'center'  
    },
    Avatar:{
        height:100,
        width:100,
        resizeMode:'contain'
    },
    AvatarBase64:{
        height:100,
        width:100,
        resizeMode:'contain',
        borderRadius:400
    },
    MiniIconContainer:{
        width:300,
        height:200,
        maxWidth:'90%',
        padding:5
    },
    MiniIcon:{
        height:40,
        width:40
    },
    FacebookContainer:{
        flexDirection:'row',
        marginVertical:10,
        backgroundColor:"#4c5f87",
        alignItems:'center',
        justifyContent:'center'
    },
    FacebookIconContainer:{
        paddingHorizontal:5
    },
    NextButton:{
        width:300,
        height:100,
        borderColor:'white',
        borderWidth:1,
        justifyContent:'space-between'
    },
    NormalText:{
        fontSize:16,
        color:'#00C08A'
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
        onSetLogin:(response)=>dispatch(setLogin(response)),
        onSetPrevPage:(response)=>dispatch(setPrevPage(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Avatar);