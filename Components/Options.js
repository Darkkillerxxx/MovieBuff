import React from 'react'
import { ImageBackground, StyleSheet,View } from 'react-native';
import NormalText from './NormalText';

const Options=(props)=>{

    return(
        <ImageBackground style={style.Options} source={require('../assets/opt.png')}>
               <View style={{width:265,height:60,backgroundColor:props.back,borderWidth:1,borderColor:'white',justifyContent:'center',alignItems:'center'}}>
                <NormalText style={{fontSize:18,color:props.color}}>{props.value}</NormalText>
               </View>
               
        </ImageBackground>
    )
}

const style=StyleSheet.create({
    Options:{
        width:350,
        height:100,
        justifyContent:'center',
        alignItems:'center'
    },
})


export default Options;