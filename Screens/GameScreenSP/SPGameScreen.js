import React from 'react'
import AppContainer from '../../Components/AppContainer'
import { StyleSheet,View,Text, Image,ScrollView,Modal } from 'react-native'
import NormalText from '../../Components/NormalText';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import BriefInfo from '../../Components/BriefInfo';
import Options from '../../Components/Options'
import Levelup from '../../Components/Modals/LevelUp'

class SPGameScreen extends React.Component{
    constructor()
    {
        super();
    }
    render()
    {
        return(
        <ScrollView style={{height:'100%'}}>
            <AppContainer style={style.AppContainer}>

                    <View style={style.Header}>
                        <View style={{height:60,width:'100%',flexDirection:'row'}}>
                            <View style={{height:'100%',width:'50%',backgroundColor:'#11233A',alignItems:'center',justifyContent:'center',borderBottomRightRadius:25}}>
                                <NormalText style={{fontSize:24}}>Question 1 <NormalText>/ 3</NormalText></NormalText>
                            </View> 
                            <View style={{height:'50%',width:'50%',backgroundColor:'#11233A',alignItems:'center',justifyContent:'center'}}>
                                <BriefInfo value={7200}></BriefInfo>
                            </View>
                        </View>
                    </View> 
                    <View style={{width:'100%',flexDirection:'row'}}>
                        <View style={{width:65,height:'100%',position:'absolute',alignItems:'center',justifyContent:'flex-start',zIndex:10}}>
                            <Image source={require('../../assets/Temp/User1.png')} style={{height:50,width:50,marginVertical:5}}></Image>
                            <Image source={require('../../assets/Temp/User2.png')} style={{height:50,width:50,marginVertical:5}}></Image>
                            <Image source={require('../../assets/Temp/User3.png')} style={{height:50,width:50,marginVertical:5}}></Image>
                            <Image source={require('../../assets/Temp/User4.png')} style={{height:50,width:50,marginVertical:5}}></Image>
                            <Image source={require('../../assets/Temp/User5.png')} style={{height:50,width:50,marginVertical:5}}></Image>
                            <Image source={require('../../assets/Temp/User6.png')} style={{height:50,width:50,marginVertical:5}}></Image>
                        </View>
                        <View>      
                            <View style={style.PicContainer}>
                                <Image style={style.Pic} source={require('../../assets/Temp/holly1.jpg')}></Image>
                            </View>

                            <View style={style.OptionsContainer}>
                                <Options back="white" color="black" value="Avengers Infinity War" />
                                <Options back="green" color="white" value="Avengers Endgame" />
                                <Options back="white" color="black" value="Avengers Age Of Ultron" />
                                <Options back="red" color="white" value="The Avengers" />
                            </View>
                        </View>
                    </View>  
                    <Modal visible={true} transparent={true} animationType="slide">
                        <Levelup/>
                    </Modal> 
                   
                    
                    <View style={style.TimerBar}>
                        <View style={style.TimerContainer}>
                            <AnimatedCircularProgress
                                size={50}
                                width={5}
                                fill={100}
                                tintColor="#00e0ff"
                                backgroundColor="#3d5875" >
                                {
                                    (fill) => (
                                    <NormalText>
                                        { 44 }
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
        alignItems:'center',

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
        // borderWidth:1
    },
    Options:{
        width:'100%',
        height:100
    },
    PicContainer:{
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        height:175,
       
    },
    Pic:{
        height:'100%',
        width:'40%',
        resizeMode:'stretch',
        borderRadius:25
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

 

export default SPGameScreen