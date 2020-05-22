import React from 'react'
import AppContainer from '../../Components/AppContainer';
import {StyleSheet,View,Image,TouchableOpacity,Modal, ToastAndroid} from 'react-native';
import NormalText from '../../Components/NormalText';
import BoldText from '../../Components/BoldText';
import { ScrollView } from 'react-native-gesture-handler';
import {AddCoins} from '../../Utils/api'
import { connect } from 'react-redux'
import RewardModal from '../../Components/Modals/RewardModal' 
import {
  AdMobRewarded
  } from 'expo-ads-admob';


class EarnCoins extends React.Component{
    constructor()
    {
        super();
        this.state={
            RewardUserVideo:false,
            ShowModal:false,
            AssignCoins:false
        }
    }

    async componentDidMount()
    {
        //ca-app-pub-3341671606021251/4823652626
        await AdMobRewarded.setAdUnitID('ca-app-pub-3341671606021251/4823652626');
        await AdMobRewarded.requestAdAsync();
        console.log(this.props.Dashboard)
       
        await AdMobRewarded.addEventListener('rewardedVideoDidRewardUser',()=>{
            console.log("Reward")
            ToastAndroid.show("Reward",ToastAndroid.SHORT)
            this.setState({RewardUserVideo:true})
        })

       await AdMobRewarded.addEventListener('rewardedVideoDidClose',()=>{
            console.log("Close")
            // Hit Api
            
            let payload={
                "Id":this.props.Dashboard.Id.toString(),
                "CoinsToAdd":100,
                "ResourceID":1,
                "Credit":"True",
                "Debit":"False"                                                                                                                                                      
            }

            console.log(payload)

            AddCoins(payload).then((result)=>{
                if(result.IsSuccess)
                {
                    this.setState({ShowModal:true})
                }
            })
        })
    }

    // componentWillUnmount(){
    //     AdMobRewarded.removeAllListeners()
    // }

    showRewarderdVideo=async()=>{
         AdMobRewarded.showAdAsync().catch((err)=>{
             console.log("Ad is Not Ready",err)
             ToastAndroid.show("Ad Not Ready",ToastAndroid.SHORT)
             
            //  AdMobRewarded.requestAdAsync().catch(err=>{
            //      console.log("Fetch Error",err)
            //  })
         });
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
                        <TouchableOpacity onPress={()=>this.showRewarderdVideo()}>
                            <View style={styles.Card}>
                                <Image style={styles.CardImage} source={require('../../assets/video.png')} />
                                <NormalText style={{fontSize:14}}>Watch Ads</NormalText>
                                <NormalText style={{fontSize:14,color:"#8B96A6"}}>+50 Coins</NormalText>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.Card}>
                            <Image style={styles.CardImage} source={require('../../assets/star.png')} />
                            <NormalText style={{fontSize:14}}>Rate Us</NormalText>
                            {/* <NormalText style={{fontSize:14,color:"#8B96A6"}}>+500 Coins</NormalText> */}
                            <NormalText style={{fontSize:14,color:"#8B96A6"}}>(Comming Soon)</NormalText>
                        </View>
                    </View>
                    <View style={styles.CardContainer}>
                       
                        
                    </View>
                    <View style={styles.CardContainer}>
                        <View style={styles.Card}>
                            <Image style={styles.CardImage} source={require('../../assets/facebookbig.png')} />
                            <NormalText style={{fontSize:14}}>Complete Profile</NormalText>
                            {/* <NormalText style={{fontSize:14,color:"#8B96A6"}}>+500 Coins</NormalText> */}
                            <NormalText style={{fontSize:14,color:"#8B96A6"}}>(Comming Soon)</NormalText>
                        </View>
                        <View style={styles.Card}>
                            <Image style={styles.CardImage} source={require('../../assets/coinbig.png')} />
                            <NormalText style={{fontSize:14}}>Buy Coins</NormalText>
                            {/* <NormalText style={{fontSize:14,color:"#8B96A6"}}>Costs Real Money</NormalText> */}
                            <NormalText style={{fontSize:14,color:"#8B96A6"}}>(Comming Soon)</NormalText>
                        </View>
                    </View>
                </ScrollView>
                <Modal visible={this.state.ShowModal} transparent={true} animationType="slide">
                    <RewardModal/>
                </Modal>
               
              
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

const mapStateToProps= state =>{
    return{
      Dashboard:state.Dashboard.Dashboard
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onSetFB:(response)=>dispatch(setFB(response)),
        onSetLogin:(response)=>dispatch(setLogin(response)),
        onSetGame:(response)=>dispatch(setGame(response)),
        onSetDashboard:(response)=>dispatch(setDashboard(response))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(EarnCoins);