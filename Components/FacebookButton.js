import React from 'react'
import { StyleSheet,View,Image} from 'react-native'

const FacebookButton=(props)=>{
    return(
        <View style={styles.FacebookContainer}>
            <View style={styles.FacebookIconContainer}>
                <Image source={require('../assets/facebook.png')}/>
            </View>
            {props.children}
        </View>
    )
}

const styles=StyleSheet.create({
    FacebookContainer:{
        flexDirection:'row',
        marginVertical:10,
        backgroundColor:"#4c5f87",
        alignItems:'center',
        justifyContent:'center'
    },
    FacebookIconContainer:{
        paddingHorizontal:5
    }
})

export default FacebookButton