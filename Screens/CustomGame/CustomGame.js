import React from 'react'
import { View, StyleSheet,Image,FlatList } from 'react-native';
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

class CustomGame extends React.Component{
    constructor()
    {
        super();
        this.state={
            Region:[],
            RefreshFlatList:true,
            CustomSelection:true
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
            "noQ": this.props.SP.Questions,
            "user_id":this.props.Dashboard.Id
        }
       getQuestions(payload).then(result=>{
           if(result.IsSuccess)
           {
               this.props.onSetQuestions(result.Data)
               this.props.navigation.navigate('SPGameScreen')
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
        <View style={style.RegionCard}>
            <View style={{alignItems:'center',justifyContent:'center',marginTop:15}}>
                <View style={style.TiltImageContainer}>
                    <Image  source={{uri:itemData.item.Url1}} style={style.TiltImageLeft}/>
                    <Image  source={{uri:itemData.item.Url2}} style={style.TiltImageRight}/>
                </View>
                <View style={{position:'absolute'}}>
                <Checkbox
                status={itemData.item.Checked ? "checked":"unchecked"}
                onPress={()=>this.selectUnselectEra(itemData.item.id)}
                uncheckedColor="white"
                disabled={!this.state.CustomSelection}/>
                </View>
            </View>
            <NormalText style={style.NormalText}>{itemData.item.Name}</NormalText>
            <View style={style.ProgressBarContianer}>
                <Progress.Bar borderColor="#11233A" unfilledColor="#11233A" color="#59D654" progress={0.1} width={120}/>  
            </View>
        </View>
       )
    }

    render()
    {
        return(
            <AppContainer style={style.AppContainer}>
                <BoldText style={style.BoldText}>Select Era</BoldText>
                <View style={style.ChooseContainer}>
                    <TouchableOpacity onPress={()=>this.changeSelectionType(false)}>
                        <View style={!this.state.CustomSelection ? style.ChooseButtonsSelected:style.ChooseButtonsUnselected}>
                            <NormalText style={!this.state.CustomSelection ? style.ButtonsTextSelected:style.ButtonsTextUnselected}>Random Selection</NormalText>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.changeSelectionType(true)}>
                        <View style={this.state.CustomSelection ? style.ChooseButtonsSelected:style.ChooseButtonsUnselected}>
                            <NormalText style={this.state.CustomSelection ? style.ButtonsTextSelected:style.ButtonsTextUnselected}>Custom Selection</NormalText>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={style.RegionView}>
                    {this.state.Region.length > 0 ? 
                    <FlatList extraData={this.state.RefreshFlatList} data={this.state.Region} renderItem={this.RegionCard} numColumns={2}/>:null}
                </View>
                <View style={style.ProceedButtonContainer}>
                    <TouchableOpacity style={{width:'100%'}} onPress={()=>this.getQuestions()}>
                        <NextButton>
                            <NormalText style={style.NormalText}>Proceed</NormalText>
                        </NextButton>
                    </TouchableOpacity>
                </View>
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
    ChooseContainer:{
        width:"100%",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginVertical:5
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
        height:'75%',
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