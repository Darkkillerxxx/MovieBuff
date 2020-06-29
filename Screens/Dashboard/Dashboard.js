import React from 'react'
import { View, StyleSheet,Image,TouchableOpacity,BackHandler,ToastAndroid,Alert,Dimensions } from 'react-native'
import {NavigationActions} from 'react-navigation'
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
import Loader from '../../Components/Modals/Loader'
import * as StoreReview from 'expo-store-review';
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
            RewardUserVideo:false,
            isLoading:false,
            LoadingText:null,
            ScreenHeight:Dimensions.get('window').height,
            LobbyId:""
        }

      
    }

    setSPNoQuestions=(ques)=>{
        this.setState({SPNoQuestions:ques})
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

    Rate=()=>{
        StoreReview.isAvailableAsync().then(()=>{
            StoreReview.requestReview()
        }).catch(err=>{
            console.log(err)
        })
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

    DismissSPMPModal=()=>{
        this.setState({ShowModalSP:false})
        this.setState({ShowModalMP:false})
    }

    changeLobbyId=()=>{
        this.setState({LobbyId:"abc"})
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

    onProceedToMPGame=()=>{
        this.setState({ShowModalMP:false})
        this.props.navigation.navigate('GameScreenMP')
    }

    onLBPressed=()=>{
        this.setState({isLoading:true},()=>{
            GetLeaderBoard(this.props.Dashboard.Id.toString()).then(result=>{
                if(result.IsSuccess)
                {
                    this.setState({LoadingText:"Fetching Leaderboard..."},()=>{
                        setTimeout(()=>{
                            this.setState({isLoading:false})
                            this.props.navigation.navigate("Leaderboard",{
                                Leaderboard:result.Data,
                                UserId:this.props.Dashboard.Id
                            })
                        },1000)
                    })
                }
                else
                {
                    this.setState({isLoading:false},()=>{
                        ToastAndroid.show("You Need to Play Atleast One Game To Access The Leaderboard",ToastAndroid.SHORT)
                    })
                 
                }
            })
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

        AddCoins(payload).then((result)=>{
            if(result.IsSuccess)
            {
                this.setState({isLoading:false},()=>{
                    this.setState({ShowRewardModal:true})
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
            if(result.IsSuccess)
             {
                 this.setState({ShowRewardModal:false})
                 let TempDashboard=result.Data[0]
                 TempDashboard.FbId=this.props.Dashboard.FbId
                 TempDashboard.Password=this.props.Dashboard.Password
                 TempDashboard.ScreenName=this.props.Dashboard.ScreenName
                 UpdateUser(JSON.stringify(TempDashboard)).then(result=>{
                   
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
                ToastAndroid.show("Reward",ToastAndroid.SHORT)
                this.setState({RewardUserVideo:true})
            })
        
        AdMobRewarded.addEventListener('rewardedVideoDidClose',()=>{
                this.setState({LoadingText:"Fetching Your Reward"})
                this.setState({isLoading:true},()=>{
                    if(this.state.RewardUserVideo)
                    {
                    this.rewardUser()
                    this.setState({RewardUserVideo:false})
                    }
                    else
                    {
                        this.setState({isLoading:false})
                    }
                })
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
              let DashboardRedux=this.props.Dashboard;
              DashboardRedux.isNew=false
              DashboardRedux.Coins=500
              this.props.onSetDashbaord(DashboardRedux)
              UpdateUser(JSON.stringify(DashboardRedux)).then(result=>{
                  this.setState({ShowSignUpModal:true})
              }).catch(err=>{
                   ToastAndroid.show("Failed To Update Database",ToastAndroid.SHORT)
               })
            }
        }
    }

    componentWillUnmount() {
        console.log("Unmount")
        BackHandler.removeEventListener('hardwareBackPress', ()=>{
            return true
        })
      }

    FetchVideoAd=()=>{
        FetchAds().then((result)=>{
            if(!result)
            {
            }
        })
    }

     componentDidUpdate(prevProps,prevState,Ss)
     {
         if(prevProps.Dashboard.Coins !== this.props.Dashboard.Coins || prevProps.Dashboard.GOLD !== this.props.Dashboard.GOLD 
            || prevProps.Dashboard.Silver !== this.props.Dashboard.Silver || prevProps.Dashboard.Bronze !== this.props.Dashboard.Bronze ||
            prevProps.Dashboard.Crowns !== this.props.Dashboard.Crowns )
         {
            this.FetchVideoAd()
            this.setState({Coins:this.props.Dashboard.Coins})
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
            this.props.onSetDashbaord({})
            this.props.onSetLogin(DefaultLogin)
            this.props.navigation.navigate('Start',{},NavigationActions.navigate({routeName:'Welcome'}))

        }).catch(err=>{
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
                
                    <View style={styles.InfoContainer}>
                        
                        <View style={styles.PicContainer}>
                            
                            <TouchableOpacity>
                                
                                <View style={styles.ProfilePic}>
                                    <Image 
                                        style={{width:'100%',height:'100%'}} 
                                        source={this.state.ImgUrl !== "" ? 
                                        {uri:this.state.ImgUrl}:
                                        require('../../assets/Temp/User1.png')}>
                                    </Image>
                                </View>
                                
                                <NormalText 
                                    style={{textAlign:'center'}}>
                                        {this.props.Dashboard.ScreenName}
                                </NormalText>

                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.BriefContainer}>
                            
                            <View 
                                style={{width:'100%',flexDirection:'row',marginVertical:5}}>
                                
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
                            
                            <View 
                                style={{width:'100%',flexDirection:'row',marginTop:10}}>
                            
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
                            
                            {this.state.ScreenHeight < 650 ? 
                                   
                                    <Animatable.View 
                                        animation="bounce" 
                                        iterationCount="infinite">
                                        
                                        <TouchableOpacity onPress={()=>this.RunVideoAd()}>
                                            <Image 
                                                source={require('../../assets/videoDB.png')} 
                                                style={{width:40,height:40,resizeMode:'stretch'}}/>
                                            <NormalText style={{textAlign:'center'}}>Watch</NormalText>
                                            <NormalText style={{textAlign:'center'}}>Ad</NormalText>
                                        </TouchableOpacity>    
                                    </Animatable.View>
                                    :
                                    null
                            }

                            {this.state.ScreenHeight < 650 ?     
                                   <Animatable.View 
                                        animation="tada" 
                                        duration={2500} 
                                        iterationCount="infinite">
                                       <TouchableOpacity onPress={()=>this.Rate()}>
                                           <Image 
                                                source={require('../../assets/star.png')} 
                                                style={{width:40,height:40,resizeMode:'stretch'}}/>
                                           <NormalText style={{textAlign:'center'}}>Rate</NormalText>
                                           <NormalText style={{textAlign:'center'}}>Us</NormalText>
                                       </TouchableOpacity>    
                                   </Animatable.View>
                                   :
                                   null
                           }
                         
                        </View>
                        
                    <View style={styles.BackImageContainer}>
                        <Image 
                            style={styles.BackImage} 
                            source={require('../../assets/moviebuffback.png')}/>
                    </View>

                </View>

                <View style={styles.Container}>
                    
                    <View style={styles.SPContainer}>
                        
                        <TouchableOpacity 
                            style={{width:'100%',alignItems:'center'}} 
                            onPress={()=>this.setState({ShowModalSP:true})}>
                            
                            <SinglePlayer 
                                style={{width:125,height:75}} 
                                icon={"user"} 
                                iconSize={20}>
                                <NormalText style={styles.NormalTextSP}>Single Player</NormalText>
                            </SinglePlayer>
                        
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.SPContainer}>
                        
                        <TouchableOpacity 
                            style={{width:'100%',alignItems:'center'}} 
                            onPress={()=>this.setState({ShowModalMP:true})}>
                            
                            <SinglePlayer 
                                style={{width:125,height:75}} 
                                icon={"users"} 
                                iconSize={20}>
                                <NormalText style={styles.NormalTextSP}>Play With Friends</NormalText>
                            </SinglePlayer>

                            <NormalText 
                                style={{marginTop:10,textAlign:'center',color:'yellow'}}>
                                    Comming Soon !!!
                            </NormalText>

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
                                <Image 
                                    style={{...styles.Podium,...{height:35,width:35}}} 
                                    source={require('../../assets/Setting.png')}/>
                            </SmallBtn>
                            <NormalText style={{textAlign:'center'}}>Settings</NormalText>
                        
                        </TouchableOpacity>
                   
                   </View>

                   <View style={styles.Tools}>
                    
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('EarnCoins')}>
                            
                            <SmallBtn>
                                <Image 
                                    style={styles.Podium} 
                                    source={require('../../assets/Treasure.png')}/>
                            </SmallBtn>
                            <NormalText 
                                style={{textAlign:'center'}}>
                                        Earn Coins
                            </NormalText>

                        </TouchableOpacity>
                   
                   </View>

                </View>

                <View style={styles.Footer}>
                    {this.state.ScreenHeight > 650 ? 
                         <Animatable.View 
                            animation="bounce" 
                            iterationCount="infinite">
                        
                         <TouchableOpacity onPress={()=>this.RunVideoAd()}>
                             <Image 
                                source={require('../../assets/videoDB.png')} 
                                style={{width:40,height:40,resizeMode:'stretch'}}/>
                             <NormalText style={{textAlign:'center'}}>Watch</NormalText>
                             <NormalText style={{textAlign:'center'}}>Ad</NormalText>
                         </TouchableOpacity>    
                      
                     </Animatable.View>:null
                    }

                    {this.state.ScreenHeight > 650 ? 
                         <Animatable.View 
                            animation="tada" 
                            duration={2500} 
                            iterationCount="infinite">
                        
                         <TouchableOpacity onPress={()=>this.Rate() }>
                             <Image 
                                source={require('../../assets/star.png')} 
                                style={{width:40,height:40,resizeMode:'stretch'}}/>
                             <NormalText style={{textAlign:'center'}}>Rate</NormalText>
                             <NormalText style={{textAlign:'center'}}>us</NormalText>
                         </TouchableOpacity>    
                      
                     </Animatable.View>:null
                    }
                   
                </View>
                {/* Modals From Here */}

                    <Modal 
                        coverScreen={false} 
                        backdropOpacity={0.9} 
                        backdropColor="#1D1331" 
                        transparent={true} 
                        isVisible={this.state.ShowModalSP} 
                        animationType="slide" 
                        style={{width:'100%',margin:'auto'}}>
                        
                        <CustomModal 
                            Heading="SP" 
                            Type="SP" 
                            DismissModal={this.DismissSPMPModal} 
                            SetQuestions={this.setSPNoQuestions} 
                            setRegion={this.setSpRegion} 
                            Questions={this.state.SPNoQuestions} 
                            Region={this.state.SPRegion} 
                            SetRegion={this.setSpRegion} 
                            ProceedToCustom={this.onProceedToCustom}
                            />
                    </Modal>
                       
                    <Modal 
                        isVisible={this.state.ShowModalMP} 
                        coverScreen={false} backdropOpacity={0.9} 
                        backdropColor="#1D1331" transparent={true} 
                        animationType="slide">
                        
                        <MPModal 
                            Region={this.state.SPRegion}
                            DismissModal={this.DismissSPMPModal}
                            setRegion={this.setSpRegion}
                            Id={this.props.Dashboard.Id}
                            ProfileImg={this.props.Dashboard.ImgUrl}
                            UserName={this.props.Dashboard.ScreenName}
                            MoveToMPGame={this.onProceedToMPGame}
                            navigation={this.props.navigation} />
                    </Modal>  

                    <Modal 
                        coverScreen={false} 
                        backdropOpacity={0.9} 
                        backdropColor="#1D1331" 
                        isVisible={this.state.ShowSignUpModal} 
                        transparent={true} 
                        animationType="slide" 
                        style={{width:'100%',margin:'auto'}}>
                        
                        <CustomModal 
                            Heading="Reward" 
                            Type="Reward" 
                            FMsg={"Thank You For Registering With Us"} 
                            SMsg={"Here Are Some Coins"}
                            Coins="500"
                            ButtonText={"Claim Coins"} 
                            DismissModal={this.DismissSignUpModal} />

                    </Modal>

                    <Modal 
                        coverScreen={false} 
                        backdropOpacity={0.9} 
                        backdropColor="#1D1331" 
                        transparent={true} 
                        isVisible={this.state.ShowInsuffModal}  
                        animationType="slide" 
                        style={{width:'100%',margin:'auto'}}>
                        
                        <CustomModal 
                            Heading="Insuff" 
                            Type="Insuff" 
                            FMsg={"You Have Insufficient Coins To Play"} 
                            SMsg={"Toal Coins You Need You Need To Play Are"}                        
                            Coins={this.state.SPNoQuestions * 2} 
                            DismissModal={this.DismissRewardModal} />
                    
                    </Modal>
                    
                    <Modal 
                        coverScreen={false} 
                        backdropOpacity={0.9} 
                        backdropColor="#1D1331" 
                        transparent={true} 
                        isVisible={this.state.ShowSettings}  
                        animationType="slide" 
                        style={{width:'100%',margin:'auto'}}>
                        
                        <CustomModal 
                            Heading="Opt" 
                            Type="Opt" 
                            Logout={this.onLogOutPressed} 
                            DismissModal={this.DismissSettingsModal}/>
                    </Modal>

                    <Modal 
                        coverScreen={false} 
                        backdropOpacity={0.9} 
                        backdropColor="#1D1331" 
                        transparent={true} 
                        isVisible={this.state.ShowRewardModal} 
                        animationType="slide" 
                        style={{width:'100%',margin:'auto'}}>
                        
                        <CustomModal 
                            Heading="Reward" 
                            Type="Reward" 
                            FMsg={"Thank You For Watching Ad"} 
                            SMsg={"Here Is Your Reward"}
                            Coins="100" 
                            DismissModal={this.DismissRewardModal} />
                    </Modal>

                    <Modal 
                        isVisible={this.state.isLoading}>
                        <Loader Text={this.state.LoadingText}/>
                    </Modal>

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
        height:225,
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
        justifyContent:'space-between',
        alignItems:'flex-start',
        flexDirection:'row'
    },
    Footer:{
        flex:1,
        flexDirection:'row',
        alignSelf:'stretch',
        justifyContent:'space-between',
        alignItems:'flex-end',
        padding:15
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
