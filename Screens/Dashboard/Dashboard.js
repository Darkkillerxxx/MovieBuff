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
import {setDashboard} from '../../Store/Actions/ActionDashboard'
import {fetchUser,UpdateUser} from '../../Database/Helper'
import {AddCoins} from '../../Utils/api.js'
import RewardModal from '../../Components/Modals/RewardModal'
import DashboardReducer from '../../Store/Reducers/Dashboard';


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
            ShowInsuffModal:false
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

    componentDidMount()
    {
        console.log("Dasbhoard Redux",this.props.Dashboard)
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
                console.log("Assign Coins")
                let EarnCoinsPayload={
                    "Id":this.props.Dashboard.Id,
                    "CoinsToAdd":100,
                    "ResourceID":8,
                    "Credit":"True",
                    "Debit":"False"
                }

                AddCoins(EarnCoinsPayload).then(result=>{
                    if(result.IsSuccess)
                    {
                        console.log("Coins Added Successfully")
                        let DashboardRedux=this.props.Dashboard;
                        DashboardRedux.isNew=false
                        DashboardRedux.Coins=100
                        this.props.onSetDashbaord(DashboardRedux)
                        UpdateUser(JSON.stringify(DashboardRedux)).then(result=>{
                            console.log("Update",result)
                            this.setState({ShowSignUpModal:true})
                        }).catch(err=>{
                             ToastAndroid.show("Failed To Update Database",ToastAndroid.SHORT)
                         })
                    }
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
                        </TouchableOpacity>
                    </View>
                    <View style={styles.BriefContainer}>
                        {console.log("Gold",this.state.Dashboard)}
                        <View style={{width:'100%',flexDirection:'row',marginVertical:5}}>
                            <BriefInfo style={{width:'33.33%'}} Image={require('../../assets/Gold.png')} value={this.state.Gold === 0 || this.state.Gold === null  ? 0 :this.state.Gold}/>
                            <BriefInfo style={{width:'33.33%'}} Image={require('../../assets/Silver.png')} value={this.state.Silver === 0 || this.state.Silver === null ? 0 :this.state.Silver}/>
                            <BriefInfo style={{width:'33.33%'}} Image={require('../../assets/Bronze.png')} value={this.state.Bronze === 0 || this.state.Bronze === null ? 0 :this.state.Bronze}/>
                        </View>
                        <View style={{width:'100%',flexDirection:'row'}}>
                            <BriefInfo style={{width:'33.33%'}} Image={require('../../assets/coins.png')} value={this.state.Coins !== 0 ? this.state.Coins:0}/>
                            <BriefInfo style={{width:'33.33%'}} Image={require('../../assets/Crown.png')} value={this.state.Crowns !== 0 ? this.state.Crowns:0}/>
                        </View>
                    </View>
                </View>
                <View style={styles.ImageView}>
                    <View style={styles.BackImageContainer}>
                        <Image style={styles.BackImage} source={require('../../assets/moviebuffback.png')}  />
                    </View>
                </View>

                <View style={styles.Container}>
                    <View style={styles.SPContainer}>
                        <TouchableOpacity onPress={()=>this.setState({ShowModalSP:true})}>
                            <SinglePlayer>
                                <NormalText style={styles.NormalTextSP}>Single Player</NormalText>
                            </SinglePlayer>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.SPContainer}>
                        <TouchableOpacity onPress={()=>ToastAndroid.show("Comming Soon",ToastAndroid.LONG)}>
                            <Coop>
                                <NormalText style={styles.NormalTextCo}>Play With Friends</NormalText>
                            </Coop>
                        </TouchableOpacity>
                    </View>

                   
                </View>
                <View style={styles.ToolsContainer}>
                   <View style={styles.Tools}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Leaderboard')}>
                        <SmallBtn color1="#009BE7" color2="#009DB2" color3="#00DF9B" color4="#00F57E">
                            <Image style={styles.Podium} source={require('../../assets/podium.png')}/>
                        </SmallBtn>
                    </TouchableOpacity>
                   </View>

                   <View style={styles.Tools}>
                    <TouchableOpacity onPress={()=>ToastAndroid.show("Comming Soon",ToastAndroid.LONG)}>
                        <SmallBtn color1="#052CB5" color2="#0077E9" color3="#00C0E4" color4="#00EEEF">
                            <Image style={styles.Podium} source={require('../../assets/wheel.png')}/>
                        </SmallBtn>
                    </TouchableOpacity>
                   </View>

                   <View style={styles.Tools}>
                    <TouchableOpacity onPress={()=>ToastAndroid.show("Comming Soon",ToastAndroid.LONG)}>
                        <SmallBtn color1="#FF8300" color2="#FF9F00" color3="#FFC700" color4="#FFDE00">
                            <Image style={styles.Podium} source={require('../../assets/earn.png')}/>
                        </SmallBtn>
                    </TouchableOpacity>
                   </View>
                </View>
                <Modal visible={this.state.ShowModalSP} transparent={true} animationType="slide">
                    <CustomModal DismissModal={this.DismissSpModal} SetQuestions={this.setSPNoQuestions} setRegion={this.setSpRegion} Questions={this.state.SPNoQuestions} Region={this.state.SPRegion} SetRegion={this.setSpRegion} ProceedToCustom={this.onProceedToCustom}/>
                </Modal>   
                <Modal visible={this.state.ShowModalMP} transparent={true} animationType="slide">
                    <MPModal/>
                </Modal>  
                <Modal visible={this.state.ShowSignUpModal} transparent={true} animationType="slide">
                    <RewardModal Coins={100} FirstMsg={"Thank You For Registering To Filmy Buzz"} SecondMsg={"Here Is Your Sign Up Reward"} DismissModal={this.DismissRewardModal}/>
                </Modal> 
                <Modal visible={this.state.ShowInsuffModal} transparent={true} animationType="slide">
                    <RewardModal Coins={this.state.SPNoQuestions * 2} FirstMsg={"You Have Insufficient Balance to Play This Quest"} SecondMsg={"Total Coins You Need To Play This Quest Are"} DismissModal={this.DismissInsuffModal}/>
                </Modal>     
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
        borderBottomRightRadius:15
    },
    BriefContainer:{
        width:"80%",
        backgroundColor:"#11233A",
        opacity:0.8,
        padding:10,
        marginBottom:15,
        borderBottomRightRadius:15,
        borderTopRightRadius:15
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
        
    },
    SPContainer:{
        width:'50%',
        flexDirection:'row',
        justifyContent:'center'
    },
    NormalTextSP:{
        fontSize:15,
        color:'#00C08A'
    },
    NormalTextCo:{
        fontSize:15,
        color:"#FF5D60"
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
        width:30,
        height:30
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