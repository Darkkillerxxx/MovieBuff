import React from 'react'
import AppContainer from '../../Components/AppContainer'
import { StyleSheet,View,Text, Image,ScrollView,Modal, TouchableOpacity, ToastAndroid,Alert } from 'react-native'
import NormalText from '../../Components/NormalText';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import BriefInfo2 from '../../Components/BriefInfo2';
import Options from '../../Components/Options'
import Levelup from '../../Components/Modals/LevelUp'
import Result from '../../Components/Modals/Result'
import CustomModal from '../../Components/Modals/Modal'
import { connect } from 'react-redux'
import {getResult,login} from '../../Utils/api'
import {setDashboard} from '../../Store/Actions/ActionDashboard'
import CustomButton from '../../Components/CustomButton'
import {UpdateUser} from '../../Database/Helper'

import {
    AdMobBanner,setTestDeviceIDAsync,AdMobInterstitial
  } from 'expo-ads-admob';

 
class SPGameScreen extends React.Component{
    constructor()
    {
        super();
        this.state={
            ModalType:"",
            Timer:20,
            TimeAloted:20,
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
            EarnedCoins:0
        }
    }

    cangeModalType=(type)=>{
        let SignInPayload={
            UserId:this.props.Dashboard.FbId.length > 0 ? "":this.props.Dashboard.Id,
            ScreenName:"",
            FacebookId:this.props.Dashboard.FbId,
            Password:this.props.Dashboard.Password
         }

         console.log("Login Payload",SignInPayload)

         login(SignInPayload).then(result=>{
            console.log(result) 
            if(result.IsSuccess)
             {
                 let TempDashboard=result.Data[0]
                 TempDashboard.FbId=this.props.Dashboard.FbId
                 TempDashboard.Password=this.props.Dashboard.Password
                 TempDashboard.ScreenName=this.props.Dashboard.ScreenName
                 UpdateUser(JSON.stringify(TempDashboard)).then(result=>{
                    console.log("Update",result)
                 }).catch(err=>{
                     ToastAndroid.show("Failed To Update Database",ToastAndroid.SHORT)
                 })
                this.props.onSetDashboard(TempDashboard)
                this.props.navigation.navigate('Dashboard')
             }
         })

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
                console.log("Timer Payload",this.state.AnsPayload)
                if(this.state.SelectedQuestion + 1 < this.state.Questions.length)
                {
                   this.MoveToNextQuestion()
                }
                else
                {
                    this.fetchResult()
                }
            })
        }
        else
        {
            this.fetchResult()
            console.log(this.state.CorrectAns,this.state.AnsPayload) 
        }
    }

    // show=async()=>{
    //     await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');
    //     await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false});
    // }

    // showads=async()=>{
    //     await AdMobInterstitial.showAdAsync();
    // }

    Timer=()=>{
        //  setInterval(()=>{
        //      if(this.state.Timer > 0 && this.state.ImageLoaded)
        //      {
        //         this.setState({Timer:this.state.Timer-1},()=>{
        //             this.calcTimerValue()
        //             if(this.state.Timer === 0)
        //             {
        //                this.SkipQuestion()
        //             }
        //         })
        //      }
        //     },1000)
    }

    fetchResult=()=>{
        // this.showads()
        let payload={
            Report:this.state.AnsPayload,
            Ccount:this.state.CorrectAns,
            userId:this.props.Dashboard.Id.toString()
        }

        getResult(payload).then(result=>{
            console.log("Result",result)
            ToastAndroid.show(`Result ${result.IsSuccess}`,ToastAndroid.LONG)
            if(result.IsSuccess)
            {
                console.log(result.Data)
                this.setState({Result:result.Data})
            }
        })
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

    componentDidMount=()=>{
        console.log("Dashboard",this.props.Dashboard)
    this.props.SPQuestions.forEach(element => {
            element.options = this.shuffle(element.options)
    });
     this.setState({Questions:this.props.SPQuestions},()=>{
         console.log("Questions",this.state.Questions)
     })
        this.Timer()
        // this.show();
       
    }

    MoveToNextQuestion=()=>{
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
    }

    onSelectOptions=(options,id)=>{
        let TimeTaken=this.state.TimeAloted-this.state.Timer
        console.log("Id",id)
        this.setState({ImageLoaded:false})
        if(!this.state.HasSelected)
        {
            this.setState({HasSelected:true},()=>{

                this.setState({SelectedOptions:id})
                if(id === 4)
                {
                    this,this.setState({EarnedCoins:this.state.EarnedCoins + 10})
                    this.setState({CorrectAns:this.state.CorrectAns+1})
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
                    console.log("Normal Payload",this.state.AnsPayload)
                    if(this.state.SelectedQuestion+1 < this.state.Questions.length)
                    {
                        setTimeout(()=>{
                           this.MoveToNextQuestion()
                        },1000)
                    }
                    else
                    {
                        this.setState({Timer:0})
                        console.log(this.state.CorrectAns,this.state.AnsPayload)
                        this.fetchResult()
                    }
                })
            })
        }
       
    }

   

    QuitGame=()=>{
        Alert.alert(
            'Quit',
            'Are You Sure You Want To Quit ???',
           [ {
                text: 'Yes',
                onPress: () => this.cangeModalType(null)
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
            <AppContainer style={style.AppContainer}>
                <ScrollView>
                    <View style={style.Header}>
                        <View style={{height:70,width:'100%',flexDirection:'row'}}>
                            <View style={{width:'25%',backgroundColor:'#11233A',justifyContent:'center',alignItems:'center'}}>
                                <BriefInfo2 style={{width:'90%',borderColor:'#E5BE1C',borderWidth:1}} Image={require('../../assets/coins.png')} value={this.state.EarnedCoins}/>
                            </View>
                            <View style={{height:'100%',width:'50%',backgroundColor:'#11233A',alignItems:'center',justifyContent:'center',paddingTop:20}}>
                                {/* <NormalText style={{fontSize:22}}>Question {this.state.SelectedQuestion + 1} <NormalText>/ {this.state.Questions.length}</NormalText></NormalText> */}
                                <View style={style.ProgressBarContainer}>
                                    <NormalText style={{...{marginRight:5,marginTop:4},...{fontFamily:'Roboto-bold',fontSize:15,color:'#E15158'}}}>{this.state.SelectedQuestion+1}</NormalText>
                                    <View>
                                        <Image source={require('../../assets/progressOuter.png')} style={{width:'100%',height:25,resizeMode:'stretch'}}/>
                                        <View style={style.ProgressInner}>
                                            <View style={style.ProgressbarStrip}>
                                                <Image source={require('../../assets/ProgressInner.png')} style={{width:`${((this.state.SelectedQuestion+1) / this.state.Questions.length) *100}%`,height:'100%',resizeMode:'stretch'}}></Image>
                                            </View>
                                        </View>
                                    </View>
                                    <NormalText style={{...{marginLeft:5,marginTop:4},...{fontFamily:'Roboto-bold',fontSize:15,color:'#E15158'}}}>{this.state.Questions.length}</NormalText>
                                </View>
                                <View style={style.TimerContainer}>
                                    <AnimatedCircularProgress
                                        size={50}
                                        width={5}
                                        fill={this.state.TimerValue}
                                        tintColor="#00e0ff"
                                        backgroundColor="#3d5875" >
                                        {
                                            (fill) => (
                                            <NormalText>
                                                { this.state.Timer }
                                            </NormalText>
                                            )
                                        }
                                    </AnimatedCircularProgress>
                                </View>
                            </View> 
                            <View style={{width:'25%',backgroundColor:'#11233A',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                                {/* <TouchableOpacity onPress={()=>this.SkipQuestion()}>
                                    <CustomButton LeftIcon={null} RightIcon={"fast-forward"}><NormalText>Skip</NormalText></CustomButton>
                                </TouchableOpacity> */}
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
                        {/* <View style={{width:65,height:'100%',position:'absolute',alignItems:'center',justifyContent:'flex-start',zIndex:10}}>
                            <Image source={require('../../assets/Temp/User1.png')} style={{height:50,width:50,marginVertical:5}}></Image>
                            <Image source={require('../../assets/Temp/User2.png')} style={{height:50,width:50,marginVertical:5}}></Image>
                            <Image source={require('../../assets/Temp/User3.png')} style={{height:50,width:50,marginVertical:5}}></Image>
                            <Image source={require('../../assets/Temp/User4.png')} style={{height:50,width:50,marginVertical:5}}></Image>
                            <Image source={require('../../assets/Temp/User5.png')} style={{height:50,width:50,marginVertical:5}}></Image>
                            <Image source={require('../../assets/Temp/User6.png')} style={{height:50,width:50,marginVertical:5}}></Image>
                        </View> */}
                        <View style={{width:'100%',alignItems:'center'}}>      
                            <View style={style.PicContainer}>
                                {
                                    this.state.Questions.length > 0 ?
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                        <View style={style.Pic1}>
                                            <Image style={style.Pic} source={{uri:this.state.Questions[this.state.SelectedImage].ImgUrl}} onLoad={()=>this.setState({ImageLoaded:true})}></Image>
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
                            {this.state.Questions.length > 0 ? 
                        
                            <View style={style.OptionsContainer}>
                                <TouchableOpacity disabled={this.state.OptionsDisabled} onPress={()=>this.onSelectOptions(this.state.Questions[this.state.SelectedQuestion],this.state.Questions[this.state.SelectedQuestion].options[0].Id)}>
                                    <Options back={this.state.HasSelected ? this.state.SelectedOptions === this.state.Questions[this.state.SelectedQuestion].options[0].Id ? this.state.Questions[this.state.SelectedQuestion].options[0].Id === 4 ? "green":"red":"#FFFDD0":"#FFFDD0"} color={this.state.HasSelected ? this.state.SelectedOptions === this.state.Questions[this.state.SelectedQuestion].options[0].Id ? this.state.Questions[this.state.SelectedQuestion].options[0].Id === 4 ? "#FFFDD0":"#FFFDD0":"black":"black"} value={this.state.Questions[this.state.SelectedQuestion].options[0].Name} />
                                </TouchableOpacity>
                                
                                <TouchableOpacity disabled={this.state.OptionsDisabled} onPress={()=>this.onSelectOptions(this.state.Questions[this.state.SelectedQuestion],this.state.Questions[this.state.SelectedQuestion].options[1].Id)}>
                                    <Options back={this.state.HasSelected ? this.state.SelectedOptions === this.state.Questions[this.state.SelectedQuestion].options[1].Id ? this.state.Questions[this.state.SelectedQuestion].options[1].Id === 4 ? "green":"red":"#FFFDD0":"#FFFDD0"} color={this.state.HasSelected ? this.state.SelectedOptions === this.state.Questions[this.state.SelectedQuestion].options[1].Id ? this.state.Questions[this.state.SelectedQuestion].options[1].Id === 4 ? "#FFFDD0":"#FFFDD0":"black":"black"} value={this.state.Questions[this.state.SelectedQuestion].options[1].Name} />
                                </TouchableOpacity>

                                <TouchableOpacity disabled={this.state.OptionsDisabled} onPress={()=>this.onSelectOptions(this.state.Questions[this.state.SelectedQuestion],this.state.Questions[this.state.SelectedQuestion].options[2].Id)}> 
                                    <Options back={this.state.HasSelected ? this.state.SelectedOptions === this.state.Questions[this.state.SelectedQuestion].options[2].Id ? this.state.Questions[this.state.SelectedQuestion].options[2].Id === 4 ? "green":"red":"#FFFDD0":"#FFFDD0"} color={this.state.HasSelected ? this.state.SelectedOptions === this.state.Questions[this.state.SelectedQuestion].options[2].Id ? this.state.Questions[this.state.SelectedQuestion].options[2].Id === 4 ? "#FFFDD0":"#FFFDD0":"black":"black"} value={this.state.Questions[this.state.SelectedQuestion].options[2].Name} />
                                </TouchableOpacity>

                                <TouchableOpacity disabled={this.state.OptionsDisabled} onPress={()=>this.onSelectOptions(this.state.Questions[this.state.SelectedQuestion],this.state.Questions[this.state.SelectedQuestion].options[3].Id)}>
                                    <Options back={this.state.HasSelected ? this.state.SelectedOptions === this.state.Questions[this.state.SelectedQuestion].options[3].Id ? this.state.Questions[this.state.SelectedQuestion].options[3].Id === 4 ? "green":"red":"#FFFDD0":"#FFFDD0"} color={this.state.HasSelected ? this.state.SelectedOptions === this.state.Questions[this.state.SelectedQuestion].options[3].Id ? this.state.Questions[this.state.SelectedQuestion].options[3].Id === 4 ? "#FFFDD0":"#FFFDD0":"black":"black"} value={this.state.Questions[this.state.SelectedQuestion].options[3].Name}/>
                                </TouchableOpacity>
                            </View>:null}
                        </View>
                    </View>  
                    <Modal visible={this.state.ModalType === "Level" ?  true:false} transparent={true} animationType="slide">
                        <Levelup changeModal={this.cangeModalType}/>
                    </Modal> 

                    <Modal visible={this.state.Result.length > 0 ?  true:false} transparent={true} animationType="slide">
                        <CustomModal Heading="Result" Type="Result" TimeAloted={this.state.TimeAloted * this.state.Questions.length} Result={this.state.Result} CorrectAns={this.state.CorrectAns} Questions={this.state.Questions} changeModal={this.cangeModalType}/>
                    </Modal>
                    {/* <View style={style.Footer}>
                        <AdMobBanner
                        bannerSize="banner"
                        adUnitID="ca-app-pub-3341671606021251/1779235625" // Test ID, Replace with your-admob-unit-id ca-app-pub-7546310836693112/5169065739
                        onDidFailToReceiveAdWithError={(err)=>{console.log(err)}} />
                   </View> */}
                    </ScrollView>
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
        justifyContent:'flex-end',
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
        alignItems:'center'
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
        height:150
    },
    Pic1:{
        height:'100%',
        width:175,
        borderRadius:10,
        overflow:'hidden',
        elevation:1
    },
    Pic2:{
        height:'90%',
        width:150,
        marginLeft:-135,
        borderRadius:10,
        overflow:'hidden',
        zIndex:-1,
        elevation:1
    },
    Pic3:{
        height:'80%',
        width:150,
        marginLeft:-135,
        borderRadius:10,
        overflow:'hidden',
        zIndex:-2,
        elevation:1
    },
    Pic:{
        height:'100%',
        width:200,
        resizeMode:'stretch'
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
        marginTop:10,
        height:50
    }
    
})

const mapStateToProps= state =>{
    return{
      Dashboard:state.Dashboard.Dashboard,
      SP:state.SP.GamePayload,
      SPQuestions:state.SP.Questions
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

export default connect(mapStateToProps,mapDispatchToProps)(SPGameScreen);