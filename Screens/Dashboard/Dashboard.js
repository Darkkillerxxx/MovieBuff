import React from 'react'
import { View, StyleSheet,Image,TouchableOpacity,BackHandler,ScrollView,ToastAndroid,Alert } from 'react-native'
import Modal from 'react-native-modal';
import AppContainer from '../../Components/AppContainer';
import NormalText from '../../Components/NormalText';
import SinglePlayer from '../../Components/SinglePlayerBtn'
import SmallBtn from '../../Components/SmallButton';
import BriefInfo from '../../Components/BriefInfo'
import CustomModal from '../../Components/Modals/Modal'
import MPModal from '../../Components/Modals/MPModal'
import { connect }from 'react-redux'
import {setGame,setQuestions} from '../../Store/Actions/ActionSp'
import {setLogin} from '../../Store/Actions/ActionJoin'
import {setDashboard} from '../../Store/Actions/ActionDashboard'
import {UpdateUser,DeleteUser} from '../../Database/Helper'
import {AddCoins,GetLeaderBoard,login} from '../../Utils/api.js'
import {FetchAds,ShowVideoAd} from '../../Utils/RewardedAds'
import * as Animatable from 'react-native-animatable';
import {
    AdMobRewarded
  } from 'expo-ads-admob';

class Dashboard extends React.Component{
    
    constructor()
    {
        super();
        this.state={
            ShowModalSP:false,
            ShowModalMP:false,
            ShowVideoAdIcon:false,
            SPNoQuestions:5,
            SPRegion:[],
            DashboardCoins:0,
            Bronze:0,
            Coins:0,
            Crowns:0,
            Gold:0,
            ImgUrl:"",
            Silver:"",
            ShowSignUpModal:false,
            ShowInsuffModal:false,
            ShowRewardModal:false,
            ShowSettings:false,
            RewardUserVideo:false
        }
        
    }

    setSPNoQuestions=(ques)=>{
        this.setState({SPNoQuestions:ques})
    }

    onBackPress=()=>{
        console.log("Back Pressed")
    }
    
    setSpRegion=(id)=>{
        if(this.state.SPRegion.includes(id))
        {
            let tempRegion=this.state.SPRegion;
            const index = tempRegion.indexOf(id);
            if (index > -1) {
                tempRegion.splice(index, 1);
            }
            this.setState({SPRegion:tempRegion})
        }
        else
        {
            let tempRegion=this.state.SPRegion;
            tempRegion.push(id)
            this.setState({SPRegion:tempRegion})
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

    DismissSpModal=()=>{
        this.setState({ShowModalSP:false})
    }

    onProceedToCustom=()=>{
        let TempSp=this.props.SP;
        TempSp.Questions=this.state.SPNoQuestions;
        TempSp.Region=this.state.SPRegion;
        this.props.onSetGame(TempSp)
        if(this.props.Dashboard.Coins < this.state.SPNoQuestions * 2)
        {
            this.setState({ShowInsuffModal:true})
        }
        else
        {
            this.props.navigation.navigate('CustomGame')
        }
        this.setState({ShowModalSP:false})
    }

    DismissSignUpModal=()=>{
        this.setState({ShowSignUpModal:false})
    }
    
    DismissInsuffModal=()=>{
        this.setState({ShowInsuffModal:false})
    }

    DismissSettingsModal=()=>{
        this.setState({ShowSettings:false})
    }

    onLBPressed=()=>{
        GetLeaderBoard(this.props.Dashboard.Id.toString()).then(result=>{
            if(result.IsSuccess)
            {
                ToastAndroid.show("LeaderBoard Fetch Successfully",ToastAndroid.SHORT)
                this.props.navigation.navigate("Leaderboard",{
                    Leaderboard:result.Data,
                    UserId:this.props.Dashboard.Id
                })
            }
            else
            {
                ToastAndroid.show("You Need to Play Atleast One Game To Access The Leaderboard",ToastAndroid.SHORT)
            }
        })
    }

    rewardUser=()=>{
        let payload={
            "Id":this.props.Dashboard.Id.toString(),
            "CoinsToAdd":100,
            "ResourceID":1,
            "Credit":"True",
            "Debit":"False"                                                                                                                                                      
        }

        console.log("Sending Payload form Adreward Video",payload)

        AddCoins(payload).then((result)=>{
            if(result.IsSuccess)
            {
                this.setState({ShowRewardModal:true},()=>{
                    // this.setState({RewardUserVideo:false})
                })
            }
        })
    }

    DismissRewardModal=()=>{
        let SignInPayload={
            UserId:this.props.Dashboard.FbId.length > 0 ? "":this.props.Dashboard.Id,
            ScreenName:"",
            FacebookId:this.props.Dashboard.FbId,
            Password:this.props.Dashboard.Password
         }  

         login(SignInPayload).then(result=>{
            console.log(result) 
            if(result.IsSuccess)
             {
                 this.setState({ShowRewardModal:false})
                 let TempDashboard=result.Data[0]
                 TempDashboard.FbId=this.props.Dashboard.FbId
                 TempDashboard.Password=this.props.Dashboard.Password
                 TempDashboard.ScreenName=this.props.Dashboard.ScreenName
                 UpdateUser(JSON.stringify(TempDashboard)).then(result=>{
                    console.log("Update",result)
                 }).catch(err=>{
                     ToastAndroid.show("Failed To Update Database",ToastAndroid.SHORT)
                 })
                this.props.onSetDashbaord(TempDashboard)
             }
         })
    }

    componentDidMount()
    {

     AdMobRewarded.addEventListener('rewardedVideoDidRewardUser',()=>{
            console.log("Reward")
            ToastAndroid.show("Reward",ToastAndroid.SHORT)
            this.setState({RewardUserVideo:true})
        })
        
     AdMobRewarded.addEventListener('rewardedVideoDidClose',()=>{
            console.log("Closed")
            if(this.state.RewardUserVideo)
            {
                this.rewardUser()
            }
        })
        
        this.FetchVideoAd()
        this.setState({Bronze:this.props.Dashboard.Bronze})
        this.setState({Coins:this.props.Dashboard.Coins})
        this.setState({Gold:this.props.Dashboard.Gold})
        this.setState({Silver:this.props.Dashboard.Silver})
        this.setState({Crowns:this.props.Dashboard.Crowns})
        this.setState({ImgUrl:this.props.Dashboard.ImgUrl})

        if(this.props.Dashboard.hasOwnProperty('isNew'))
        {
            if(this.props.Dashboard.isNew)
            {
              console.log("Coins Added Successfully")
              let DashboardRedux=this.props.Dashboard;
              DashboardRedux.isNew=false
              DashboardRedux.Coins=500
              this.props.onSetDashbaord(DashboardRedux)
              UpdateUser(JSON.stringify(DashboardRedux)).then(result=>{
                  console.log("Update",result)
                  this.setState({ShowSignUpModal:true})
              }).catch(err=>{
                   ToastAndroid.show("Failed To Update Database",ToastAndroid.SHORT)
               })
            }
        }
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

     componentDidUpdate(prevProps,prevState,Ss)
     {
         console.log("Props Update Below")
         console.log(prevProps.Dashboard.Coins,this.props.Dashboard.Coins)
         if(prevProps.Dashboard.Coins !== this.props.Dashboard.Coins || prevProps.Dashboard.GOLD !== this.props.Dashboard.GOLD 
            || prevProps.Dashboard.Silver !== this.props.Dashboard.Silver || prevProps.Dashboard.Bronze !== this.props.Dashboard.Bronze ||
            prevProps.Dashboard.Crowns !== this.props.Dashboard.Crowns )
         {

            this.FetchVideoAd()
            //  console.log("Update State",this.props.Dashboard.Coins)
            //  console.log("Update State Object",this.props.Dashboard)
            
            this.setState({Coins:this.props.Dashboard.Coins},()=>{
                console.log("Daashbard Coins",this.state.DashboardCoins)
            })
            this.setState({Gold:this.props.Dashboard.Gold})
            this.setState({Silver:this.props.Dashboard.Silver})
            this.setState({Bronze:this.props.Dashboard.Bronze})
            this.setState({Crowns:this.props.Dashboard.Crowns})
         }
     }

     Logout=()=>{
        DeleteUser().then(result=>{
            let DefaultLogin={
                "Country":"india",
                "FbId": "",
                "ScreenName":"",
                "FirstName":"",
                "LastName":"",
                "MaritalStatus":"true",
                "Profession":"",
                "EmailId":"",
                "AvatarId":1,
                "AvatarBase64":"",
                "AvatarFacebook":"",
                "SelectedGenre":"",
                "SelectedRegion":"",
                "AvatarURL":""
            }
            console.log("Delete User",result)
            this.props.onSetDashbaord({})
            this.props.onSetLogin(DefaultLogin)
            console.log('Welcome')
            this.props.navigation.replace('Welcome')

        }).catch(err=>{
            console.log("Error Deleting User",err)
        })
     }

     onLogOutPressed=()=>{
        Alert.alert(
            'Log Out From Filmy Buzz',
            'Are You Sure You Want To Logout ???',
           [ {
                text: 'Yes',
                onPress: () => this.Logout()
            },
            {
                text: 'No',
                onPress: () => console.log('Ask me later pressed')
            }],
            { cancelable: false });
     }

    render()
    {
        return(
            <AppContainer style={styles.AppContainer}>
                
                <ScrollView>
                
                    <View style={styles.InfoContainer}>
                        
                        <View style={styles.PicContainer}>
                            
                            <TouchableOpacity>
                                
                                <View style={styles.ProfilePic}>
                                    <Image style={{width:'100%',height:'100%'}} source={this.state.ImgUrl !== "" ? {uri:this.state.ImgUrl}:require('../../assets/Temp/User1.png')}></Image>
                                </View>
                                
                                <NormalText style={{textAlign:'center'}}>{this.props.Dashboard.ScreenName}</NormalText>
                            
                            
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.BriefContainer}>
                            
                            <View style={{width:'100%',flexDirection:'row',marginVertical:5}}>
                                
                                <BriefInfo 
                                    style={{width:'33.33%'}} 
                                    ImageStyle={{height:25,width:35}} 
                                    Image={require('../../assets/Gold.png')} 
                                    value={this.state.Gold === 0 || this.state.Gold === null  ? 0 :this.state.Gold}/>

                                <BriefInfo 
                                    style={{width:'33.33%'}} 
                                    ImageStyle={{height:25,width:35}} 
                                    Image={require('../../assets/Silver.png')} 
                                    value={this.state.Silver === 0 || this.state.Silver === null ? 0 :this.state.Silver}/>
                                
                                <BriefInfo 
                                    style={{width:'33.33%'}} 
                                    ImageStyle={{height:25,width:35}} 
                                    Image={require('../../assets/Bronze.png')} value={this.state.Bronze === 0 || this.state.Bronze === null ? 0 :this.state.Bronze}/> 
                            
                            </View>
                            
                            <View style={{width:'100%',flexDirection:'row',marginTop:10}}>
                            
                                <BriefInfo 
                                    style={{width:'33.33%'}} 
                                    ImageStyle={{height:25,width:45,marginLeft:-5,marginBottom:5}} 
                                    Image={require('../../assets/TreasureBox.png')} 
                                    value={this.state.Coins !== 0 ? this.state.Coins:0}/>

                                <BriefInfo 
                                    style={{width:'33.33%'}} 
                                    ImageStyle={{height:25,width:25,marginBottom:5,resizeMode:'contain'}} 
                                    Image={require('../../assets/Crown.png')} 
                                    value={this.state.Crowns !== 0 ? this.state.Crowns:0}/>
                            </View>

                        </View>

                    </View>

                    <View style={styles.ImageView}>
                        
                        <View style={styles.WatchVideoContainer}>
                            
                            <Animatable.View animation="bounce" iterationCount="infinite">
                                
                                <TouchableOpacity onPress={()=>this.RunVideoAd()}>
                                    <Image source={require('../../assets/videoDB.png')} style={{width:40,height:40,resizeMode:'stretch'}}/>
                                    <NormalText style={{textAlign:'center'}}>Watch</NormalText>
                                    <NormalText style={{textAlign:'center'}}>Ad</NormalText>
                                </TouchableOpacity>    
                             
                            </Animatable.View>

                        </View>
                        
                    <View style={styles.BackImageContainer}>
                        <Image style={styles.BackImage} source={require('../../assets/moviebuffback.png')}/>
                    </View>

                </View>

                <View style={styles.Container}>
                    
                    <View style={styles.SPContainer}>
                        
                        <TouchableOpacity style={{width:'100%',alignItems:'center'}} onPress={()=>this.setState({ShowModalSP:true})}>
                            
                            <SinglePlayer style={{width:125,height:75}} icon={"user"} iconSize={20}>
                                <NormalText style={styles.NormalTextSP}>Single Player</NormalText>
                            </SinglePlayer>
                        
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.SPContainer}>
                        
                        <TouchableOpacity style={{width:'100%',alignItems:'center'}} onPress={()=>ToastAndroid.show("Comming Soon",ToastAndroid.LONG)}>
                            
                            <SinglePlayer style={{width:125,height:75}} icon={"users"} iconSize={20}>
                                <NormalText style={styles.NormalTextSP}>Play With Friends</NormalText>
                            </SinglePlayer>

                            <NormalText style={{marginTop:20,textAlign:'center',color:'yellow'}}>Comming Soon !!!</NormalText>

                        </TouchableOpacity>
                    
                    </View>
                
                </View>

                <View style={styles.ToolsContainer}>
                   
                   <View style={styles.Tools}>
                        
                        <TouchableOpacity onPress={()=>this.onLBPressed()}>
                            
                            <SmallBtn>
                                <Image style={styles.Podium} source={require('../../assets/Leaderboard.png')}/>
                            </SmallBtn>
                            <NormalText style={{textAlign:'center'}}>Leaderboard</NormalText>
                        
                        </TouchableOpacity>

                   </View>

                   <View style={styles.Tools}>
                        
                        <TouchableOpacity onPress={()=>this.setState({ShowSettings:true})}>
                            
                            <SmallBtn>
                                <Image style={{...styles.Podium,...{height:35,width:35}}} source={require('../../assets/Setting.png')}/>
                            </SmallBtn>
                            <NormalText style={{textAlign:'center'}}>Settings</NormalText>
                        
                        </TouchableOpacity>
                   
                   </View>

                   <View style={styles.Tools}>
                    
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('EarnCoins')}>
                            
                            <SmallBtn>
                                <Image style={styles.Podium} source={require('../../assets/Treasure.png')}/>
                            </SmallBtn>
                            <NormalText style={{textAlign:'center'}}>Earn Coins</NormalText>

                        </TouchableOpacity>
                   
                   </View>
                
                </View>
                {/* Modals From Here */}

                    <Modal backdropColor={'black'} isVisible={this.state.ShowModalSP} animationType="slide" style={{width:'100%',margin:'auto'}}>
                        
                        <CustomModal 
                            Heading="SP" 
                            Type="SP" 
                            DismissModal={this.DismissSpModal} 
                            SetQuestions={this.setSPNoQuestions} 
                            setRegion={this.setSpRegion} 
                            Questions={this.state.SPNoQuestions} 
                            Region={this.state.SPRegion} 
                            SetRegion={this.setSpRegion} 
                            ProceedToCustom={this.onProceedToCustom}/>
                    
                    </Modal>
    {/*                    
                    <Modal visible={this.state.ShowModalMP} transparent={true} animationType="slide">
                        <MPModal/>
                    </Modal>   */}

                    <Modal backdropColor={'black'} isVisible={this.state.ShowSignUpModal} transparent={true} animationType="slide" style={{width:'100%',margin:'auto'}}>
                        
                        <CustomModal 
                            Heading="Reward" 
                            Type="Reward" 
                            FMsg={"Thank You For Registering With Us"} 
                            SMsg={"Here Are Some Coins"}
                            Coins="500"
                            ButtonText={"Claim Coins"} 
                            DismissModal={this.DismissSignUpModal} />

                    </Modal>

                    <Modal backdropColor={'black'} isVisible={this.state.ShowInsuffModal} transparent={true} animationType="slide" style={{width:'100%',margin:'auto'}}>
                        
                        <CustomModal 
                            Heading="Insuff" 
                            Type="Insuff" 
                            FMsg={"You Have Insufficient Coins To Play"} 
                            SMsg={"Toal Coins You Need You Need To Play Are"}                        
                            Coins={this.state.SPNoQuestions * 2} 
                            DismissModal={this.DismissRewardModal} />
                    
                    </Modal>
                    
                    <Modal backdropColor={'black'} isVisible={this.state.ShowSettings} transparent={true} animationType="slide" style={{width:'100%',margin:'auto'}}>
                        <CustomModal 
                        Heading="Opt" 
                        Type="Opt" 
                        Logout={this.onLogOutPressed} 
                        DismissModal={this.DismissSettingsModal}/>
                    </Modal>

                    <Modal backdropColor={'black'} isVisible={this.state.ShowRewardModal} transparent={true} animationType="slide" style={{width:'100%',margin:'auto'}}>
                        <CustomModal 
                            Heading="Reward" 
                            Type="Reward" 
                            FMsg={"Thank You For Watching Ad"} 
                            SMsg={"Here Is Your Reward"}
                            Coins="100" 
                            DismissModal={this.DismissRewardModal} />
                    </Modal>

                </ScrollView>
                {/* Modals Ends Here      */}
            </AppContainer>
        )
    }
}

const styles=StyleSheet.create({
    AppContainer:{
        flex:1,
        alignItems:'flex-start',
        justifyContent:'flex-start',
        paddingTop:20
    },
    InfoContainer:{
        flexDirection:'row',
        width:'100%'
    },
    PicContainer:{
        width:"20%",
        backgroundColor:"#11233A",
        opacity:0.8,
        alignItems:'center',
        justifyContent:'center',
        borderBottomLeftRadius:15,
        borderTopLeftRadius:15,
        borderLeftColor:'#E5BE1C',
        borderBottomColor:'#E5BE1C',
        borderTopColor:'#E5BE1C',
        borderLeftWidth:2,
        borderBottomWidth:2,
        borderTopWidth:2
    },
    BriefContainer:{
        width:"80%",
        height:'100%',
        backgroundColor:"#11233A",
        opacity:0.8,
        padding:10,
        marginBottom:15,
        paddingRight:15,
        borderBottomRightRadius:15,
        borderTopRightRadius:15,
        borderBottomColor:'#E5BE1C',
        borderTopColor:'#E5BE1C',
        borderRightColor:'#E5BE1C',
        borderRightWidth:2,
        borderBottomWidth:2,
        borderTopWidth:2
    },
    ProfilePic:{
        height:50,
        width:50,
        resizeMode:'contain',
        overflow:'hidden',
        borderRadius:30
    },
    BackImageContainer:{
        height:250,
        width:250,
        maxWidth:'90%',
        maxHeight:'90%',
        overflow:'hidden'
     },
     BackImage:{
        flex:1,
        width:null,
        height:null,
        resizeMode:'contain'
    },
    ImageView:{
        width:'100%',
        alignItems:'center'
    },
    Container:{
        width:'100%',
        flexDirection:'row',
        marginVertical:15
        
    },
    SPContainer:{
        width:'50%',
        flexDirection:'row',
        justifyContent:'center'
    },
    NormalTextSP:{
        fontSize:18,
        color:'white'
    },
    ToolsContainer:{
        marginTop:5,
        flexDirection:'row',
        width:'100%'
    },
    Tools:{
        width:'33.33%',
        flexDirection:'row',
        justifyContent:'center'
    },
    Podium:{
        width:65,
        height:65,
        resizeMode:'contain'
    },
    WatchVideoContainer:{
        width:'100%',
        position:'absolute',
        marginTop:10,
        paddingHorizontal:10,
        alignItems:'flex-start'
    }
})


const mapStateToProps= state =>{
    return{
      Dashboard:state.Dashboard.Dashboard,
      SP:state.SP.GamePayload
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onSetLogin:(response)=>dispatch(setLogin(response)),
        onSetGame:(response)=>dispatch(setGame(response)),
        onSetQuestions:(response)=>dispatch(setQuestions(response)),
        onSetDashbaord:(response)=>dispatch(setDashboard(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);

// console.log("Dasbhoard Redux",this.props.Dashboard)