import React from 'react'
import { View, StyleSheet,Image,FlatList,ToastAndroid,ImageBackground } from 'react-native';
import Modal from 'react-native-modal'
import AppContainer from '../../Components/AppContainer';
import BoldText from '../../Components/BoldText';
import {Checkbox} from 'react-native-paper'
import NormalText from '../../Components/NormalText';
import * as Progress from 'react-native-progress';
import NextButton from '../../Components/NextButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import {BollyWood,HollyWood,Mixed,getQuestions} from '../../Utils/api'
import { setQuestions } from '../../Store/Actions/ActionSp';
import SinglePlayer from '../../Components/SinglePlayerBtn'
import Loader from '../../Components/Modals/Loader'

class CustomGame extends React.Component{
    constructor()
    {
        super();
        this.state={
            Region:[],
            RefreshFlatList:true,
            CustomSelection:true,
            isLoading:false
        }
    }

    componentDidMount(){
        console.log("SP Redux 2",this.props.SP)
        if(this.props.SP.Region.includes(1) && this.props.SP.Region.includes(2))
        {
            this.setState({Region:Mixed})
        }
        else if(this.props.SP.Region.includes(1))
        {
            this.setState({Region:HollyWood})
        }
        else
        {
            this.setState({Region:BollyWood})
        }
    }


    getQuestions=()=>{
        this.setState({isLoading:true})
        let SelectedRegions=[]
        this.state.Region.forEach(element => {
                if(element.Checked)
                {
                    SelectedRegions.push(element.id)
                }
        });
        let payload={
            isRandom: !this.state.CustomSelection,
            Region: this.props.SP.Region,
            "Era": this.state.CustomSelection ? SelectedRegions:[],
            "noQ": this.props.SP.Questions.toString(),
            "user_id":this.props.Dashboard.Id.toString()
        }
       getQuestions(payload).then(result=>{
           if(result.IsSuccess)
           {
               this.props.onSetQuestions(result.Data)
               setTimeout(()=>{
                    this.setState({isLoading:false},()=>{
                        this.props.navigation.navigate('SPGameScreen')
                    })
               },1500)
              
           }
           else
           {
              
           }
       })
    }
    
    selectUnselectEra=(id)=>{
        let TempEra=this.state.Region;
        TempEra[id-1].Checked=!TempEra[id-1].Checked
        this.setState({Region:TempEra},()=>{
            this.setState({RefreshFlatList:!this.state.RefreshFlatList})
        })
    }
    
    changeSelectionType=(bool)=>{
        this.setState({CustomSelection:bool})
    }

    RegionCard=(itemData)=>{
       return(
        <View style={{...style.ModalButton,...{width:'50%',height:150}}}>
            <ImageBackground style={style.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                <View style={style.TiltImageContainer}>
                    <Image  source={{uri:itemData.item.Url1}} style={style.TiltImageLeft}/>
                    <Image  source={{uri:itemData.item.Url2}} style={style.TiltImageRight}/>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Checkbox
                status={itemData.item.Checked ? "checked":"unchecked"}
                onPress={()=>this.selectUnselectEra(itemData.item.id)}
                uncheckedColor="white"
                disabled={!this.state.CustomSelection}/>
                <NormalText style={style.NormalText}>{itemData.item.Name}</NormalText>
                </View>
                
            </ImageBackground>
           
            {/* <View style={style.ProgressBarContianer}>
                <Progress.Bar borderColor="#11233A" unfilledColor="#11233A" color="#59D654" progress={0.1} width={120}/>  
            </View> */}
        </View>
       )
    }


    render()
    {
        return(
            <AppContainer style={style.AppContainer}>
                <BoldText style={style.BoldText}>Select Era</BoldText>
                <View style={style.ChooseContainer}>
                    <View  style={{width:'50%'}}>
                        <TouchableOpacity style={{width:'100%'}} onPress={()=>this.changeSelectionType(false)}>
                            <View style={{...style.ModalButton,...{borderColor:`${!this.state.CustomSelection ? "#FED31F":"#4B0E88"}`}}}>
                                <ImageBackground style={style.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                    <NormalText style={{fontSize:18}}>Random Selection</NormalText>
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View  style={{width:'50%'}}>
                        <TouchableOpacity style={{width:'100%'}} onPress={()=>this.changeSelectionType(true)}>
                            <View style={{...style.ModalButton,...{borderColor:`${this.state.CustomSelection ? "#FED31F":"#4B0E88"}`}}}>
                                <ImageBackground style={style.ModalButtonImage} imageStyle={{borderRadius:10}} source={require('../../assets/ModalButton.png')}>
                                    <NormalText style={{fontSize:18}}>Custom Selection</NormalText>
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={style.RegionView}>
                    {this.state.Region.length > 0 ? 
                    <FlatList extraData={this.state.RefreshFlatList} data={this.state.Region} renderItem={this.RegionCard} numColumns={2}/>:null}
                </View>
                        <View style={{width:'100%',alignItems:'center'}}>
                        <TouchableOpacity style={{width:200,height:100}} onPress={()=>this.getQuestions()}>
                            <View style={{width:'100%',flex:1,borderColor:'white',alignItems:'center',justifyContent:'center'}}>
                                <SinglePlayer style={{width:125,height:70,alignItems:'center'}} icon={"arrow-right"}  iconSize={20}>
                                    <NormalText style={{fontSize:20}}>Proceed</NormalText>
                                </SinglePlayer>
                            </View>
                        </TouchableOpacity>

                        </View>
                    
                <Modal isVisible={this.state.isLoading}>
                    <Loader Text={"Starting Quiz ..."}/>
                </Modal>  
               
            </AppContainer>
        )
    }
}


const style=StyleSheet.create({
    AppContainer:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
        padding:20
    },
    ModalButtonImage:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    ModalButton:{
        width:'100%',
        height:50,
        borderColor:'#4B0E88',
        borderWidth:4,
        marginVertical:5,
        borderRadius:15,
        backgroundColor:"#FED31F",
        padding:2
    },
    ChooseContainer:{
        width:"100%",
        flexDirection:'row',
        // alignItems:'center',
        // justifyContent:'center',
        marginVertical:5,
        height:50
    },
    ChooseButtonsSelected:{
        padding:10,
        borderWidth:1,
        borderColor:'#00C0E4',
        borderRadius:5,
        marginHorizontal:5,
        backgroundColor:"#00C0E4"
    },
    ChooseButtonsUnselected:{
        padding:10,
        borderWidth:1,
        borderColor:'#00C0E4',
        borderRadius:5,
        marginHorizontal:5
    },
    ButtonsTextSelected:{
        color:"white"
    },
    ButtonsTextUnselected:{
        color:"#00C0E4"
    },
    ProceedButtonContainer:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    ProgressBarContianer:{
        marginBottom:10,
    },
    BoldText:{
        fontSize:22
    },
    NormalText:{
        fontSize:18,
        marginVertical:10
    },
    RegionView:{
        width:'100%',
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        marginTop:15,
        height:'70%',
        overflow:'hidden'
    },
    RegionCard:{
        width:'45%',
        backgroundColor:"#203756",
        alignItems:'center',
        justifyContent:'center',
        borderRadius:25,
        elevation:5,
        marginVertical:10,
        marginHorizontal:10
    },
    TiltImageRight:{
        width:50,
        height:80,
        transform:[{rotate:'25deg'}],
        borderRadius:10
    },
    TiltImageLeft:{
        width:50,
        height:80,
        transform:[{rotate:'-25deg'}],
        borderRadius:10
    },
    TiltImageContainer:{
        flexDirection:'row'
    },
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
        onSetGame:(response)=>dispatch(setGame(response)),
        onSetQuestions:(response)=>dispatch(setQuestions(response))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomGame);