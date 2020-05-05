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
            AnsPayload:[]
        }
    }

    cangeModalType=(type)=>{
        this.setState({ModalType:type})
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
                    if(this.state.Timer === 0 && this.state.SelectedQuestion + 1 < this.state.Questions.length)
                    {
                        console.log(this.state.SelectedQuestion,this.state.Questions.length)
                        this.setState({Timer:this.state.TimeAloted})
                        this.setState({SelectedQuestion:this.state.SelectedQuestion + 1})
                    }
                })
             }
            
            },1000)
    }

    componentDidMount=()=>{
        // console.log(this.props.SPQuestions)
       this.setState({Questions:this.props.SPQuestions})
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
                    console.log(this.state.CorrectAns,this.state.AnsPayload)
                }
            })
        })
       
       
    }


    render()
    {
        return(
        <ScrollView style={{height:'100%'}}>
            <AppContainer style={style.AppContainer}>

                    <View style={style.Header}>
                        <View style={{height:60,width:'100%',flexDirection:'row'}}>
                            <View style={{height:'100%',width:'50%',backgroundColor:'#11233A',alignItems:'center',justifyContent:'center',borderBottomRightRadius:25}}>
                                <NormalText style={{fontSize:24}}>Question {this.state.SelectedQuestion + 1} <NormalText>/ {this.state.Questions.length}</NormalText></NormalText>
                            </View> 
                            <View style={{height:'50%',width:'50%',backgroundColor:'#11233A',alignItems:'center',justifyContent:'center'}}>
                                <BriefInfo value={7200}></BriefInfo>
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
                                    <Image style={style.Pic} source={{uri:this.state.Questions[this.state.SelectedQuestion].Image}}></Image>:
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

                    <Modal visible={this.state.ModalType === "Result" ?  true:false} transparent={true} animationType="slide">
                        <Result changeModal={this.cangeModalType}/>
                    </Modal>
                   
                    
                    <View style={style.TimerBar}>
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
            </AppContainer>
            </ScrollView>
        )
    }
}

const style=StyleSheet.create({
    AppContainer:{
        justifyContent:'flex-end',
        alignItems:'center'
    },
    TimerBar:{
        height:45,
        width:'100%',
        backgroundColor:"#11233A",
        alignItems:'center'
    },
    TimerContainer:{
        marginTop:-20,
        backgroundColor:"#11233A",
        borderRadius:40
    },
    OptionsContainer:{
        width:'100%',
        marginVertical:15,
        // borderColor:'white',
        // borderWidth:1,
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
        marginBottom:10
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
        onSetGame:(response)=>dispatch(setGame(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SPGameScreen);