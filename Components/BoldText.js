import React from 'react'
import { Text, StyleSheet } from 'react-native'


const BoldText=(props)=>{
    return(
        <Text style={{...styles.BoldText,...props.style}}>
            {props.children}
        </Text>
    )
}

const styles=StyleSheet.create({
    BoldText:{
        fontFamily:'Roboto-bold',
        fontSize:12,
        color:'white'
    }
})


export default BoldText;