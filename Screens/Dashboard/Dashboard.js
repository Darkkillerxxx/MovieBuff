import React from 'react'
import { View, StyleSheet,Image,Modal,TouchableOpacity,BackHandler, ToastAndroid,Alert } from 'react-native'
import AppContainer from '../../Components/AppContainer';
import NormalText from '../../Components/NormalText';
import SinglePlayer from '../../Components/SinglePlayerBtn'
import Coop from '../../Components/CoopButton'
import SmallBtn from '../../Components/SmallButton';
import BriefInfo from '../../Components/BriefInfo'
import CustomModal from '../../Components/Modals/Modal'
import { Button } from 'react-native-paper';
import MPModal from '../../Components/Modals/MPModal'
import { connect }from 'react-redux'
import {setGame,setQuestions} from '../../Store/Actions/ActionSp'
import {setLogin} from '../../Store/Actions/ActionJoin'
import {setDashboard} from '../../Store/Actions/ActionDashboard'
import {fetchUser,UpdateUser,DeleteUser} from '../../Database/Helper'
import {AddCoins,GetLeaderBoard} from '../../Utils/api.js'
import RewardModal from '../../Components/Modals/RewardModal'
import DashboardReducer from '../../Store/Reducers/Dashboard';
import SettingsModal from '../../Components/Modals/SettingsModal'

class Dashboard extends React.Component{
    constructor()
    {
        super();
        this.state={
            ShowModalSP:false,
            ShowModalMP:false,
            SPNoQuestions:5,
            SPRegion:[1],
            DashboardCoins:0,
            Bronze:0,
            Coins:0,
            Crowns:0,
            Gold:0,
            ImgUrl:"",
            Silver:"",
            ShowSignUpModal:false,
            ShowInsuffModal:false,
            ShowSettings:false
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

    DismissRewardModal=()=>{
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

    componentDidMount()
    {
        // console.log("Dasbhoard Redux",this.props.Dashboard)
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


     componentDidUpdate(prevProps,prevState,Ss)
     {
         console.log("Props Update Below")
         console.log(prevProps.Dashboard.Coins,this.props.Dashboard.Coins)
         if(prevProps.Dashboard.Coins !== this.props.Dashboard.Coins || prevProps.Dashboard.GOLD !== this.props.Dashboard.GOLD 
            || prevProps.Dashboard.Silver !== this.props.Dashboard.Silver || prevProps.Dashboard.Bronze !== this.props.Dashboard.Bronze ||
            prevProps.Dashboard.Crowns !== this.props.Dashboard.Crowns )
         {
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
                <View style={styles.InfoContainer}>
                    <View style={styles.PicContainer}>
                        <TouchableOpacity>
                            <View style={styles.ProfilePic}>
                                <Image style={{width:'100%',height:'100%'}} source={this.state.ImgUrl !== "" ? {uri:this.state.ImgUrl}:require('../../assets/Temp/User1.png')}></Image>
                            </View>
                            <NormalText style={{textAlign:'center'}}>{this.props.Dashboard.ScreenName}</NormalText>
                            {/* <NormalText style={{textAlign:'center'}}>Level 1</NormalText> */}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.BriefContainer}>
                        {console.log("Gold",this.state.Dashboard)}
                        <View style={{width:'100%',flexDirection:'row',marginVertical:5}}>
                             <BriefInfo style={{width:'33.33%'}} ImageStyle={{height:25,width:25,marginBottom:5}} Image={require('../../assets/Gold.png')} value={this.state.Gold === 0 || this.state.Gold === null  ? 0 :this.state.Gold}/>
                             <BriefInfo style={{width:'33.33%'}} ImageStyle={{height:25,width:25,marginBottom:5}} Image={require('../../assets/Silver.png')} value={this.state.Silver === 0 || this.state.Silver === null ? 0 :this.state.Silver}/>
                            <BriefInfo style={{width:'33.33%'}} ImageStyle={{height:25,width:25,marginBottom:5}} Image={require('../../assets/Bronze.png')} value={this.state.Bronze === 0 || this.state.Bronze === null ? 0 :this.state.Bronze}/> 
                        </View>
                        <View style={{width:'100%',flexDirection:'row'}}>
                            <BriefInfo style={{width:'33.33%'}} ImageStyle={{height:25,width:35,marginLeft:-5,marginBottom:5}} Image={require('../../assets/TreasureBox.png')} value={this.state.Coins !== 0 ? this.state.Coins:0}/>
                            <BriefInfo style={{width:'33.33%'}} ImageStyle={{height:25,width:20,marginBottom:5,resizeMode:'contain'}} Image={require('../../assets/Crown.png')} value={this.state.Crowns !== 0 ? this.state.Crowns:0}/>
                        </View>
                    </View>
                </View>
                <View style={styles.ImageView}>
                    <View style={styles.BackImageContainer}>
                        <Image style={styles.BackImage} source={require('../../assets/moviebuffback.png')}/>
                    </View>
                </View>

                <View style={styles.Container}>
                    <View style={styles.SPContainer}>
                        <TouchableOpacity style={{width:'100%'}} onPress={()=>this.setState({ShowModalSP:true})}>
                            <SinglePlayer icon={"user"}>
                                <NormalText style={styles.NormalTextSP}>Single Player</NormalText>
                            </SinglePlayer>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.SPContainer}>
                        <TouchableOpacity style={{width:'100%'}} onPress={()=>ToastAndroid.show("Comming Soon",ToastAndroid.LONG)}>
                            <SinglePlayer icon={"users"}>
                                <NormalText style={styles.NormalTextSP}>Play With Friends</NormalText>
                            </SinglePlayer>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.ToolsContainer}>
                   <View style={styles.Tools}>
                    <TouchableOpacity onPress={()=>this.onLBPressed()}>
                        <SmallBtn>
                            <Image style={styles.Podium} source={require('../../assets/Leaderboard.png')}/>
                        </SmallBtn>
                    </TouchableOpacity>
                   </View>

                   <View style={styles.Tools}>
                    <TouchableOpacity onPress={()=>this.setState({ShowSettings:true})}>
                        <SmallBtn>
                            <Image style={{...styles.Podium,...{height:35,width:35}}} source={require('../../assets/Setting.png')}/>
                        </SmallBtn>
                    </TouchableOpacity>
                   </View>

                   <View style={styles.Tools}>
                    <TouchableOpacity onPress={()=>ToastAndroid.show("Comming Soon",ToastAndroid.LONG)}>
                        <SmallBtn>
                            <Image style={styles.Podium} source={require('../../assets/Treasure.png')}/>
                        </SmallBtn>
                    </TouchableOpacity>
                   </View>
                </View>



                {/* Modals From Here */}

                
                <Modal visible={this.state.ShowModalSP} transparent={true} animationType="slide">
                    <CustomModal Heading="SP" Type="SP" DismissModal={this.DismissSpModal} SetQuestions={this.setSPNoQuestions} setRegion={this.setSpRegion} Questions={this.state.SPNoQuestions} Region={this.state.SPRegion} SetRegion={this.setSpRegion} ProceedToCustom={this.onProceedToCustom}/>
                </Modal>   
                <Modal visible={this.state.ShowModalMP} transparent={true} animationType="slide">
                    <MPModal/>
                </Modal>  
                <Modal visible={this.state.ShowSignUpModal} transparent={true} animationType="slide">
                    <RewardModal Coins={500} FirstMsg={"Thank You For Registering To Filmy Buzz"} SecondMsg={"Here Is Your Sign Up Reward"} DismissModal={this.DismissRewardModal}/>
                </Modal> 
                <Modal visible={this.state.ShowInsuffModal} transparent={true} animationType="slide">
                    <RewardModal Coins={this.state.SPNoQuestions * 2} FirstMsg={"You Have Insufficient Balance to Play This Quest"} SecondMsg={"Total Coins You Need To Play This Quest Are"} DismissModal={this.DismissInsuffModal}/>
                </Modal>
                <Modal visible={this.state.ShowSettings} transparent={true} animationType="slide">
                    <SettingsModal Logout={this.onLogOutPressed} DismissModal={this.DismissSettingsModal} />
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
        fontSize:15,
        color:'white'
    },
    NormalTextCo:{
        fontSize:15,
        color:"#FF5D60"
    },
    ToolsContainer:{
        marginTop:15,
        flexDirection:'row',
        width:'100%'
    },
    Tools:{
        width:'33.33%',
        flexDirection:'row',
        justifyContent:'center'
    },
    Podium:{
        width:50,
        height:50,
        resizeMode:'contain'
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