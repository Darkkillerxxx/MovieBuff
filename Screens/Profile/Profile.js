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
            Region:[
                {
                    id:"1",
                    url1:require('../../assets/Temp/holly2.jpg'),
                    url2:require('../../assets/Temp/holly1.jpg'),
                    Name:"English",
                    Coins:100,
                    Crowns:10,
                    Medals:7,
                    Progress:0.8
                },
                {
                    id:"2",
                    url1:require('../../assets/Temp/bolly2.jpg'),
                    url2:require('../../assets/Temp/bolly1.jpg'),
                    Name:"हिन्दी",
                    Coins:100,
                    Crowns:10,
                    Medals:7,
                    Progress:0.9
                },
                {
                    id:'3',
                    url1:require('../../assets/Temp/m2.jpg'),
                    url2:require('../../assets/Temp/m1.jpg'),
                    Name:"मराठी",
                    Coins:100,
                    Crowns:10,
                    Medals:7,
                    Progress:0.5
                },
                {
                    id:"4",
                    url1:require('../../assets/Temp/g2.jpg'),
                    url2:require('../../assets/Temp/g1.jpg'),
                    Name:"ગુજરાતી",
                    Coins:100,
                    Crowns:10,
                    Medals:7,
                    Progress:0.2
                },
                {
                    id:"5",
                    url1:require('../../assets/Temp/t2.jpg'),
                    url2:require('../../assets/Temp/t1.jpg'),
                    Name:"தமிழ்",
                    Coins:100,
                    Crowns:10,
                    Medals:7,
                    Progress:0.1
                },
                {
                    id:"6",
                    url1:require('../../assets/Temp/f2.jpg'),
                    url2:require('../../assets/Temp/f1.jpg'),
                    Name:"française",
                    Coins:100,
                    Crowns:10,
                    Medals:7,
                    Progress:0.7
                }
            ]
        }
    }

    Region=(itemData)=>{
        return(
        <View style={styles.Genre}>
                <View style={styles.TiltImageContainer}>
                    <Image source={itemData.item.url1} style={styles.TiltImageLeft}/>
                    <Image source={itemData.item.url2} style={styles.TiltImageRight}/>
                </View>
                <View style={styles.GenreInfo}>
                    <BoldText style={{fontSize:15}}>{itemData.item.Name}</BoldText>
                    <View style={styles.IconInfo}>
                        <BriefInfo Brief={{width:65,margin:1}} Image={require('../../assets/coins.png')} value={itemData.item.Coins} />
                        <BriefInfo Brief={{width:65,margin:1}} Image={require('../../assets/Crown.png')} value={itemData.item.Crowns} />
                        <BriefInfo Brief={{width:65,margin:1}} Image={require('../../assets/medal.png')} value={itemData.item.Medals} />
                    </View>
                    <View style={styles.ProgressBarContianer}>
                        <Progress.Bar borderColor="#11233A" unfilledColor="#11233A" color="#59D654" progress={itemData.item.Progress} width={210}/>  
                    </View>
                </View>
        </View>
        )
    }
    
    render()
    {
        return(
            <AppContainer style={styles.AppContainer}>
                <Image style={styles.ProfileImage} source={require('../../assets/Temp/User1.png')}/>
                <BoldText style={{fontSize:18,marginVertical:5}}>Eva Doe</BoldText>
                <NormalText style={{fontSize:15,color:"#8B96A6",marginVertical:5}}>Level 12</NormalText>
                <View style={styles.MiniInfo}>
                    <View style={styles.Info}>
                        <Image style={styles.Infoicons} source={require('../../assets/coins.png')} />
                        <NormalText style={{fontSize:15,marginVertical:5}}>3200</NormalText> 
                    </View>
                    <View style={styles.Info}>
                        <Image style={styles.CrownIcon} source={require('../../assets/crown2.png')} />
                        <NormalText style={{fontSize:15}}>100</NormalText> 
                    </View>
                    <View style={styles.Info}>
                        <Image style={styles.CrownIcon} source={require('../../assets/medal.png')} />
                        <NormalText style={{fontSize:15}}>24</NormalText> 
                    </View>
                </View>
                <TouchableOpacity>
                    <NextButton>
                        <NormalText style={{fontSize:15}}>View More</NormalText>
                    </NextButton>
                </TouchableOpacity>
                <FlatList data={this.state.Region} renderItem={this.Region}/>
            </AppContainer>
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