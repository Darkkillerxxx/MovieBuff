import React from 'react'
import { View, Image, StyleSheet,Button,TouchableOpacity } from 'react-native';
import {Checkbox} from 'react-native-paper'
import AppContainer from '../../Components/AppContainer'
import BoldText from '../../Components/BoldText';
import NormalText from '../../Components/NormalText';
import { FlatList } from 'react-native-gesture-handler';
import {setFB, setLogin} from '../../Store/Actions/ActionJoin'
import {setDashboard} from '../../Store/Actions/ActionDashboard'
import { connect }from 'react-redux'
import {registerUser} from '../../Utils/api'

class Genre extends React.Component{
    constructor()
    {
       super();
    }

    render()
    {
        return(
          <View>

          </View>
        )
    }
}

const style=StyleSheet.create({
    GenreContainer:{
        marginVertical:10,
        width:'50%',
        alignItems:'center',
        justifyContent:'center'
    },
    BoldText:{
        marginVertical:15,
        fontSize:20
    },
    NormalText:{
        fontSize:16,
        marginTop:15
    },
    TiltImageRight:{
        width:70,
        height:100,
        transform:[{rotate:'25deg'}],
        borderRadius:10
    },
    TiltImageLeft:{
        width:70,
        height:100,
        transform:[{rotate:'-25deg'}],
        borderRadius:10
    },
    TiltImageContainer:{
        flexDirection:'row'
    },
    FlatListContainer:{
        width:'100%',
        height:'70%',
        overflow:'hidden',
        alignItems:'center'
    },
    NormalText:{
        fontSize:16,
        color:'#00C08A'
    },
})

const mapStateToProps= state =>{
    return{
        FB:state.FB.FBDetails,
        Login:state.FB.LoginDetails,
        Dashboard:state.Dashboard.Dashboard
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onSetFB:(response)=>dispatch(setFB(response)),
        onSetLogin:(response)=>dispatch(setLogin(response)),
        onSetDashbaord:(response)=>dispatch(setDashboard(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Genre);