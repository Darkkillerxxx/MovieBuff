import React from 'react'
import { ImageBackground, StyleSheet,View } from 'react-native';
import NormalText from './NormalText';

const Options=(props)=>{

    return(
        <ImageBackground style={style.Options} source={require('../assets/opt.png')}>
               <View style={{width:210,height:50,backgroundColor:props.back,borderWidth:1,borderColor:'white',justifyContent:'center',alignItems:'center'}}>
                <NormalText style={{fontSize:15,color:props.color}}>{props.value}</NormalText>
               </View>
               
        </ImageBackground>
    )
}

const style=StyleSheet.create({
    Options:{
        width:280,
        height:70,
        justifyContent:'center',
        alignItems:'center',
        resizeMode:'stretch',
        marginVertical:5
    },
})


export default Options;