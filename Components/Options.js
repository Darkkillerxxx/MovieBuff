import React from 'react'
import { ImageBackground, StyleSheet,View } from 'react-native';
import NormalText from './NormalText';

const Options=(props)=>{

    return(
        <ImageBackground resizeMode='contain' style={style.Options} source={require('../assets/opt2.png')}>
               <View style={{width:'82%',height:40,backgroundColor:props.back,borderWidth:1,borderColor:'white',justifyContent:'center',alignItems:'center',borderRadius:7,zIndex:0}}>
                <NormalText style={{fontSize:17,color:props.color,textAlign:'center',fontFamily:'Budmo'}}>{props.value}</NormalText>
               </View>   
        </ImageBackground>
    )
}

const style=StyleSheet.create({
    Options:{
        width:300,
        height:60,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:5,
        zIndex:2
    },
})


export default Options;