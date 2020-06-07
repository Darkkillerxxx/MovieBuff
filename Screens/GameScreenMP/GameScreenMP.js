import React from 'react'
import AppContainer from '../../Components/AppContainer'
import { StyleSheet,View,Text, Image,ScrollView,TouchableOpacity, ToastAndroid,Alert,Dimensions,BackHandler } from 'react-native'
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
import Loader from '../../Components/Modals/Loader'
import { Audio } from 'expo-av';
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
        width:50,
        opacity:0
    },
    1:{
        width:250,
        opacity:1
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
            Questions:[
                {
                    "ImgUrl": "https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/tt1182937.jpg",
                    "Qid": "tt1182937",
                    "options": [
                        {
                            "Id": 1,
                            "Name": "Himmatwala"
                        },
                        {
                            "Id": 2,
                            "Name": "Magadheera"
                        },
                        {
                            "Id": 3,
                            "Name": "Chak de! India"
                        },
                        {
                            "Id": 4,
                            "Name": "Rab Ne Bana Di Jodi"
                        }
                    ]
                },
                {
                    "ImgUrl": "https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/tt4635372.jpg",
                    "Qid": "tt4635372",
                    "options": [
                        {
                            "Id": 1,
                            "Name": "Madaari"
                        },
                        {
                            "Id": 2,
                            "Name": "The Lunchbox"
                        },
                        {
                            "Id": 3,
                            "Name": "Pardes"
                        },
                        {
                            "Id": 4,
                            "Name": "Masaan"
                        }
                    ]
                },
                {
                    "ImgUrl": "https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/tt2621000.jpg",
                    "Qid": "tt2621000",
                    "options": [
                        {
                            "Id": 1,
                            "Name": "Iqbal"
                        },
                        {
                            "Id": 2,
                            "Name": "No One Killed Jessica"
                        },
                        {
                            "Id": 3,
                            "Name": "Dil To Pagal Hai"
                        },
                        {
                            "Id": 4,
                            "Name": "Jolly LLB"
                        }
                    ]
                },
                {
                    "ImgUrl": "https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/tt0169102.jpg",
                    "Qid": "tt0169102",
                    "options": [
                        {
                            "Id": 1,
                            "Name": "Kyaa Kool Hain Hum 3"
                        },
                        {
                            "Id": 2,
                            "Name": "Hera Pheri"
                        },
                        {
                            "Id": 3,
                            "Name": "Wake Up Sid"
                        },
                        {
                            "Id": 4,
                            "Name": "Lagaan: Once Upon a Time in India"
                        }
                    ]
                },
                {
                    "ImgUrl": "https://s3.ap-south-1.amazonaws.com/movie.buff.movieimages/tt0451919.jpg",
                    "Qid": "tt0451919",
                    "options": [
                        {
                            "Id": 1,
                            "Name": "Yuva"
                        },
                        {
                            "Id": 2,
                            "Name": "Dil Chahta Hai"
                        },
                        {
                            "Id": 3,
                            "Name": "Himmatwala"
                        },
                        {
                            "Id": 4,
                            "Name": "Socha Na Tha"
                        }
                    ]
                }
            ],
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
            TempAnimation:false
        }
        this.rightSound = new Audio.Sound();
        this.wrongSound = new Audio.Sound();
        this.coinsSound = new Audio.Sound();
    }
   

    componentDidMount()
    {
        setTimeout(()=>this.setState({TempAnimation:true}),
        3000)
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
                                        <Image source={require('../../assets/Temp/User1.png')} style={{height:50,width:50,marginVertical:5,marginLeft:10,alignSelf:'flex-start',zIndex:10}}></Image>
                                        <Animatable.View animation={this.state.TempAnimation ? IncreaseWidth:""} duration={2000} style={{backgroundColor:"#2E2247",opacity:0,width:50,height:50,marginTop:-55,alignItems:'center',justifyContent:'center',borderRadius:15}} >
                                            <View style={{alignItems:'center',width:'100%'}}>
                                                <View style={{backgroundColor:"#FFD764",flexDirection:'row',alignItems:'center',justifyContent:'center',width:'90%',padding:5,borderRadius:10}}>
                                                    <NormalText>Hetal</NormalText>
                                                    <View style={{marginLeft:15,flexDirection:'row'}}>
                                                        <Image source={require('../../assets/correct.png')} style={{width:20,height:20,marginRight:5}} />
                                                        <NormalText>
                                                            3/25
                                                        </NormalText>
                                                    </View>
                                                </View>
                                            </View>
                                        </Animatable.View>
                                        <Image source={require('../../assets/Temp/User1.png')} style={{height:50,width:50,marginVertical:5,marginLeft:10,alignSelf:'flex-start',zIndex:10}}></Image>
                                        <Animatable.View animation={""} duration={2000} style={{backgroundColor:"#2E2247",opacity:0,width:50,height:50,marginTop:-55,alignItems:'flex-start',justifyContent:'flex-start',borderRadius:15}} >
                                        
                                        </Animatable.View>
                                        <Image source={require('../../assets/Temp/User1.png')} style={{height:50,width:50,marginVertical:5,marginLeft:10,alignSelf:'flex-start',zIndex:10}}></Image>
                                        <Animatable.View animation={""} duration={2000} style={{backgroundColor:"#2E2247",opacity:0,width:50,height:50,marginTop:-55,alignItems:'flex-start',justifyContent:'flex-start',borderRadius:15}} >
                                        
                                        </Animatable.View>
                                        <Image source={require('../../assets/Temp/User1.png')} style={{height:50,width:50,marginVertical:5,marginLeft:10,alignSelf:'flex-start',zIndex:10}}></Image>
                                        <Animatable.View animation={""} duration={2000} style={{backgroundColor:"#2E2247",opacity:0,width:50,height:50,marginTop:-55,alignItems:'flex-start',justifyContent:'flex-start',borderRadius:15}} >
                                        
                                        </Animatable.View>
                                        <Image source={require('../../assets/Temp/User1.png')} style={{height:50,width:50,marginVertical:5,marginLeft:10,alignSelf:'flex-start',zIndex:10}}></Image>
                                        <Animatable.View animation={""} duration={2000} style={{backgroundColor:"#2E2247",opacity:0,width:50,height:50,marginTop:-55,alignItems:'flex-start',justifyContent:'flex-start',borderRadius:15}} >
                                        
                                        </Animatable.View>
                                        <Image source={require('../../assets/Temp/User1.png')} style={{height:50,width:50,marginVertical:5,marginLeft:10,alignSelf:'flex-start',zIndex:10}}></Image>
                                        <Animatable.View animation={""} duration={2000} style={{backgroundColor:"#2E2247",opacity:0,width:50,height:50,marginTop:-55,alignItems:'flex-start',justifyContent:'flex-start',borderRadius:15}} >
                                        
                                        </Animatable.View>
                                    </ScrollView>
                                    <View style={{width:'20%',alignItems:'center',alignSelf:'flex-start',backgroundColor:'#C8152E',borderRadius:10}}>
                                        <NormalText>6 Players</NormalText>
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
                    
                <Modal isVisible={this.state.isLoading}>
                    <Loader Text={"Fetching Results ..."}/>
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
        width:'100%',
        height:Dimensions.get('window').height < 670 ? 170 : 205,
        marginVertical:10
    },
    Pic1:{
        height:'100%',
        width:Dimensions.get('window').height < 670 ? 185 : 205,
        borderRadius:10,
        overflow:'hidden',
        elevation:1
    },
    Pic2:{
        height:'90%',
        width:Dimensions.get('window').height < 670 ? 170 : 190,
        marginLeft:-155,
        borderRadius:10,
        overflow:'hidden',
        zIndex:-1,
        elevation:1
    },
    Pic3:{
        height:'80%',
        width:Dimensions.get('window').height < 670 ? 140 : 160,
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

export default connect(mapStateToProps,mapDispatchToProps)(GameScreenMP);

