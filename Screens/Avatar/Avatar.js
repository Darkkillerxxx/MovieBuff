import React from 'react'
import { View, StyleSheet,Image,FlatList,Button,TouchableOpacity } from 'react-native';
import AppContainer from '../../Components/AppContainer'
import BoldText from '../../Components/BoldText'
import NormalText from '../../Components/NormalText';
import FacebookButton from '../../Components/FacebookButton'
import NextButton from '../../Components/NextButton'
import {setFB} from '../../Store/Actions/ActionJoin'
import { connect }from 'react-redux'
import {getAvatarList} from '../../Utils/api'
class Avatar extends React.Component{
    constructor()
    {
        super();
        this.state={
           Icons:[],
           SelectedIcon:1
        }
        
    }

    componentDidMount()
    {
        console.log("Avatar Redux",this.props.FB)
        console.log("Avatar Login Redux",this.props.Login)

        getAvatarList().then(result=>{
            this.setState({Icons:result.Data})
        })
    }


    miniIcon=(itemData)=>{
        return(
            <View style={{ height:50,width:55,borderColor:`${itemData.item.avatar_id === this.state.SelectedIcon ? "#6665FF":"#1D3451"}`,borderWidth:itemData.item.avatar_id === this.state.SelectedIcon ? 1: 0,alignItems:'center',justifyContent:'center'}}>  
                <Image source={{uri:itemData.item.a_img_url}} style={{height:40,width:40}}/>
            </View>
        )
    }

    render()
    {
        return(
            <AppContainer>
                <BoldText style={style.BoldText}>Choose Your Avatar</BoldText>
                <View style={style.AvatarContainer}>
                    <Image source={{uri:this.state.Icons.length > 0 ? this.state.Icons[this.state.SelectedIcon - 1].a_img_url:null}} style={style.Avatar} />
                </View>
                <View style={style.MiniIconContainer}>
                    <View>
                        <FlatList keyExtractor={(item, index) => item.avatar_id} data={this.state.Icons} renderItem={this.miniIcon} numColumns={5} />
                    </View>
                </View>
               <TouchableOpacity onPress={()=>this.props.navigation.navigate('Genre')}>
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
        marginVertical:20  
    },
    Avatar:{
        height:100,
        width:100
    },
    MiniIconContainer:{
        width:300,
        height:100,
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
})


const mapStateToProps= state =>{
    return{
        FB:state.FB.FBDetails,
        Login:state.FB.LoginDetails
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onSetFB:(response)=>dispatch(setFB(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Avatar);