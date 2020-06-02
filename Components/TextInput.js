import React from 'react'
import { StyleSheet,View,TextInput } from 'react-native';

const Input=(props)=>{
    return(
        <TextInput style={props.UsernameAvailable ? {...style.Input,...props.style}:{...style.InputError,...props.style}} placeholder={props.UsernameAvailable ? "* Enter Screen Name":`${props.Username} is Not Available`} placeholderTextColor={props.UsernameAvailable ? "#BAC1C9":"#ff6961"}  />
    )
}

const style=StyleSheet.create({
    Input:{
        borderRadius:5,
        borderColor:'#BAC1C9',
        borderWidth:1,
        width:'90%',
        paddingVertical:5,
        paddingHorizontal:15,
        marginVertical:7,
        color:'#BAC1C9',
        textAlign:'center'
    },
    InputError:{
        borderRadius:5,
        borderColor:'#ff6961',
        borderWidth:1,
        width:'90%',
        paddingVertical:5,
        paddingHorizontal:15,
        marginVertical:7,
        color:'#BAC1C9',
        textAlign:'center'
    },
})

export default Input