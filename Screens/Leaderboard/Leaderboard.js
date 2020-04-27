import React from 'react'
import { StyleSheet,View, Image,ScrollView } from 'react-native';
import AppContainer from '../../Components/AppContainer';
import BoldText from '../../Components/BoldText';
import NormalText from '../../Components/NormalText';

class Leaderboard extends React.Component{
    constructor()
    {
        super();
    }
    render()
    {
        return(
            <AppContainer style={style.AppContainer}>
                <BoldText style={style.BoldText}>Leaderboard</BoldText>
                <View style={style.TabsContainer}>
                    <View style={style.Tab}>
                        <BoldText style={style.SelectedTab}>All</BoldText>
                    </View>
                    <View style={style.Tab}>
                        <BoldText style={style.BoldTextTab}>State</BoldText>
                    </View>
                    <View style={style.Tab}>
                        <BoldText style={style.BoldTextTab}>Genre</BoldText>
                    </View>
                </View>
                <ScrollView style={style.LeaderboardContainer}>
                    <View style={style.BoardFirst}>
                        <Image style={{height:50,width:50}} source={require('../../assets/Temp/User1.png')}></Image>
                        <View style={style.Info}>
                            <NormalText style={{fontSize:18}}>Darkkillerxxx</NormalText>
                            <NormalText style={{fontSize:18,color:"#8B96A6"}}>Level 24</NormalText>
                        </View>
                        <View style={style.PositionF}>
                            <NormalText style={{fontSize:18}}>1</NormalText>
                        </View>
                    </View>
                    <View style={style.Board}>
                        <Image style={{height:50,width:50}} source={require('../../assets/Temp/User2.png')}></Image>
                        <View style={style.Info}>
                            <NormalText style={{fontSize:18}}>Kanak</NormalText>
                            <NormalText style={{fontSize:18,color:"#8B96A6"}}>Level 42</NormalText>
                        </View>
                        <View style={style.PositionSF}>
                            <NormalText style={{fontSize:18,color:"#FDD54F"}}>2</NormalText>
                        </View>
                    </View>
                    <View style={style.Board}>
                        <Image style={{height:50,width:50}} source={require('../../assets/Temp/User3.png')}></Image>
                        <View style={style.Info}>
                            <NormalText style={{fontSize:18}}>Jurgen Klopp</NormalText>
                            <NormalText style={{fontSize:18,color:"#8B96A6"}}>Level 42</NormalText>
                        </View>
                        <View style={style.PositionSF}>
                            <NormalText style={{fontSize:18,color:"#FDD54F"}}>3</NormalText>
                        </View>
                    </View>
                    <View style={style.Board}>
                        <Image style={{height:50,width:50}} source={require('../../assets/Temp/User4.png')}></Image>
                        <View style={style.Info}>
                            <NormalText style={{fontSize:18}}>Adwait</NormalText>
                            <NormalText style={{fontSize:18,color:"#8B96A6"}}>Level 47</NormalText>
                        </View>
                        <View style={style.Position}>
                            <NormalText style={{fontSize:18}}>4</NormalText>
                        </View>
                    </View>
                    <View style={style.Board}>
                        <Image style={{height:50,width:50}} source={require('../../assets/Temp/User5.png')}></Image>
                        <View style={style.Info}>
                            <NormalText style={{fontSize:18}}>Per Gaurdiola</NormalText>
                            <NormalText style={{fontSize:18,color:"#8B96A6"}}>Level 42</NormalText>
                        </View>
                        <View style={style.Position}>
                            <NormalText style={{fontSize:18}}>5</NormalText>
                        </View>
                    </View>
                    <View style={style.Board}>
                        <Image style={{height:50,width:50}} source={require('../../assets/Temp/User6.png')}></Image>
                        <View style={style.Info}>
                            <NormalText style={{fontSize:18}}>John Doe</NormalText>
                            <NormalText style={{fontSize:18,color:"#8B96A6"}}>Level 42</NormalText>
                        </View>
                        <View style={style.Position}>
                            <NormalText style={{fontSize:18}}>6</NormalText>
                        </View>
                    </View>
                    <View style={style.Board}>
                        <Image style={{height:50,width:50}} source={require('../../assets/Temp/User6.png')}></Image>
                        <View style={style.Info}>
                            <NormalText style={{fontSize:18}}>John Doe</NormalText>
                            <NormalText style={{fontSize:18,color:"#8B96A6"}}>Level 42</NormalText>
                        </View>
                        <View style={style.Position}>
                            <NormalText style={{fontSize:18}}>7</NormalText>
                        </View>
                    </View>
                    <View style={style.Board}>
                        <Image style={{height:50,width:50}} source={require('../../assets/Temp/User6.png')}></Image>
                        <View style={style.Info}>
                            <NormalText style={{fontSize:18}}>John Doe</NormalText>
                            <NormalText style={{fontSize:18,color:"#8B96A6"}}>Level 42</NormalText>
                        </View>
                        <View style={style.Position}>
                            <NormalText style={{fontSize:18}}>8</NormalText>
                        </View>
                    </View>
                    <View style={style.Board}>
                        <Image style={{height:50,width:50}} source={require('../../assets/Temp/User6.png')}></Image>
                        <View style={style.Info}>
                            <NormalText style={{fontSize:18}}>John Doe</NormalText>
                            <NormalText style={{fontSize:18,color:"#8B96A6"}}>Level 42</NormalText>
                        </View>
                        <View style={style.Position}>
                            <NormalText style={{fontSize:18}}>9</NormalText>
                        </View>
                    </View>
                    <View style={style.UserBoard}>
                        <Image style={{height:50,width:50}} source={require('../../assets/Temp/User6.png')}></Image>
                        <View style={style.Info}>
                            <NormalText style={{fontSize:18}}>Kiki</NormalText>
                            <NormalText style={{fontSize:18,color:"#8B96A6"}}>Level 2</NormalText>
                        </View>
                        <View style={style.Position}>
                            <NormalText style={{fontSize:18}}>346</NormalText>
                        </View>
                    </View>
                </ScrollView>
                
            </AppContainer>
        )
    }
}

const style=StyleSheet.create({
    AppContainer:{
        alignItems:'flex-start',
        justifyContent:'flex-start',
        paddingTop:20
    },
    BoldText:{
        fontSize:24,
        marginHorizontal:10
    },
    BoldTextTab:{
        fontSize:20
    },
    TabsContainer:{
        flexDirection:'row',
        width:'100%',
        marginVertical:15
    },
    Tab:{
        width:'33.33%',
        justifyContent:'center',
        alignItems:'center'
    },
    SelectedTab:{
        fontSize:20,
        color:"#1890ff"
    },
    LeaderboardContainer:{

    },
    Board:{
        flexDirection:'row',
        padding:10,
        alignItems:'flex-start',
        justifyContent:'center'
    },
    BoardFirst:{
        flexDirection:'row',
        padding:10,
        alignItems:'flex-start',
        justifyContent:'center',
        backgroundColor:"#172C46"
    },
    PositionF:{
        width:50,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        backgroundColor:"#FDD54F"
    },
    Position:{
        width:50,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        borderColor:"white",
        borderWidth:1
    },
    UserBoard:{
        flexDirection:'row',
        padding:10,
        alignItems:'flex-start',
        justifyContent:'center',
        backgroundColor:"#172C46",
        elevation:10
    },
    PositionSF:{
        width:50,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        borderColor:"#FDD54F",
        borderWidth:1
    },
    Info:{
        alignItems:'flex-start',
        justifyContent:'center',
        paddingHorizontal:10,
        width:'70%'
    }
})

export default Leaderboard