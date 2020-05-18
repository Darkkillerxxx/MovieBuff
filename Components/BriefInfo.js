import React from 'react'
import {View,Image, StyleSheet} from 'react-native'
import NormalText from './NormalText'

const BriefInfo=(props)=>{
return(
        <View style={{...styles.Brief,...props.style}}>
            <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:5}}>
                <Image source={props.Image} style={{width:25,height:25}}/>
                <NormalText style={{fontSize:12,marginTop:3}}>{props.value}</NormalText>
            </View>
            <Image resizeMode="contain" source={require('../assets/Purple.png')} style={{width:'100%',height:30,resizeMode:'contain',zIndex:-1,marginTop:-25}}/>
        </View>
    )

}

const styles=StyleSheet.create({
    Brief:{
        width:'50%',
        height:25,
        marginRight:5,
        borderRadius:15
    },
    BriefPic:{
        width:'20%',
        alignItems:'center',
        justifyContent:'center'
    },
    Coins:{
        height:20,
        width:20
    },
    BriefNumbers:{
        width:'80%',
        alignItems:'center',
        justifyContent:'center'
    },
})


export default BriefInfo