import React from 'react'
import {View,Image, StyleSheet} from 'react-native'
import NormalText from './NormalText'

const BriefInfo=(props)=>{
return(
    <View style={{...styles.Brief,...props.style}}>
        <View style={styles.BriefPic}>
            <Image style={styles.Coins} source={props.Image}/>
        </View>
        <View style={styles.BriefNumbers}>
            <NormalText style={styles.NormalText}>{props.value}</NormalText>
        </View>
    </View>
    )

}

const styles=StyleSheet.create({
    Brief:{
        flexDirection:'row',
        width:'50%',
        height:25,
        marginRight:5,
        backgroundColor:"#11233A",
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