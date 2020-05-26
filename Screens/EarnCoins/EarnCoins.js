import React from 'react'
import AppContainer from '../../Components/AppContainer';
import {StyleSheet,View,Image,TouchableOpacity,Modal, ToastAndroid} from 'react-native';
import NormalText from '../../Components/NormalText';
import BoldText from '../../Components/BoldText';
import { ScrollView } from 'react-native-gesture-handler';
import {setDashboard} from '../../Store/Actions/ActionDashboard'
import {AddCoins,login} from '../../Utils/api'
import { connect } from 'react-redux'
import CustomModal from '../../Components/Modals/Modal'
import {UpdateUser} from '../../Database/Helper'
import {FetchAds,ShowVideoAd} from '../../Utils/RewardedAds'
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
            AssignCoins:false,
            ShowAds:false
        }
    }

    RunVideoAd=()=>{
        ShowVideoAd().then(result=>{
            if(!result)
            {
             ToastAndroid.show("Ad Not Ready Please Try Again After Some TIme",ToastAndroid.SHORT)
             this.FetchVideoAd()
            }
        }).catch(err=>{
             ToastAndroid.show("Something Went Wrong While Fetching Ads",ToastAndroid.SHORT)
        })
     }

     FetchVideoAd=()=>{
        FetchAds().then((result)=>{
            if(result)
            {
                console.log("Lock and Loaded")
            }
            else
            {
                ToastAndroid.show("Cannot Load Ads",ToastAndroid.SHORT)
            }
        })
    }

    componentDidMount()
    {
        //ca-app-pub-3341671606021251/4823652626
        // await AdMobRewarded.setAdUnitID('ca-app-pub-3341671606021251/4823652626');
        // await AdMobRewarded.requestAdAsync();
        // console.log(this.props.Dashboard)
       
        // await AdMobRewarded.addEventListener('rewardedVideoDidRewardUser',()=>{
        //     console.log("Reward")
        //     ToastAndroid.show("Reward",ToastAndroid.SHORT)
        //     this.setState({RewardUserVideo:true})
        // })

        // await AdMobRewarded.addEventListener('rewardedVideoDidClose',()=>{
        //     console.log("Check",this.state.RewardUserVideo)
        //     if(this.state.RewardUserVideo)
        //     {
        //         this.rewardUser()
        //     }
        // })
    }

    // rewardUser=()=>{
    //     if(this.state.RewardUserVideo)
    //     {
    //         let payload={
    //             "Id":this.props.Dashboard.Id.toString(),
    //             "CoinsToAdd":100,
    //             "ResourceID":1,
    //             "Credit":"True",
    //             "Debit":"False"                                                                                                                                                      
    //         }

    //         console.log("Sending Payload form Adreward Video",payload)

    //         AddCoins(payload).then((result)=>{
    //             if(result.IsSuccess)
    //             {
    //                 this.setState({ShowModal:true},()=>{
    //                     this.setState({RewardUserVideo:false})
    //                 })
    //             }
    //         })
    //     }
    // }


    showRewarderdVideo=async()=>{
        this.RunVideoAd()
    }

    // DismissRewardModal=()=>{
    //     let SignInPayload={
    //         UserId:this.props.Dashboard.FbId.length > 0 ? "":this.props.Dashboard.Id,
    //         ScreenName:"",
    //         FacebookId:this.props.Dashboard.FbId,
    //         Password:this.props.Dashboard.Password
    //      }
    //      login(SignInPayload).then(result=>{
    //         console.log(result) 
    //         if(result.IsSuccess)
    //          {
    //              this.setState({ShowModal:false})
    //              let TempDashboard=result.Data[0]
    //              TempDashboard.FbId=this.props.Dashboard.FbId
    //              TempDashboard.Password=this.props.Dashboard.Password
    //              TempDashboard.ScreenName=this.props.Dashboard.ScreenName
    //              UpdateUser(JSON.stringify(TempDashboard)).then(result=>{
    //                 console.log("Update",result)
    //              }).catch(err=>{
    //                  ToastAndroid.show("Failed To Update Database",ToastAndroid.SHORT)
    //              })
    //             this.props.onSetDashboard(TempDashboard)
    //             this.props.navigation.navigate('Dashboard')
    //          }
    //      })
    // }

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
                                <NormalText style={{fontSize:14,color:"#8B96A6"}}>+100 Coins</NormalText>
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
                <CustomModal 
                    Heading="Reward" 
                    Type="Reward" 
                    FMsg={"Thank You For Watching Ad"} 
                    SMsg={"Here Is Your Reward"}
                    Coins="100" 
                    DismissModal={this.DismissRewardModal} />
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