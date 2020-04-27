import React from 'react'
import { View, StyleSheet,Image,FlatList } from 'react-native';
import AppContainer from '../../Components/AppContainer';
import BoldText from '../../Components/BoldText';
import {Checkbox} from 'react-native-paper'
import NormalText from '../../Components/NormalText';
import * as Progress from 'react-native-progress';
import NextButton from '../../Components/NextButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

class CustomGame extends React.Component{
    constructor()
    {
        super();
        this.state={
            Region:[
                {
                    id:1,
                    url1:require('../../assets/Temp/holly2.jpg'),
                    url2:require('../../assets/Temp/holly1.jpg'),
                    Name:"English"
                },
                {
                    id:2,
                    url1:require('../../assets/Temp/bolly2.jpg'),
                    url2:require('../../assets/Temp/bolly1.jpg'),
                    Name:"हिन्दी"
                },
                {
                    id:3,
                    url1:require('../../assets/Temp/m2.jpg'),
                    url2:require('../../assets/Temp/m1.jpg'),
                    Name:"मराठी"
                },
                {
                    id:4,
                    url1:require('../../assets/Temp/g2.jpg'),
                    url2:require('../../assets/Temp/g1.jpg'),
                    Name:"ગુજરાતી"
                },
                {
                    id:5,
                    url1:require('../../assets/Temp/t2.jpg'),
                    url2:require('../../assets/Temp/t1.jpg'),
                    Name:"தமிழ்"
                },
                {
                    id:6,
                    url1:require('../../assets/Temp/f2.jpg'),
                    url2:require('../../assets/Temp/f1.jpg'),
                    Name:"française"
                }
            ]
        }
    }


    RegionCard=(itemData)=>{
       return(
        <View style={style.RegionCard}>
            <View style={{alignItems:'center',justifyContent:'center',marginTop:15}}>
                <View style={style.TiltImageContainer}>
                    <Image  source={itemData.item.url1} style={style.TiltImageLeft}/>
                    <Image  source={itemData.item.url2} style={style.TiltImageRight}/>
                </View>
                
                <View style={{position:'absolute'}}>
                <Checkbox
                status={"unchecked"}
                onPress={()=>{}}
                uncheckedColor="white"/>
                </View>
            </View>
            <NormalText style={style.NormalText}>{itemData.item.Name}</NormalText>
            <View style={style.ProgressBarContianer}>
                <Progress.Bar borderColor="#11233A" unfilledColor="#11233A" color="#59D654" progress={0.1} width={120}/>  
            </View>
        </View>
       )
       
 
    }

    render()
    {
        return(
            <AppContainer style={style.AppContainer}>
                <BoldText style={style.BoldText}>Select Genre</BoldText>
                <View style={style.RegionView}>
                    <FlatList data={this.state.Region} renderItem={this.RegionCard} numColumns={2}/>
                </View>
                <View style={style.ProceedButtonContainer}>
                    <TouchableOpacity style={{width:'100%'}} onPress={()=>this.props.navigation.navigate('SPGameScreen')}>
                        <NextButton>
                            <NormalText style={style.NormalText}>Proceed</NormalText>
                        </NextButton>
                    </TouchableOpacity>
                </View>
            </AppContainer>
        )
    }
}


const style=StyleSheet.create({
    AppContainer:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
        padding:20
    },
    ProceedButtonContainer:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    ProgressBarContianer:{
        marginBottom:10,
    },
    BoldText:{
        fontSize:22
    },
    NormalText:{
        fontSize:18,
        marginVertical:10
    },
    RegionView:{
        width:'100%',
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        marginTop:15,
        height:'85%',
        overflow:'hidden'
    },
    RegionCard:{
        width:'45%',
        backgroundColor:"#203756",
        alignItems:'center',
        justifyContent:'center',
        borderRadius:25,
        elevation:5,
        marginVertical:10,
        marginHorizontal:10
    },
    TiltImageRight:{
        width:50,
        height:80,
        transform:[{rotate:'25deg'}],
        borderRadius:10
    },
    TiltImageLeft:{
        width:50,
        height:80,
        transform:[{rotate:'-25deg'}],
        borderRadius:10
    },
    TiltImageContainer:{
        flexDirection:'row'
    },
})

export default CustomGame