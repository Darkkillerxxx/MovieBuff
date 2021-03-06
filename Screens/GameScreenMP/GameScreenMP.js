import React from 'react'
import AppContainer from '../../Components/AppContainer'
import { StyleSheet,View,Text, Image,ScrollView,TouchableOpacity, ToastAndroid,Alert,Dimensions,BackHandler } from 'react-native'
import Modal from 'react-native-modal';
import NormalText from '../../Components/NormalText';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Options from '../../Components/Options'
import CustomModal from '../../Components/Modals/Modal'
import { connect } from 'react-redux'
import {EndGame,login,DeleteUser} from '../../Utils/api'
import {setDashboard} from '../../Store/Actions/ActionDashboard'
import {setUsers,setMPQuestions} from '../../Store/Actions/ActionMP'
import CustomButton from '../../Components/CustomButton'
import {UpdateUser} from '../../Database/Helper'
import * as Animatable from 'react-native-animatable';
import Loader from '../../Components/Modals/Loader'
import { Audio } from 'expo-av';
import firebase from 'firebase';
let BackTimer
const IncreaseWidth={
    0:{
        width:50,
        opacity:0
    },
    1:{
        width:250,
        opacity:1
    }
  }
  const DecreaseWidth={
    0:{
        width:250,
        opacity:1
    },
    1:{
        width:50,
        opacity:0
    }
  }
import {
    AdMobBanner,setTestDeviceIDAsync,AdMobInterstitial
  } from 'expo-ads-admob';
class GameScreenMP extends React.Component{
    constructor()
    {
        super();
        this.state={
            ModalType:"",
            Timer:15,
            TimeAloted:15,
            TimerValue:100,
            Questions:[],
            SelectedQuestion:0,
            SelectedImage:0,
            HasSelected:false,
            SelectedOptions:null,
            UserSelection:null,
            CorrectAns:0,
            AnsPayload:[],
            Result:[],
            ImageLoaded:false,
            OptionsDisabled:false,
            EarnedCoins:0,
            back:false,
            DimensionsHeight:0,
            CoinDimension:0,
            StartCoinAnimation:false,
            ShowZoomAnimation:false,
            ShowImageAnimation:false,
            isLoading:false,
            TempAnimation:false,
            UsersAnswered:0,
            RoomID:null,
            TotalUsers:null,
            Users:[],
            Loading:false,
            isHost:false,
            FirstAnsweredId:null,
            FirstAnimationState:null,
            LoadingText:null
        }
        this.rightSound = new Audio.Sound();
        this.wrongSound = new Audio.Sound();
        this.coinsSound = new Audio.Sound();

        if(!firebase.apps.length)
        {
            firebase.initializeApp({
                apiKey: "AIzaSyA_BAi5DYYPyJhmw-iXPDHnlCbeXgcpIoo",
                authDomain: "filmybuff-test.firebaseapp.com",
                databaseURL: "https://filmybuff-test.firebaseio.com",
                projectId: "filmybuff-test",
                storageBucket: "filmybuff-test.appspot.com",
                messagingSenderId: "242527310199",
                appId: "1:242527310199:web:b6fc88d8a7e47273a8d172",
                measurementId: "G-V06M1572DR"
            });
        }
    }

    shuffle = (array)=> {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }

    fetchResults=()=>{
        let payload={
            RoomId:this.state.RoomID
        }

        EndGame(payload).then(result=>{
           console.log("126",result)
            if(result.IsSuccess)
            {
                this.setState({isLoading:false})
                this.setState({Result:result.Data})
            }
        })
    }

    SortQuestions=()=>{
        let UnSortedQuestion=this.props.MPQuestions
        UnSortedQuestion.sort((a,b)=> parseInt(a.SortId) - parseInt(b.SortId))
        
        UnSortedQuestion.forEach(element=>{
            element.options = this.shuffle(element.options)
        })
        
        this.setState({Questions:UnSortedQuestion})
    }

    componentDidMount()
    {
        
        setTimeout(()=>{
            
            this.Timer()
        this.setState({Users:this.props.MPUsers})
        this.SortQuestions()
     
        const { params } = this.props.navigation.state;
        this.setState({RoomID:params.RoomID})
        // console.log("135",params.Host)
        this.setState({isHost:params.Host})

        firebase.database().ref(`room/${params.RoomID}`).once("value",(snapshot)=>{
            this.setState({TotalUsers:snapshot.numChildren() -1},()=>{
                // console.log('Total Users',this.state.TotalUsers)
            })
        })

        firebase.database().ref(`questions/${params.RoomID}/OtherInfo`).on('child_changed',(snapshot)=>{
            // console.log("Other Info Changed",snapshot.key)
            if(snapshot.key === "QuestionNo")
            {
                //Change Questions
                if(snapshot.val() < this.state.Questions.length)
                {
                    this.setState({Loading:false},()=>{
                        setTimeout(()=>{
                            this.setState({FirstAnsweredId:null})
                            this.MarkUsers(true,null,null)
                            this.MoveToNextQuestion()
                            this.ChangeLatestAnsweredCorrect(true,null)
                            this.ChangeLatestAnsweredWrong(true,null)
                        },1500)
                    })
                }
                else 
                {
                    this.setState({isLoading:true})
                    this.setState({LoadingText:"Fetching Your Results ..."})
                    this.fetchResults()   
                }
            }
            else if(snapshot.key === "lastestAnsweredCorrect")
            {
                // console.log("LastAnswered Changed")
                if(snapshot.val() !== 0)
                {
                    //Call the Function Here
                    this.MarkUsers(false,true,snapshot.val())
                }
            }
            else if(snapshot.key === "lastestAnsweredWrong")
            {
                // console.log("LastAnswered Changed")
                if(snapshot.val() !== 0)
                {
                    //Call the Function Here
                    this.MarkUsers(false,false,snapshot.val())
                }
            }
            else
            {
                // console.log("Here 0",params.Host)
                //only accesible to host
                if(params.Host)
                {
                    
                    // console.log("Changing Info",parseInt(snapshot.val()),parseInt(this.state.TotalUsers))
                    if(parseInt(snapshot.val()) >= parseInt(this.state.TotalUsers))
                    {
                        // console.log("Here 1")
                        this.ChangeFBOtherInfo(true)
                        this.ChangeFBOQuestionInfo()
                    }
                    else
                    {
                        // console.log("Here 2")       
                        this.setState({UsersAnswered:this.state.UsersAnswered + 1})
                    }
                }
                else
                {
                    clearTimeout(BackTimer)
                }
            }
        })

        firebase.database().ref(`room/${params.RoomID}/`).on('child_removed',(snapShot)=>{
            // console.log("Removed in MP",snapShot.val())
            this.RemoveAddedUserMP(snapShot.val())
        })
        },1000)
    }

    FirstAnsweredAnimation=(id)=>{
        if(this.state.FirstAnsweredId === null)
        {
            let i = 1
            // console.log("Check : "+ id,this.props.Dashboard.Id,this.state.Users)
            let ArrangedUsers=[]
            this.state.Users.forEach(element => {
                if(parseInt(element.User_id) === parseInt(id))
                {
                    ArrangedUsers[0]=element
                }
                else
                {
                    ArrangedUsers[i]=element
                    i++
                }
            })
            
            this.setState({Users:ArrangedUsers},()=>{
                // console.log("Check 2 : "+id,this.props.Dashboard.Id,this.state.Users)
                this.setState({FirstAnsweredId:id},()=>{
                      this.setState({FirstAnimationState:1})
                })
            })
        }
    }

    changeAnimationState=()=>{
        console.log("OutSide if/else",this.state.FirstAnimationState)
        if(this.state.FirstAnimationState === 1)
        {
            console.log("InSide if/else",this.state.FirstAnimationState)
            setTimeout(()=>{
                this.setState({FirstAnimationState:2},()=>{
                    this.setState({FirstAnimationState:null})
                })
            },2000)
        }
    }

    // BackgroundTimer=()=>{
    //     console.log("Setting TimeOut")
    //     BackTimer=setTimeout(()=>{
    //         console.log("Reducing Total User")
    //         this.setState({TotalUsers:this.state.TotalUsers - 1},()=>{
    //             this.setState({Loading:false})
    //             this.MarkUsers(true,null,null)
    //             this.MoveToNextQuestion()
    //             this.ChangeLatestAnsweredCorrect(true,null)
    //             this.ChangeLatestAnsweredWrong(true,null)
    //         })
            
    //     },20000)
    // }

    MarkUsers=(isReset,isCorrect,UserId)=>{
        let Tempusers=this.state.Users
        if(isReset)
         {
             Tempusers.forEach(element=>{
                 element.hasAnsCorrect=null
             })
         }
         else
         {
             Tempusers.every((element)=>{
                 if(parseInt(element.User_id) === parseInt(UserId))
                 {
                    if(isCorrect)
                    {
                        element.hasAnsCorrect = true
                    }
                    else
                    {
                        element.hasAnsCorrect = false
                    }    
                        
                     return false
                 }
                 else
                 {
                     return true
                 }
             })
         }
     
        //  console.log("Mark Users"+UserId,isReset,Tempusers)
        this.setState({Users:Tempusers},()=>{
            if(isCorrect)
            {
                this.FirstAnsweredAnimation(UserId)
            }
        })
    }

    Timer=()=>{
        setInterval(()=>{
            if(this.state.Timer > 0 && this.state.ImageLoaded)
            {
               this.setState({Timer:this.state.Timer-1},()=>{
                   this.calcTimerValue()
                   if(this.state.Timer === 0)
                   {
                      this.PostUserAnswers(false,15)
                      this.SkipQuestion()
                   }
               })
            }
           },1000)
   }

   calcTimerValue=()=>{
    let TimerValue=this.state.Timer/this.state.TimeAloted * 100
    this.setState({TimerValue:parseInt(TimerValue)})
    }

   
   SkipQuestion=()=>{
    if(this.state.SelectedQuestion + 1 <= this.state.Questions.length)
    {
        let TempReport=this.state.AnsPayload;
        TempReport.push(
            {
                QID:this.state.Questions[this.state.SelectedQuestion].Qid,
                isCorrect:false,
                time:this.state.TimeAloted
            })

        this.setState({AnsPayload:TempReport},()=>{
            // console.log("Timer Payload",this.state.AnsPayload)
            if(this.state.SelectedQuestion + 1 < this.state.Questions.length)
            {
               this.ChangeFBOtherInfo(false)
            }
            else
            {
                // this.fetchResult()
            }
        })
    }
    else
    {
        // console.log("Feching Result Activated By timer")
        // this.fetchResult()
        // console.log(this.state.CorrectAns,this.state.AnsPayload) 
    }
}

    PostUserAnswers=(isCorrect,Time)=>{
        firebase.database().ref(`questions/${this.state.RoomID}/reports/${this.state.Questions[this.state.SelectedQuestion].Qid}/${this.props.Dashboard.Id.toString()}`).
        set({
            isCorrect:isCorrect,
            Time:Time
        })
    }

    MoveToNextQuestion=()=>{
        clearInterval(BackTimer)
        this.setState({UsersAnswered:0})
        this.setState({Timer:this.state.TimeAloted})
        this.setState({SelectedImage:this.state.SelectedImage+1},()=>{
            let ImgWait=setInterval(()=>{
                if(this.state.ImageLoaded)
                {
                    this.setState({SelectedQuestion:this.state.SelectedQuestion+1},()=>{
                        this.setState({HasSelected:false})
                        this.setState({OptionsDisabled:false})
                        clearInterval(ImgWait)    
                    }) 
                }
            },500)
        })
        // console.log("Moving")
    }

    ChangeFBOQuestionInfo=()=>{
        firebase.database().ref(`questions/${this.state.RoomID}/OtherInfo/`).update({
            QuestionNo:this.state.SelectedQuestion + 1
        })
    }

    ChangeFBOtherInfo=(reset)=>{
        // console.log("Changing FB Other Info")
        this.setState({Loading:true},()=>{
            setTimeout(()=>{
                firebase.database().ref(`questions/${this.state.RoomID}/OtherInfo/UsersAnswered`).transaction((val)=>{
                    if(val !== null)
                    {
                        if(reset)
                        {
                            return 0
                        }
                        {
                            return val + 1
                        }
                    }
                })
            },1000)
        })
      
    }

    ChangeLatestAnsweredCorrect=(isReset,userId)=>{
        // console.log("Just Checking",userId,`questions/${this.state.RoomID}/OtherInfo/latestAnswered`)
        firebase.database().ref(`questions/${this.state.RoomID}/OtherInfo/lastestAnsweredCorrect`).transaction((val)=>{
            if(val !== null)
            {
                if(isReset)
                {
                    return 0
                }
                else
                {
                    return userId
                }
            }
        })
    }

    ChangeLatestAnsweredWrong=(isReset,userId)=>{
        // console.log("Just Checking",userId,`questions/${this.state.RoomID}/OtherInfo/latestAnswered`)
        firebase.database().ref(`questions/${this.state.RoomID}/OtherInfo/lastestAnsweredWrong`).transaction((val)=>{
            if(val !== null)
            {
                if(isReset)
                {
                    return 0
                }
                else
                {
                    return userId
                }
            }
        })
    }

    onSelectOptions=(options,id)=>{
        let TimeTaken=this.state.TimeAloted-this.state.Timer
        // this.setState({ShowImageAnimation:true})
        // console.log("Idddddd",id)
        // console.log(this.state.isHost)
        // if(this.state.isHost)
        // {
        //     console.log("Calling Timer")
        //     this.BackgroundTimer()
        // }
        this.setState({ImageLoaded:false})
        if(!this.state.HasSelected)
        {
            this.setState({HasSelected:true},()=>{

                this.setState({SelectedOptions:id})
                if(id === 4)
                {
                    // this.playCorrectSound()
                    // this.playCoinsSound()
                    this.setState({StartCoinAnimation:true})
                    this.setState({CorrectAns:this.state.CorrectAns+1})
                    this.ChangeLatestAnsweredCorrect(false,this.props.Dashboard.Id)
                    this.PostUserAnswers(true,TimeTaken)
                }
                else
                {
                    this.ChangeLatestAnsweredWrong(false,this.props.Dashboard.Id)
                    this.PostUserAnswers(false,TimeTaken)
                    // this.playWrongSound()
                }
                let TempReport=this.state.AnsPayload;
                TempReport.push(
                    {
                        QID:options.Qid,
                        isCorrect:id === 4,
                        time:TimeTaken.toString()
                    })
                this.setState({OptionsDisabled:true})
                this.setState({AnsPayload:TempReport},()=>{
                    // console.log("Normal Payload",this.state.AnsPayload)
                    this.ChangeFBOtherInfo(false)
                    // if(this.state.SelectedQuestion+1 < this.state.Questions.length)
                    // {
                    //     setTimeout(()=>{
                    //        this.MoveToNextQuestion()
                    //        this.setState({StartCoinAnimation:false})
                    //        this.setState({ShowImageAnimation:false})
                    //     },1000)
                    // }
                    // else
                    // {
                    //     this.setState({Timer:0})
                    //     console.log(this.state.CorrectAns,this.state.AnsPayload)
                    //     setTimeout(()=>{
                    //         this.setState({StartCoinAnimation:false})
                    //         this.setState({ShowImageAnimation:false})
                    //         this.fetchResult()      
                    //     },2000)
                      
                    // }
                })
            })
        }
    }

    checkAnswer=(id,step)=>{
        if(this.state.SelectedOptions === this.state.Questions[this.state.SelectedQuestion].options[id].Id)
        {
            if(step === 0)
            {
                return true
            }
         if(this.state.Questions[this.state.SelectedQuestion].options[id].Id === 4)
         {
             return true
         }
         else
         {
             return false
         }
        }
        else
        {
             return false
        }
     }

     QuitGame=()=>{
        Alert.alert(
            'Quit',
            'Are You Sure You Want To Quit ???',
           [ {
                text: 'Yes',
                onPress: () => this.QuitGameMP()
            },
            {
                text: 'No',
                onPress: () => console.log('Ask me later pressed')
            }],
            { cancelable: false });
    }

    QuitGameMP=()=>{
        this.setState({isLoading:true})
        this.setState({LoadingText:"Removing You From The Lobby ..."})
        let RemovePayload={
            "RoomId":this.state.RoomID,
            "UserId":this.props.Dashboard.Id.toString()
        }
        DeleteUser(RemovePayload).then(result => {
            // console.log("remove",RemovePayload,result)
            if(!result.IsSuccess)
            {
              ToastAndroid.show("Error Removing User",ToastAndroid.SHORT)  
            }
        })
    }

    RemoveAddedUserMP=(RemovedUser)=>{
        RemovedUser=JSON.parse(RemovedUser.replace(/'/g,'"'))
        // console.log("In Progress")
        // console.log("520",parseInt(RemovedUser.User_id),parseInt(this.props.Dashboard.Id))
        if(parseInt(RemovedUser.User_id) !== parseInt(this.props.Dashboard.Id))
        {
            let TempLobbyUsers=this.state.Users;
            TempLobbyUsers.every((element,index)=>{
                if(parseInt(element.User_id) === parseInt(RemovedUser.User_id))
                {
                    TempLobbyUsers[index].User_id=null
                    TempLobbyUsers[index].screen_name=null
                    TempLobbyUsers[index].img_url=null
                    return false   
                }
                else
                {
                    return true
                }
            })
            this.setState({TotalUsers:this.state.TotalUsers - 1},()=>{
                if(this.state.isHost)
                {
                    if(parseInt(this.state.UsersAnswered) >= parseInt(this.state.TotalUsers))
                    {
                        this.ChangeFBOtherInfo(true)
                        this.ChangeFBOQuestionInfo()
                    }
                }
            })
            this.setState({Users:TempLobbyUsers})
        }
        else
        {
            this.props.navigation.replace('Dashboard')
        }
    }

    
    cangeModalType=(type)=>{
        let SignInPayload={
            UserId:this.props.Dashboard.FbId.length > 0 ? "":this.props.Dashboard.Id,
            ScreenName:"",
            FacebookId:this.props.Dashboard.FbId,
            Password:this.props.Dashboard.Password
         }
        //  console.log("Login Payload",SignInPayload)

         login(SignInPayload).then(result=>{
            // console.log(result) 
            if(result.IsSuccess)
             {
                 let TempDashboard=result.Data[0]
                 TempDashboard.FbId=this.props.Dashboard.FbId
                 TempDashboard.Password=this.props.Dashboard.Password
                 TempDashboard.ScreenName=this.props.Dashboard.ScreenName
                 UpdateUser(JSON.stringify(TempDashboard)).then(result=>{
                    // console.log("Update",result)
                 }).catch(err=>{
                     ToastAndroid.show("Failed To Update Database",ToastAndroid.SHORT)
                 })
                this.props.onSetDashboard(TempDashboard)
                this.setState({Timer:0},()=>{
                    this.props.navigation.replace('Dashboard')
                })
             }
         })
    }

    componentWillUnmount=()=>{
        this.props.onSetMpUsers([])
        this.props.onSetQuestions([])
        firebase.database().ref(`room/${this.state.RoomID}/`).off('child_removed')
        firebase.database().ref(`room/${this.state.RoomID}/`).off('value')
        firebase.database().ref(`room/${this.state.RoomID}/`).off('child_changed')
    }

    // componentDidUpdate(prevProps,prevState,ss)
    // {
    //     if(prevProps.AppStatus !== this.props.AppStatus)
    //     {
    //         if(this.props.AppStatus === 'Active')
    //         {
    //            //call api to join back room 
    //         }
    //         else if(this.props.AppStatus === 'background')
    //         {
    //             //call api to remove user from the lobby
    //         }
    //     }
    // }
   

    render()
    {
        let ShowSideUsers=this.state.Users.map((result,index)=>{
          
            return(
                <View key={index}>
                    <View  style={{width:75,alignItems:'center'}}>
                        <Image source={{uri:result.img_url}} style={{height:50,width:50,marginVertical:5,marginLeft:10,alignSelf:'flex-start',zIndex:10}}></Image>
                        {result.hasAnsCorrect  ? 
                        <Image source={require('../../assets/correct.png')} style={{height:20,width:20,marginTop:-15,zIndex:10}}/>:
                        result.hasAnsCorrect === false ? 
                        <Image source={require('../../assets/wrong.png')} style={{height:20,width:20,marginTop:-15,zIndex:10}}/>:null}
                        <NormalText>{result.screen_name}</NormalText>
                    </View>
                    
                    {this.state.FirstAnimationState !== null && parseInt(this.state.FirstAnsweredId) === parseInt(result.User_id)  ? 
                   
                    <Animatable.View animation={this.state.FirstAnimationState === 1 ? IncreaseWidth:this.state.FirstAnimationState === 2 ? DecreaseWidth:null } onAnimationEnd={()=>this.changeAnimationState()} duration={2000} style={{backgroundColor:"#2E2247",opacity:0,width:50,height:50,marginTop:-75,alignItems:'center',justifyContent:'center',borderRadius:15}} >
                        <View style={{alignItems:'center',width:'100%'}}>
                            <View style={{backgroundColor:"#FFD764",flexDirection:'row',alignItems:'center',justifyContent:'center',width:'90%',padding:5,borderRadius:10}}>
                                <NormalText>{result.screen_name}</NormalText>
                                <View style={{marginLeft:15,flexDirection:'row'}}>
                                    <Image source={require('../../assets/correct.png')} style={{width:20,height:20,marginRight:5}} />
                                    <NormalText>
                                        3/10
                                    </NormalText>
                                </View>
                            </View>
                        </View>
                    </Animatable.View>
                    :null}

                </View>
            )
        })

        return(
            <AppContainer style={style.AppContainer}>
                <ScrollView>
                    <View style={style.Header}>
                        <View style={{height:70,width:'100%',flexDirection:'row'}}>
                            <View style={{width:'25%',backgroundColor:'#11233A',justifyContent:'center',alignItems:'center'}}>
                              
                                <View style={{width:"60%",alignItems:'center',borderRadius:10,padding:5}}>
                                    <Animatable.View animation={""} onAnimationBegin={()=>this.setState({EarnedCoins:this.state.EarnedCoins + 10})} onAnimationEnd={()=>this.setState({ShowZoomAnimation:false})}>
                                        <Image source={require('../../assets/TreasureBox.png')} style={{width:40,height:40,marginBottom:0,resizeMode:'stretch'}}></Image>
                                        <NormalText style={{textAlign:'center'}}>{this.state.EarnedCoins}</NormalText>
                                    </Animatable.View>
                                </View>
                            </View>
                            <View style={{height:'100%',width:'50%',backgroundColor:'#11233A',alignItems:'center',justifyContent:'center',paddingTop:20}}>
                            
                                <View style={style.ProgressBarContainer}>
                                    <NormalText style={{...{marginRight:5,marginTop:4},...{fontFamily:'Roboto-bold',fontSize:17,color:'#E15158'}}}>{this.state.SelectedQuestion+1}</NormalText>
                                    <View>
                                        <Image source={require('../../assets/progressOuter.png')} style={{width:'100%',height:25,resizeMode:'stretch'}}/>
                                        <View style={style.ProgressInner}>
                                            <View style={style.ProgressbarStrip}>
                                                <Image source={require('../../assets/ProgressInner.png')} style={{width:`${((this.state.SelectedQuestion+1) / this.state.Questions.length) *100}%`,height:'100%',resizeMode:'stretch'}}></Image>
                                            </View>
                                        </View>
                                    </View>
                                    <NormalText style={{...{marginLeft:5,marginTop:4},...{fontFamily:'Roboto-bold',fontSize:17,color:'#E15158'}}}>{this.state.Questions.length}</NormalText>
                                </View>
                                <View style={style.TimerContainer}>
                                    <AnimatedCircularProgress
                                        size={50}
                                        width={5}
                                        fill={this.state.TimerValue}
                                        tintColor={this.state.Timer > 10 ? "#16d39a":this.state.Timer > 5 ? "#f5bb18":"#ed4356"}
                                        backgroundColor="#3d5875" >
                                        {
                                            (fill) => (
                                            <NormalText style={{color:`${this.state.Timer > 10 ? "#16d39a":this.state.Timer > 5 ? "#f5bb18":"#ed4356"}`}}>
                                                { this.state.Timer }
                                            </NormalText>
                                            )
                                        }
                                    </AnimatedCircularProgress>
                                </View>
                            </View> 
                            <View style={{width:'25%',backgroundColor:'#11233A',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                                
                                 <TouchableOpacity onPress={()=>this.SkipQuestion()}>
                                    <Image source={require('../../assets/Skip.png')} style={{width:35,height:35,resizeMode:'contain'}}/>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>this.QuitGame()}>
                                    <Image source={require('../../assets/quit.png')} style={{width:35,height:35,resizeMode:'contain'}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View> 
                    <View style={{width:'100%',flexDirection:'row'}}>
                        <View style={{width:'100%',alignItems:'center'}}>      
                            <View style={style.PicContainer}>
                                <View style={{width:'100%',height:'100%',position:'absolute',alignItems:'center',justifyContent:'flex-start',zIndex:10}}>
                                    <ScrollView style={{width:'100%'}}>
                                        {ShowSideUsers}
                                    </ScrollView> 
                                     <View style={{width:'20%',alignItems:'center',alignSelf:'flex-start',backgroundColor:'#C8152E',borderRadius:10}}>
                                            <NormalText>{this.state.Users.length}  Players</NormalText>
                                    </View> 
                                    
                                </View>
                                <View style={{width:'100%',alignItems:'center',zIndex:0}}>
                                {
                                    this.state.Questions.length > 0 ?
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                        <View style={style.Pic1}>
                                            <Animatable.Image animation={this.state.ShowImageAnimation ? "bounceOutLeft":""} duration={2000} style={style.Pic} source={{uri:this.state.Questions[this.state.SelectedImage].ImgUrl}} onLoad={()=>this.setState({ImageLoaded:true})} />
                                        </View>
                                        {this.state.SelectedImage + 1 < this.state.Questions.length  ? 
                                        <View style={style.Pic2}>
                                            <Image style={style.Pic} source={{uri:this.state.Questions[this.state.SelectedImage+1].ImgUrl}}></Image>
                                        </View>:null
                                        }
                                        {this.state.SelectedImage + 2 < this.state.Questions.length ?
                                            <View style={style.Pic3}>
                                                <Image style={style.Pic} source={{uri:this.state.Questions[this.state.SelectedImage+2].ImgUrl}}></Image>
                                            </View>:null 
                                        }
                                    </View>:
                                    null
                                }
                                </View>
                               
                             
                            </View>
                            {this.state.Questions.length > 0 ? 
                        
                            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}
                                onLayout={event=>{
                                    const layout = event.nativeEvent.layout;
                                    // console.log('height:', layout.height);
                                    // console.log('width:', layout.width);
                                    // console.log('x:', layout.x);
                                    // console.log('y:', layout.y);
                                    this.setState({CoinDimension:layout.y},()=>{
                                        // console.log(this.state.CoinDimension)
                                    })
                                    this.setState({DimensionsHeight:layout.height})
                                }} 
                                ref={view => {this.val =view}}>
                                    {this.state.Loading ? 
                                    <View style={{marginTop:15,marginBottom:5}}>
                                       <View style={{alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                                            <Animatable.View animation={"bounceOut"} iterationCount="infinite" style={{borderRadius:100,backgroundColor:'#FED31F',height:10,width:10,marginHorizontal:5}} />
                                            <Animatable.View animation={"bounceOut"} iterationCount="infinite" delay={1000} style={{borderRadius:100,backgroundColor:'#FED31F',height:10,width:10,marginHorizontal:5}} />
                                            <Animatable.View animation={"bounceOut"} iterationCount="infinite" delay={1500} style={{borderRadius:100,backgroundColor:'#FED31F',height:10,width:10,marginHorizontal:5}} />
                                            <Animatable.View animation={"bounceOut"} iterationCount="infinite" delay={1700} style={{borderRadius:100,backgroundColor:'#FED31F',height:10,width:10,marginHorizontal:5}} />
                                       </View>
                                       <NormalText style={{color:'#FED31F'}}>Please Wait While Other Players Are Answering</NormalText>
                                     </View>:null}  
                                <View style={{width:'100%',height:50,position:'absolute',alignItems:'flex-start',paddingHorizontal:17}}>
                                 
                                    {/* {this.state.StartCoinAnimation ?
                                    <View>
                                        <Animatable.View animation={{
                                            from: { translateY:0,opacity:1},
                                            to: { translateY: - this.state.CoinDimension - (this.state.DimensionsHeight - this.state.CoinDimension),opacity:0.4 },
                                        }}
                                        duration={1000} interationCount={3} useNativeDriver={true} onAnimationEnd={()=>console.log("Animation Ends")}>
                                        
                                        <Animatable.Image animation={{
                                            from: {
                                                rotateX: this.state.back ? '0deg' : '180deg',
                                                rotate: !this.state.back ? '180deg' : '0deg',
                                            },
                                            to: {
                                                rotateX: this.state.back ? '360deg' : '-180deg',
                                                rotate: !this.state.back ? '180deg' : '0deg',
                                            },}} 
                                            source={require('../../assets/coins2.png')}
                                            duration={200} 
                                            iterationCount="infinite" 
                                            direction="alternate"  
                                            style={{width:20,height:20,resizeMode:'stretch'}}/>
                                            
                                    </Animatable.View>
                                    <Animatable.View animation={{
                                            from: { translateY:0,opacity:1},
                                            to: { translateY: (- this.state.CoinDimension - (this.state.DimensionsHeight - this.state.CoinDimension) - 20),opacity:0.3 },
                                        }}
                                        duration={1000} delay={100} interationCount={3} useNativeDriver={true} onAnimationEnd={()=>this.setState({ShowZoomAnimation:true})}>
                                        
                                        <Animatable.Image animation={{
                                            from: {
                                                rotateX: this.state.back ? '0deg' : '180deg',
                                                rotate: !this.state.back ? '180deg' : '0deg',
                                            },
                                            to: {
                                                rotateX: this.state.back ? '360deg' : '-180deg',
                                                rotate: !this.state.back ? '180deg' : '0deg',
                                            },}} 
                                            source={require('../../assets/coins2.png')}
                                            duration={200} 
                                            iterationCount="infinite" 
                                            direction="alternate"  
                                            style={{width:20,height:20,resizeMode:'stretch'}}/>
                                            
                                    </Animatable.View>
                                    <Animatable.View animation={{
                                            from: { translateY:0,opacity:1},
                                            to: { translateY: (- this.state.CoinDimension - (this.state.DimensionsHeight - this.state.CoinDimension) - 30),opacity:0.2 },
                                        }}
                                        duration={1000} delay={120} interationCount={3} useNativeDriver={true} onAnimationEnd={()=>console.log("Animation Ends")}>
                                        
                                        <Animatable.Image animation={{
                                            from: {
                                                rotateX: this.state.back ? '0deg' : '180deg',
                                                rotate: !this.state.back ? '180deg' : '0deg',
                                            },
                                            to: {
                                                rotateX: this.state.back ? '360deg' : '-180deg',
                                                rotate: !this.state.back ? '180deg' : '0deg',
                                            },}} 
                                            source={require('../../assets/coins2.png')}
                                            duration={200} 
                                            iterationCount="infinite" 
                                            direction="alternate"  
                                            style={{width:20,height:20,resizeMode:'stretch'}}/>
                                            
                                    </Animatable.View>
                                   </View>:null } */}
                                   
                                </View>
                            
                                <Animatable.View animation={this.state.HasSelected ? this.checkAnswer(0,0) ? this.checkAnswer(0,1) ? "pulse":"wobble":"":"bounceInLeft"} delay={100}>
                                    <TouchableOpacity 
                                        disabled={this.state.OptionsDisabled} 
                                        onPress={()=>this.onSelectOptions(this.state.Questions[this.state.SelectedQuestion],this.state.Questions[this.state.SelectedQuestion].options[0].Id)}>
                                            <Options 
                                                back={this.state.HasSelected ? this.checkAnswer(0,0) ? this.checkAnswer(0,1) ? "green":"red":"#FFFDD0":"#FFFDD0"} 
                                                color={this.state.HasSelected ? this.checkAnswer(0,0) ? this.checkAnswer(0,1) ? "#FFFDD0":"#FFFDD0":"black":"black"} 
                                                value={this.state.Questions[this.state.SelectedQuestion].options[0].Name} />
                                    </TouchableOpacity>
                                </Animatable.View>
                                
                                <Animatable.View animation={this.state.HasSelected ? this.checkAnswer(1,0) ? this.checkAnswer(1,1) ? "pulse":"wobble":"":"bounceInRight"} delay={200}>
                                    <TouchableOpacity 
                                        disabled={this.state.OptionsDisabled} 
                                        onPress={()=>this.onSelectOptions(this.state.Questions[this.state.SelectedQuestion],this.state.Questions[this.state.SelectedQuestion].options[1].Id)}>
                                            <Options 
                                                back={this.state.HasSelected ? this.checkAnswer(1,0) ? this.checkAnswer(1,1) ? "green":"red":"#FFFDD0":"#FFFDD0"} 
                                                color={this.state.HasSelected ? this.checkAnswer(1,0) ? this.checkAnswer(1,1) ? "#FFFDD0":"#FFFDD0":"black":"black"} 
                                                value={this.state.Questions[this.state.SelectedQuestion].options[1].Name} />
                                    </TouchableOpacity>
                                </Animatable.View>
                              
                                <Animatable.View animation={this.state.HasSelected ? this.checkAnswer(2,0) ? this.checkAnswer(2,1) ? "pulse":"wobble":"":"bounceInLeft"} delay={300}>
                                    <TouchableOpacity 
                                        disabled={this.state.OptionsDisabled} 
                                        onPress={()=>this.onSelectOptions(this.state.Questions[this.state.SelectedQuestion],this.state.Questions[this.state.SelectedQuestion].options[2].Id)}> 
                                            <Options 
                                                back={this.state.HasSelected ? this.checkAnswer(2,0) ? this.checkAnswer(2,1)  ? "green":"red":"#FFFDD0":"#FFFDD0"} 
                                                color={this.state.HasSelected ? this.checkAnswer(2,0) ? this.checkAnswer(2,1) ? "#FFFDD0":"#FFFDD0":"black":"black"} 
                                                value={this.state.Questions[this.state.SelectedQuestion].options[2].Name} />
                                    </TouchableOpacity>
                                </Animatable.View>
                               
                                <Animatable.View animation={this.state.HasSelected ? this.checkAnswer(3,0) ? this.checkAnswer(3,1) ? "pulse":"wobble":"":"bounceInRight"} delay={400}>
                                    <TouchableOpacity 
                                        disabled={this.state.OptionsDisabled} 
                                        onPress={()=>this.onSelectOptions(this.state.Questions[this.state.SelectedQuestion],this.state.Questions[this.state.SelectedQuestion].options[3].Id)}>
                                            <Options 
                                                back={this.state.HasSelected ? this.checkAnswer(3,0) ? this.checkAnswer(3,1) ? "green":"red":"#FFFDD0":"#FFFDD0"} 
                                                color={this.state.HasSelected ? this.checkAnswer(3,0) ? this.checkAnswer(3,1)? "#FFFDD0":"#FFFDD0":"black":"black"} 
                                                value={this.state.Questions[this.state.SelectedQuestion].options[3].Name}/>
                                    </TouchableOpacity>
                                </Animatable.View>
                           
                            </View>:null}
                        </View>
                    </View>  

                    <Modal isVisible={this.state.Result.length > 0} animationType="slide" style={{width:'100%',margin:'auto'}}>
                        <CustomModal Heading="MPResult" Type="MPResult" Report={this.state.Result} changeModal={this.cangeModalType}/>
                    </Modal>

        
                    
                    </ScrollView>
                        <View style={style.Footer}>
                            <AdMobBanner
                            bannerSize="banner"
                            adUnitID="ca-app-pub-3341671606021251/1779235625" // Test ID, Replace with your-admob-unit-id ca-app-pub-7546310836693112/5169065739
                            onDidFailToReceiveAdWithError={(err)=>{}} />
                        </View>
                    
                <Modal isVisible={this.state.isLoading}>
                    <Loader Text={this.state.LoadingText}/>
                </Modal>  
            </AppContainer>
        )
    }
}
const style=StyleSheet.create({
    ProgressBarContainer:{
        width:150,
        height:18,
        marginVertical:10,
        flexDirection:'row'
    },
    ProgressInner:{
        width:120,
        height:19,
        marginTop:-22,
        marginLeft:3,
        marginBottom:2,
        borderRadius:10,
        overflow:'hidden'
    },
    ProgressbarStrip:{
        width:'83%',
        height:'100%',
        resizeMode:'stretch',
        overflow:'hidden'
    },
    AppContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    TimerBar:{
        height:50,
        width:'100%',
        backgroundColor:"#11233A",
        alignItems:'center'
    },
    EarnedCoinsContainer:{

    },
    TimerContainer:{
        top:5,
        backgroundColor:"#11233A",
        borderRadius:40
    },
    OptionsContainer:{
        width:'100%',
        marginTop:15,
        alignItems:'center',
        justifyContent:'center'
    },
    Options:{
        width:'100%',
        height:100
    },
    PicContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        height:Dimensions.get('window').height < 670 ? 170 : 215,
        marginVertical:10
    },
    Pic1:{
        height:'100%',
        width:Dimensions.get('window').height < 670 ? 185 : 185,
        borderRadius:10,
        overflow:'hidden',
        elevation:1
    },
    Pic2:{
        height:'90%',
        width:Dimensions.get('window').height < 670 ? 170 : 170,
        marginLeft:-155,
        borderRadius:10,
        overflow:'hidden',
        zIndex:-1,
        elevation:1
    },
    Pic3:{
        height:'80%',
        width:Dimensions.get('window').height < 670 ? 140 : 145,
        marginLeft:-135,
        borderRadius:10,
        overflow:'hidden',
        zIndex:-2,
        elevation:1
    },
    Pic:{
        height:'100%',
        width:200,
        resizeMode:'cover'
    },
    QuestionContainer:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        marginVertical:20
    },
    Question:{
        fontSize:15,   
    },
    Header:{
        flexDirection:'row',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'stretch',
        marginTop:20,
        marginBottom:30
    },
    Footer:
    {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'stretch',
        marginTop:10
    }
    
})

const mapStateToProps= state =>{
    return{
      Dashboard:state.Dashboard.Dashboard,
      SP:state.SP.GamePayload,
      SPQuestions:state.SP.Questions,
      MPQuestions:state.MP.Questions,
      MPUsers:state.MP.Users,
      AppStatus:state.MP.AppStatus
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onSetDashboard:(response)=>dispatch(setDashboard(response)),
        onSetMpUsers:(response)=>dispatch(setUsers(response)),
        onSetQuestions:(response)=>dispatch(setMPQuestions(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(GameScreenMP);

