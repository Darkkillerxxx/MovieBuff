import React from 'react'
import AppContainer from '../../Components/AppContainer';
import {StyleSheet,View,Image} from 'react-native';
import NormalText from '../../Components/NormalText';
import BoldText from '../../Components/BoldText';
import { ScrollView } from 'react-native-gesture-handler';

class EarnCoins extends React.Component{
    constructor()
    {
        super();
    }

    render()
    {
        return(
            <AppContainer style={styles.AppContainer}>
                <View style={styles.Heading}>
                    <BoldText style={{fontSize:18}}>Earn Coins</BoldText>
                </View>
                <ScrollView>
                    <View style={styles.CardContainer}>
                        <View style={styles.Card}>
                            <Image style={styles.CardImage} source={require('../../assets/video.png')} />
                            <NormalText style={{fontSize:14}}>Watch Ads</NormalText>
                            <NormalText style={{fontSize:14,color:"#8B96A6"}}>+50 Coins</NormalText>
                        </View>
                        <View style={styles.Card}>
                            <Image style={styles.CardImage} source={require('../../assets/microphone.png')} />
                            <NormalText style={{fontSize:14}}>Invite Friends</NormalText>
                            <NormalText style={{fontSize:14,color:"#8B96A6"}}>+10000 Coins</NormalText>
                        </View>
                    </View>
                    <View style={styles.CardContainer}>
                        <View style={styles.Card}>
                            <Image style={styles.CardImage} source={require('../../assets/facebookbig.png')} />
                            <NormalText style={{fontSize:14}}>Connect Facebook</NormalText>
                            <NormalText style={{fontSize:14,color:"#8B96A6"}}>+500 Coins</NormalText>
                        </View>
                        <View style={styles.Card}>
                            <Image style={styles.CardImage} source={require('../../assets/star.png')} />
                            <NormalText style={{fontSize:14}}>Rate Us</NormalText>
                            <NormalText style={{fontSize:14,color:"#8B96A6"}}>+500 Coins</NormalText>
                        </View>
                    </View>
                    <View style={styles.CardContainer}>
                        <View style={styles.Card}>
                            <Image style={styles.CardImage} source={require('../../assets/facebookbig.png')} />
                            <NormalText style={{fontSize:14}}>Complete Profile</NormalText>
                            <NormalText style={{fontSize:14,color:"#8B96A6"}}>+500 Coins</NormalText>
                        </View>
                        <View style={styles.Card}>
                            <Image style={styles.CardImage} source={require('../../assets/coinbig.png')} />
                            <NormalText style={{fontSize:14}}>Buy Coins</NormalText>
                            <NormalText style={{fontSize:14,color:"#8B96A6"}}>Costs Real Money</NormalText>
                        </View>
                    </View>
                </ScrollView>
               
              
            </AppContainer>
        )
    }
}

const styles=StyleSheet.create({
    AppContainer:{
        alignItems:'flex-start',
        justifyContent:'flex-start',
        padding:20
    },
    Heading:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    CardContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginVertical:10,
        width:'100%'
    },
    Card:{
        backgroundColor:"#4E515A",
        padding:15,
        borderRadius:20,
        alignItems:'center',
        width:150
    },
    CardImage:{
        height:75,
        width:75,
        marginBottom:10
    },

})

export default EarnCoins;