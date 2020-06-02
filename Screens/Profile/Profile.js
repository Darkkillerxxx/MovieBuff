import React from 'react'
import { View, StyleSheet,Image, TouchableOpacity } from 'react-native'
import AppContainer from '../../Components/AppContainer';
import NormalText from '../../Components/NormalText';
import BoldText from '../../Components/BoldText';
import NextButton from '../../Components/NextButton';
import BriefInfo from '../../Components/BriefInfo';
import * as Progress from 'react-native-progress';
import { FlatList } from 'react-native-gesture-handler';

class Profile extends React.Component{
    constructor()
    {
        super();
        this.state={
          
    }
}

   
    
    render()
    {
        return(
           <View>

           </View>
        )
    }
}

const styles=StyleSheet.create({
    AppContainer:{
        alignItems:'center',
        justifyContent:'flex-start',
        padding:10
    },
    ProfileImage:{
        width:150,
        height:150
    },
    MiniInfo:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    Infoicons:{
        height:20,
        width:20
    },
    CrownIcon:{ 
        height:25,
        width:25,
        marginTop:-5,
        bottom:5
    },
    Info:{
       
        justifyContent:'center',
        alignItems:'center',
        margin:10
    },
    Genre:{
        margin:5,
        width:'98%',
        backgroundColor:"#4E515A",
        flexDirection:'row',
        padding:10,
        borderRadius:15
    },
    TiltImageRight:{
        width:35,
        height:65,
        transform:[{rotate:'25deg'}],
        borderRadius:10
    },
    TiltImageLeft:{
        width:35,
        height:65,
        transform:[{rotate:'-25deg'}],
        borderRadius:10
    },
    TiltImageContainer:{
        flexDirection:'row',
        width:'30%',
        alignItems:'center'
    },
    GenreInfo:{
        alignItems:'center',
        width:'70%'
    },
    IconInfo:{
        margin:5,
        flexDirection:'row'
    },
    ProgressBarContianer:{
        marginVertical:15
    }
})

export default Profile;