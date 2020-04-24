import React from 'react'
import { View, StyleSheet,Image,FlatList,Button } from 'react-native';
import AppContainer from '../../Components/AppContainer'
import BoldText from '../../Components/BoldText'
import NormalText from '../../Components/NormalText';
import FacebookButton from '../../Components/FacebookButton'
import NextButton from '../../Components/NextButton'

class Avatar extends React.Component{
    constructor()
    {
        super();
        this.state={
           Icons:[     
                {
                    id:1,
                    image:require('../../assets/Temp/User1.png')
                },
                {
                    id:2,
                    image:require('../../assets/Temp/User2.png')
                },
                {
                    id:3,
                    image:require('../../assets/Temp/User3.png')
                },
                {
                    id:4,
                    image:require('../../assets/Temp/User4.png')
                },
                {
                    id:5,
                    image:require('../../assets/Temp/User5.png')
                },
                {
                    id:6,
                    image:require('../../assets/Temp/User6.png')
                }
           ]
           
        }
    }


    miniIcon=(itemData)=>{
        return(
            <View style={{ height:50,width:55,borderColor:`${itemData.item.id === 1 ? "#6665FF":"#1D3451"}`,borderWidth:itemData.item.id === 1 ? 1: 0,alignItems:'center',justifyContent:'center'}}>  
                <Image source={itemData.item.image} style={{height:40,width:40}}/>
            </View>
        
        )
    }

    render()
    {
        return(
            <AppContainer>
                <BoldText style={style.BoldText}>Choose Your Avatar</BoldText>
                <View style={style.AvatarContainer}>
                    <Image source={require('../../assets/Temp/User1.png')} style={style.Avatar} />
                </View>
                <View style={style.MiniIconContainer}>
                    <View>
                        <FlatList data={this.state.Icons} renderItem={this.miniIcon} numColumns={5} />
                    </View>
                </View>
                <BoldText style={style.BoldText2}>OR</BoldText>
               <FacebookButton>
                    <Button title="Get Profile Pic From Your Facebook" color="#4c5f87"/>
               </FacebookButton>
                <NextButton>
                    <Button title="Next" onPress={()=>this.props.navigation.navigate('Genre')} color="#6665FF"></Button>
                </NextButton>            
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
    }
})


export default Avatar;