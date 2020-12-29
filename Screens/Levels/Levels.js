import React from 'react';
import { StyleSheet,View,ImageBackground,Text,Image, ScrollView,TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'
import { LinearGradient } from 'expo-linear-gradient';
import NormalText from '../../Components/NormalText';
import {GetLevels,getQuestions} from '../../Utils/api'
import { connect } from 'react-redux'
import Loader from '../../Components/Modals/Loader'
import CustomModal from '../../Components/Modals/Modal'
import { setQuestions,setGame } from '../../Store/Actions/ActionSp';
import { FontAwesome } from '@expo/vector-icons'; 

class Levels extends React.Component{
    constructor(props) {
        super();
        this.state={
            isLoading: false,
            LevelData:[],
            ShowModalSP:false,
            SPNoQuestions:5,
            SPRegion:[],
            SelectedLevel:null
        };
    }

    componentDidMount() {
        this.setState({isLoading:true});
        this.GetLevelInfo(this.props.Dashboard.Id)
    }

    GetLevelInfo=(Id)=>{
        GetLevels(Id).then(result =>{
            if(result.IsSuccess)
            {
                this.setState({isLoading:false})
                this.setState({LevelData:result.Data[0].Progress},()=>{
                    // console.log(this.state.LevelData)
                })
            }
        })
    }

    DismissSPMPModal=()=>{
        this.setState({ShowModalSP:false})
    }

    setSPNoQuestions=(ques)=>{
        this.setState({SPNoQuestions:ques})
    }

    setSpRegion=(id)=>{
        // console.log(id)
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

    onProceedToCustom=()=>{
        let TempSp=this.props.SP;
        TempSp.Questions=this.state.SPNoQuestions;
        TempSp.Region=this.state.SPRegion;
        TempSp.SelectedLevel=this.state.SelectedLevel
        this.props.onSetGame(TempSp)
        if(this.props.Dashboard.Coins < this.state.SPNoQuestions * 2)
        {
            this.setState({ShowInsuffModal:true})
        }
        else
        {
            this.GetQuestions();
        }
        this.setState({ShowModalSP:false})
    }

    ShowModal=(Level)=>{
        this.setState({SelectedLevel:Level})
        this.setState({ShowModalSP:true})
    }



    GetQuestions=()=>{
            this.setState({isLoading:true})
            let payload={
                "Region": this.props.SP.Region,
                "noQ": this.props.SP.Questions.toString(),
                "Level":parseInt(this.state.SelectedLevel),
                "user_id":this.props.Dashboard.Id.toString()
            }
            // console.log(payload)
           getQuestions(payload).then(result=>{
               if(result.IsSuccess)
               {
                //    console.log(result)
                   this.props.onSetQuestions(result.Data)
                   setTimeout(()=>{
                        this.setState({isLoading:false},()=>{
                            this.props.navigation.navigate('SPGameScreen')
                        })
                   },1500)
                  
               }
           }) 
        
    }

    render()
    {

    let ShowLevels = this.state.LevelData.map(result=>{
        return(
            <View key={result.Level} style={{...styles.Modal1,...{height:!result.isUnlocked ? 205:185}}}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['#60B48D', '#55868B', '#3E2788',"#920D92"]} style={{...styles.Modal2,...{height:!result.isUnlocked ? 190:170}}}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={['#81CBB7', '#70AAB6', '#5E5DB4',"#4F1DB3","#8113B8","#B613BD"]} style={{...styles.Modal3,...{height:!result.isUnlocked ? 175:150}}}>
                            <ImageBackground resizeMode='contain' source={require('../../assets/ModalHead.png')} imageStyle={{width:'100%'}} style={styles.ModalHeader}>
                                <View style={{width:'100%',height:'60%',alignItems:'center',justifyContent:'center'}}>
                                    <NormalText style={{fontSize:18,color:'white'}}>Level {result.Level}</NormalText>            
                                </View>
                            </ImageBackground>
                            
                            <NormalText style={{fontSize:16,color:'white',marginTop:-20}}>{result.Difficulty}</NormalText>
                    
                            <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10,paddingHorizontal:10}}>
                                <View style={{width:'50%'}}>
                                    {/* <NormalText style={{fontSize:14,color:'white'}}>IMDB : 10 - 9</NormalText> */}
                                    <NormalText style={{fontSize:14,color:'white'}}>Era : {result.Era}</NormalText>
                                    
                                    <View style={{width:'100%'}}>
                                        <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',marginTop:15,paddingHorizontal:10}}>
                                            <NormalText style={{fontSize:14}}>Progress</NormalText>
                                            <NormalText style={{fontSize:14}}>{result.Progress_bar === undefined ? 0 :parseInt(result.Progress_bar)} %</NormalText>
                                        </View>
                                    <Image source={require('../../assets/progressOuter.png')} style={{width:'100%',height:25,borderWidth:1,resizeMode:'stretch',marginTop:5}}/>
                                        <View style={styles.ProgressInner}>
                                            <View style={styles.ProgressbarStrip}>
                                                <Image source={require('../../assets/ProgressInner.png')} style={{width:result.Progress_bar === undefined ? 0 : `${parseInt(result.Progress_bar)}%`,height:'100%',resizeMode:'stretch'}}></Image>
                                            </View>
                                        </View>
                                    </View>
                                
                                </View>
                                <View style={{width:'50%',alignItems:'flex-end',justifyContent:'center'}}>
                                    {result.isUnlocked &&  parseInt(result.Progress_bar) !== 100 ? 
                                    <TouchableOpacity onPress={()=>this.setState({ShowModalSP:true},()=>this.setState({SelectedLevel:result.Level}))}>
                                        <ImageBackground resizeMode="stretch" source={require('../../assets/Yellow.png')} style={{width:90,height:60,alignItems:'center',justifyContent:'center'}}>
                                            <NormalText style={{fontSize:18}}>Start</NormalText>
                                        </ImageBackground>
                                    </TouchableOpacity>:
                                    parseInt(result.Progress_bar) === 100 ? 
                                        <Image source={require('../../assets/chck.png')} style={{width:50,height:50}}></Image>
                                    :
                                    <View style={{width:'100%',alignItems:'center'}}>
                                        <FontAwesome name="lock" size={24} color="red" />
                                    </View>
                                    }
                                </View>
                            </View>
                            
                            {!result.isUnlocked ?
                                <View style={{flexDirection:'row',justifyContent:'space-between',flex:1,alignItems:'center'}}>
                                    <NormalText style={{color:'red',marginHorizontal:10}}> Remaining Coins : {result.Remaining_coins} </NormalText>
                                    <NormalText style={{color:'red',marginHorizontal:10}}> Remaining Questions : {result.Remaining_answers} </NormalText>
                                </View>:null}
                        </LinearGradient>
                    </LinearGradient>
            </View>
        )
    })

        return (               
                <ImageBackground source={require('../../assets/background.png')} style={styles.AppContainer}>
                    {!this.state.isLoading ?
                    <ScrollView style={{paddingVertical:25}}>
                        {ShowLevels}
                    </ScrollView>:
                        <Modal
                        isVisible={this.state.isLoading}>
                            <Loader Text={"Fetching Levels ..."}/>
                       </Modal>
                    }

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
                </ImageBackground>
             
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    AppContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      resizeMode:'cover'
    },
    Modal1:{
      borderRadius:15,
      width:'90%',
      alignItems:'center',
      alignSelf:'center',
      backgroundColor:'#FFD41F',
      paddingVertical:5,
      height:185,
      margin:20
    },
    Modal2:{
      borderRadius:15,
      width:'98%',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'white',
      alignSelf:'center',
      marginTop:2,
      paddingVertical:5,
      height:170
    },
    Modal3:{
        borderRadius:15,
        width:'97%',
        alignItems:'center',
        backgroundColor:'white',
        alignSelf:'center',
        height:150
    },
    ModalHeader:{
      width:'90%',
      height:80,
      marginTop:-40
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
        width:'95%',
        height:'100%',
        resizeMode:'stretch',
        overflow:'hidden'
    }
  });

  const mapStateToProps= state =>{
    return{
      Dashboard:state.Dashboard.Dashboard,
      SP:state.SP.GamePayload
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onSetFB:(response)=>dispatch(setFB(response)),
        onSetLogin:(response)=>dispatch(setLogin(response)),
        onSetGame:(response)=>dispatch(setGame(response)),
        onSetQuestions:(response)=>dispatch(setQuestions(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Levels);