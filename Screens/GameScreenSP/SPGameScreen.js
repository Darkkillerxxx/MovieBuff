import React from 'react'
import AppContainer from '../../Components/AppContainer'
import { StyleSheet,View,Text, Image,ScrollView,TouchableOpacity, ToastAndroid,Alert,Dimensions } from 'react-native'
import Modal from 'react-native-modal';
import NormalText from '../../Components/NormalText';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import BriefInfo2 from '../../Components/BriefInfo2';
import Options from '../../Components/Options'
import Levelup from '../../Components/Modals/LevelUp'
import CustomModal from '../../Components/Modals/Modal'
import { connect } from 'react-redux'
import {getResult,login} from '../../Utils/api'
import {setDashboard} from '../../Store/Actions/ActionDashboard'
import CustomButton from '../../Components/CustomButton'
import {UpdateUser} from '../../Database/Helper'
import * as Animatable from 'react-native-animatable';
import {
    AdMobBanner,setTestDeviceIDAsync,AdMobInterstitial
  } from 'expo-ads-admob';


  const ZoomAnimation={
    0: {
        scale: 1,
      },
      0.5: {
        scale: 2,
      },
      0.7: {
        scale: 3,
      },
      1: {
        scale: 1,
      },
  }
 
class SPGameScreen extends React.Component{
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
            ShowImageAnimation:false
        }
    }

    show=async()=>{
        await AdMobInterstitial.setAdUnitID('ca-app-pub-3341671606021251/5015224314');
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false});
    }

    showads=async()=>{
        await AdMobInterstitial.showAdAsync();
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

   

    Timer=()=>{
         setInterval(()=>{
             if(this.state.Timer > 0 && this.state.ImageLoaded)
             {
                this.setState({Timer:this.state.Timer-1},()=>{
                    this.calcTimerValue()
                    if(this.state.Timer === 0)
                    {
                       this.SkipQuestion()
                    }
                })
             }
            },1000)
    }

    fetchResult=()=>{
        let ShowInterstital=Math.random() * 10
        console.log("Show Ads",ShowInterstital)
        if(Math.floor(ShowInterstital) < 5)
        {
            this.showads()
        }
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
            this.show();

            console.log("Dimensions",this.state.Dimensions)
        
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
        this.setState({ShowImageAnimation:true})
        console.log("Id",id)
        this.setState({ImageLoaded:false})
        if(!this.state.HasSelected)
        {
            this.setState({HasSelected:true},()=>{

                this.setState({SelectedOptions:id})
                if(id === 4)
                {
                    this.setState({StartCoinAnimation:true})
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
                           this.setState({StartCoinAnimation:false})
                           this.setState({ShowImageAnimation:false})
                        },1000)
                    }
                    else
                    {
                        this.setState({Timer:0})
                        console.log(this.state.CorrectAns,this.state.AnsPayload)
                        this.setState({StartCoinAnimation:false})
                        this.setState({ShowImageAnimation:false})
                        this.fetchResult()
                    }
                })
            })
        }
       
    }

    componentWillUnmount()
    {
        this.setState({SelectedQuestion:this.state.Questions.length - 1},()=>{
            this.setState({Timer:0})
        })
     
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
                              
                                <View style={{width:"60%",alignItems:'center',borderRadius:10,padding:5}}>
                                    <Animatable.View animation={this.state.ShowZoomAnimation ? ZoomAnimation:""} onAnimationBegin={()=>this.setState({EarnedCoins:this.state.EarnedCoins + 10})} onAnimationEnd={()=>this.setState({ShowZoomAnimation:false})}>
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
                            {this.state.Questions.length > 0 ? 
                        
                            <View 
                                onLayout={event=>{
                                    const layout = event.nativeEvent.layout;
                                    console.log('height:', layout.height);
                                    console.log('width:', layout.width);
                                    console.log('x:', layout.x);
                                    console.log('y:', layout.y);
                                    this.setState({CoinDimension:layout.y},()=>{
                                        console.log(this.state.CoinDimension)
                                    })
                                    this.setState({DimensionsHeight:layout.height})
                                }} 
                                ref={view => {this.val =view}}>
                                <View style={{width:'100%',height:50,position:'absolute',alignItems:'flex-start',paddingHorizontal:17}}>
                                    
                                    {this.state.StartCoinAnimation ?
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
                                   </View>:null }
                                   
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
                    <Modal isVisible={this.state.ModalType === "Level" ?  true:false} animationType="slide" style={{width:'100%',margin:'auto'}}>
                        <Levelup changeModal={this.cangeModalType}/>
                    </Modal> 

                    <Modal isVisible={this.state.Result.length > 0 ?  true:false} animationType="slide" style={{width:'100%',margin:'auto'}}>
                        <CustomModal Heading="Result" Type="Result" TimeAloted={this.state.TimeAloted * this.state.Questions.length} Result={this.state.Result} CorrectAns={this.state.CorrectAns} Questions={this.state.Questions} changeModal={this.cangeModalType}/>
                    </Modal>
                    
                    </ScrollView>
                        <View style={style.Footer}>
                            <AdMobBanner
                            bannerSize="banner"
                            adUnitID="ca-app-pub-3341671606021251/1779235625" // Test ID, Replace with your-admob-unit-id ca-app-pub-7546310836693112/5169065739
                            onDidFailToReceiveAdWithError={(err)=>{console.log(err)}} />
                        </View>
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
        height:150,
        marginVertical:10
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
        width:170,
        marginLeft:-155,
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
        height:'110%',
        width:210,
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
        marginTop:10
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


 {/* <View style={{width:65,height:'100%',position:'absolute',alignItems:'center',justifyContent:'flex-start',zIndex:10}}>
                            <Image source={require('../../assets/Temp/User1.png')} style={{height:50,width:50,marginVertical:5}}></Image>
                            <Image source={require('../../assets/Temp/User2.png')} style={{height:50,width:50,marginVertical:5}}></Image>
                            <Image source={require('../../assets/Temp/User3.png')} style={{height:50,width:50,marginVertical:5}}></Image>
                            <Image source={require('../../assets/Temp/User4.png')} style={{height:50,width:50,marginVertical:5}}></Image>
                            <Image source={require('../../assets/Temp/User5.png')} style={{height:50,width:50,marginVertical:5}}></Image>
                            <Image source={require('../../assets/Temp/User6.png')} style={{height:50,width:50,marginVertical:5}}></Image>
                        </View> */}