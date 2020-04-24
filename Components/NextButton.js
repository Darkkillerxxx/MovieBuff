import React from 'react'
import { StyleSheet,View,Button} from 'react-native'

const NextButton=(props)=>{
    return(
        <View style={styles.ButtonContainer}>
            {props.children}
        </View>
    )
}


const styles=StyleSheet.create({
    ButtonContainer:{
        width:'60%',
        marginVertical:10,
        overflow:'hidden',
        borderRadius:20
    },
})
export default NextButton