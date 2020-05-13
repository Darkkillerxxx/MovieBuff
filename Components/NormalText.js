import React from 'react'
import { Text, StyleSheet } from 'react-native'


const NormalText=(props)=>{
    return(
        <Text style={{...styles.NormalText,...props.style}}>
            {props.children}
        </Text>
    )
}

const styles=StyleSheet.create({
    NormalText:{
        fontFamily:'Roboto-bold',
        fontSize:16,
        color:'white'
    }
})

export default NormalText;