import React from 'react'
import AppContainer from '../../Components/AppContainer'
import { StyleSheet,View,Text, Image,ScrollView,Modal, TouchableOpacity } from 'react-native'
import NormalText from '../../Components/NormalText';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import BriefInfo from '../../Components/BriefInfo';
import Options from '../../Components/Options'
import Levelup from '../../Components/Modals/LevelUp'
import Result from '../../Components/Modals/Result'
import { connect } from 'react-redux'
import {getResult,login} from '../../Utils/api'
import {setDashboard} from '../../Store/Actions/ActionDashboard'
import CustomButton from '../../Components/CustomButton'
import {
    AdMobBanner,setTestDeviceIDAsync
  } from 'expo-ads-admob';

 
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
            HasSelected:false,
            UserSelection:null,
            CorrectAns:0,
            AnsPayload:[],
            Result:[]
        }
    }

   

    cangeModalType=(type)=>{
        let SignInPayload={
            UserId:this.props.Dashboard.Id,
            ScreenName:"",
            FacebookId:this.props.Dashboard.FbId,
            Password:this.props.Dashboard.Password
         }

         login(SignInPayload).then(result=>{
            console.log(result) 
            if(result.IsSuccess)
             {
                this.props.onSetDashboard(result.Data[0])
                this.props.navigation.navigate('Dashboard')
             }
         })

    }

    calcTimerValue=()=>{
        let TimerValue=this.state.Timer/this.state.TimeAloted * 100
        this.setState({TimerValue:parseInt(TimerValue)})
    }

    Timer=()=>{
         setInterval(()=>{
             if(this.state.Timer > 0)
             {
                this.setState({Timer:this.state.Timer-1},()=>{
                    this.calcTimerValue()
                    if(this.state.Timer === 0)
                    {
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
                                    console.log(this.state.SelectedQuestion,this.state.Questions.length)
                                    this.setState({Timer:this.state.TimeAloted})
                                    this.setState({SelectedQuestion:this.state.SelectedQuestion + 1})
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
                })
             }
            
            },1000)
    }

    fetchResult=()=>{
        let payload={
            Report:this.state.AnsPayload,
            Ccount:this.state.CorrectAns,
            userId:this.props.Dashboard.Id.toString()
        }

        getResult(payload).then(result=>{
            console.log("Result",result)
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
    this.props.SPQuestions.forEach(element => {
            element.options = this.shuffle(element.options)
    });
     this.setState({Questions:this.props.SPQuestions},()=>{
         console.log("Questions",this.state.Questions)
     })
        this.Timer()
    }

    onSelectOptions=(options,id)=>{
        let TimeTaken=this.state.TimeAloted-this.state.Timer
        this.setState({Timer:this.state.TimeAloted})
        this.setState({HasSelected:true},()=>{
            if(id === 4)
            {
                this.setState({CorrectAns:this.state.CorrectAns+1})
            }
            let TempReport=this.state.AnsPayload;
            TempReport.push(
                {
                    QID:options.Qid,
                    isCorrect:id === 4,
                    time:TimeTaken.toString()
                })
            this.setState({AnsPayload:TempReport},()=>{
                console.log("Normal Payload",this.state.AnsPayload)
                if(this.state.SelectedQuestion+1 < this.state.Questions.length)
                {
                    setTimeout(()=>{
                        this.setState({SelectedQuestion:this.state.SelectedQuestion+1},()=>{
                            this.setState({HasSelected:false})
                        }) 
                    },2500)
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

    onSkipQuestion=()=>{

    }

    QuitGame=()=>{
        this.props.navigation.replace('Dashboard')
    }


    render()
    {
        return(
            <AppContainer style={style.AppContainer}>
                <ScrollView>
                    <View style={style.Header}>
                        <View style={{height:70,width:'100%',flexDirection:'row'}}>
                            <View style={{width:'25%',backgroundColor:'#11233A',justifyContent:'center',alignItems:'center'}}>
                                <TouchableOpacity onPress={()=>this.QuitGame()}>
                                    <Image source={require('../../assets/quit.png')} style={{width:35,height:35}}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{height:'100%',width:'50%',backgroundColor:'#11233A',alignItems:'center',justifyContent:'center',paddingTop:20}}>
                                <NormalText style={{fontSize:22}}>Question {this.state.SelectedQuestion + 1} <NormalText>/ {this.state.Questions.length}</NormalText></NormalText>
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
                            <View style={{width:'25%',backgroundColor:'#11233A'}}>
                                <TouchableOpacity>
                                    <CustomButton LeftIcon={null} RightIcon={"fast-forward"}><NormalText>Skip</NormalText></CustomButton>
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
                                    <Image style={style.Pic} source={{uri:this.state.Questions[this.state.SelectedQuestion].ImgUrl}}></Image>:
                                    null
                                }
                             
                            </View>
                            {this.state.Questions.length > 0 ? 
                        
                            <View style={style.OptionsContainer}>
                                <TouchableOpacity onPress={()=>this.onSelectOptions(this.state.Questions[this.state.SelectedQuestion],this.state.Questions[this.state.SelectedQuestion].options[0].Id)}>
                                    <Options back={this.state.HasSelected ? this.state.Questions[this.state.SelectedQuestion].options[0].Id === 4 ? "green":"red":"white"} color={this.state.HasSelected ? "white":"black"} value={this.state.Questions[this.state.SelectedQuestion].options[0].Name} />
                                </TouchableOpacity>
                                
                                <TouchableOpacity onPress={()=>this.onSelectOptions(this.state.Questions[this.state.SelectedQuestion],this.state.Questions[this.state.SelectedQuestion].options[1].Id)}>
                                    <Options back={this.state.HasSelected ? this.state.Questions[this.state.SelectedQuestion].options[1].Id === 4 ? "green":"red":"white"} color={this.state.HasSelected ? "white":"black"} value={this.state.Questions[this.state.SelectedQuestion].options[1].Name} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>this.onSelectOptions(this.state.Questions[this.state.SelectedQuestion],this.state.Questions[this.state.SelectedQuestion].options[2].Id)}> 
                                    <Options back={this.state.HasSelected ? this.state.Questions[this.state.SelectedQuestion].options[2].Id === 4 ? "green":"red":"white"} color={this.state.HasSelected ? "white":"black"} value={this.state.Questions[this.state.SelectedQuestion].options[2].Name} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>this.onSelectOptions(this.state.Questions[this.state.SelectedQuestion],this.state.Questions[this.state.SelectedQuestion].options[3].Id)}>
                                    <Options back={this.state.HasSelected ? this.state.Questions[this.state.SelectedQuestion].options[3].Id === 4 ? "green":"red":"white"} color={this.state.HasSelected ? "white":"black"} value={this.state.Questions[this.state.SelectedQuestion].options[3].Name}/>
                                </TouchableOpacity>
                            </View>:null}
                        </View>
                    </View>  
                    <Modal visible={this.state.ModalType === "Level" ?  true:false} transparent={true} animationType="slide">
                        <Levelup changeModal={this.cangeModalType}/>
                    </Modal> 

                    <Modal visible={this.state.Result.length > 0 ?  true:false} transparent={true} animationType="slide">
                        <Result TimeAloted={this.state.TimeAloted} Result={this.state.Result} CorrectAns={this.state.CorrectAns} Questions={this.state.Questions} changeModal={this.cangeModalType}/>
                    </Modal>
                    <View style={style.Footer}>
                        <AdMobBanner
                        bannerSize="banner"
                        adUnitID="ca-app-pub-7546310836693112/5169065739" // Test ID, Replace with your-admob-unit-id
                        onDidFailToReceiveAdWithError={(err)=>{console.log(err)}} />
                   </View>
                    </ScrollView>
                
                    
                    {/* <View style={style.TimerBar}>
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
                    </View> */}
                    
            </AppContainer>
           
        )
    }
}

const style=StyleSheet.create({
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
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        height:150
    },
    Pic:{
        height:'100%',
        width:200,
        resizeMode:'contain',
        borderRadius:2
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
        borderColor:'white',
        borderWidth:1,
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