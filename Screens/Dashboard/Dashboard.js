import React from 'react'
import { View, StyleSheet,Image,Modal,TouchableOpacity } from 'react-native'
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
import {setGame} from '../../Store/Actions/ActionSp'

class Dashboard extends React.Component{
    constructor()
    {
        super();
        this.state={
            ShowModalSP:false,
            ShowModalMP:false,
            Dashboard:{},
            SPNoQuestions:5,
            SPRegion:[1]
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

    DismissSpModal=()=>{
        this.setState({ShowModalSP:false})
    }

    onProceedToCustom=()=>{
        let TempSp=this.props.SP;
        TempSp.Questions=this.state.SPNoQuestions;
        TempSp.Region=this.state.SPRegion;
        this.props.onSetGame(TempSp)
        this.props.navigation.navigate('CustomGame')
        this.setState({ShowModalSP:false})
    }

    componentDidMount()
    {
        // console.log("Dasbhoard Redux",this.props.Dashboard)
        // console.log("Dasbhoard Redux 2",this.props.SP)
        this.setState({Dashboard:this.props.Dashboard})
        
    }

    render()
    {
        return(
            <AppContainer style={styles.AppContainer}>
                <View style={styles.InfoContainer}>
                    <View style={styles.PicContainer}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Profile')}>
                            <View style={styles.ProfilePic}>
                                <Image style={{width:'100%',height:'100%'}} source={this.state.Dashboard.hasOwnProperty('img_url') ? {uri:this.state.Dashboard.img_url}:require('../../assets/Temp/User1.png')}></Image>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.BriefContainer}>
                        <View style={{width:'100%',flexDirection:'row',marginVertical:5}}>
                            <BriefInfo style={{width:'33.33%'}} Image={require('../../assets/Gold.png')} value={this.state.Dashboard.hasOwnProperty('gold') ? this.state.Dashboard.gold === null ? 0 :this.state.Dashboard.gold:""}/>
                            <BriefInfo style={{width:'33.33%'}} Image={require('../../assets/Silver.png')} value={this.state.Dashboard.hasOwnProperty('silver') ? this.state.Dashboard.silver === null ? 0 :this.state.Dashboard.silver:""}/>
                            <BriefInfo style={{width:'33.33%'}} Image={require('../../assets/Bronze.png')} value={this.state.Dashboard.hasOwnProperty('bronze') ? this.state.Dashboard.bronze === null ? 0 :this.state.Dashboard.bronze:""}/>
                        </View>
                        <View style={{width:'100%',flexDirection:'row'}}>
                            <BriefInfo style={{width:'33.33%'}} Image={require('../../assets/coins.png')} value={this.state.Dashboard.hasOwnProperty('u_coins') ? this.state.Dashboard.u_coins:""}/>
                            <BriefInfo style={{width:'33.33%'}} Image={require('../../assets/Crown.png')} value={this.state.Dashboard.hasOwnProperty('u_crowns') ? this.state.Dashboard.u_crowns:""}/>
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
                        <TouchableOpacity onPress={()=>this.setState({ShowModalMP:true})}>
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
                    <TouchableOpacity>
                        <SmallBtn color1="#052CB5" color2="#0077E9" color3="#00C0E4" color4="#00EEEF">
                            <Image style={styles.Podium} source={require('../../assets/wheel.png')}/>
                        </SmallBtn>
                    </TouchableOpacity>
                   </View>

                   <View style={styles.Tools}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('EarnCoins')}>
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
        onSetFB:(response)=>dispatch(setFB(response)),
        onSetLogin:(response)=>dispatch(setLogin(response)),
        onSetGame:(response)=>dispatch(setGame(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);