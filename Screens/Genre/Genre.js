import React from 'react'
import { View, Image, StyleSheet,Button } from 'react-native';
import {Checkbox} from 'react-native-paper'
import AppContainer from '../../Components/AppContainer'
import BoldText from '../../Components/BoldText';
import NormalText from '../../Components/NormalText';
import { FlatList } from 'react-native-gesture-handler';
import NextButton from '../../Components/NextButton';

class Genre extends React.Component{
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

    showRegions=(itemData)=>{
        return(
            <View style={style.GenreContainer}>
                    <View style={style.TiltImageContainer}>
                        <Image source={itemData.item.url1} style={style.TiltImageLeft}/>
                        <Image source={itemData.item.url2} style={style.TiltImageRight}/>
                    </View>
                    <View style={{position:'absolute'}}>
                        <Checkbox
                        status={"unchecked"}
                        onPress={()=>{}}
                        uncheckedColor="white"/>
                    </View>
                    <NormalText style={style.NormalText}>{itemData.item.Name}</NormalText>
                </View>
        )
    }

    render()
    {
        return(
            <AppContainer>
                <BoldText style={style.BoldText}>Select Region</BoldText>
                <View style={style.FlatListContainer}>
                    <FlatList data={this.state.Region} renderItem={this.showRegions} numColumns={2}/>
                </View>
                <NextButton>
                    <Button title="Next" color="#6665FF"></Button>
                </NextButton>
                
            </AppContainer>
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
    }
})


export default Genre