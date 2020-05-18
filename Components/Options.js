import React from 'react'
import { ImageBackground, StyleSheet,View } from 'react-native';
import NormalText from './NormalText';

const Options=(props)=>{

    return(
        <ImageBackground style={style.Options} source={require('../assets/opt.png')}>
               <View style={{width:235,height:55,backgroundColor:props.back,borderWidth:1,borderColor:'white',justifyContent:'center',alignItems:'center'}}>
                <NormalText style={{fontSize:18,color:props.color,textAlign:'center'}}>{props.value}</NormalText>
               </View>
               
        </ImageBackground>
    )
}

const style=StyleSheet.create({
    Options:{
        width:300,
        height:75,
        justifyContent:'center',
        alignItems:'center',
        resizeMode:'stretch',
        marginVertical:5
    },
})


export default Options;