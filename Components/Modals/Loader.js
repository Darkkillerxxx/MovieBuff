import React from 'react'
import { View, StyleSheet,Image } from 'react-native'
import * as Animatable from 'react-native-animatable';
import NormalText from '../NormalText'

const dots={
    0:{
        translateY:0,
        opacity:0.9
    },
    0.5:{
        translateY:-15,
        opacity:0.9
    },
    0.7:{
        translateY:2,
        opacity:0.9
    },
    1:{
        translateY:0,
        opacity:0.9
    }
}


const Loader = (props) => {
    return(
        <View style={styles.LoaderContainer}>

            <Animatable.Image animation="tada" iterationCount="infinite" source={require('../../assets/camera.png')} style={styles.Camera}/>

            <View style={styles.LoaderDotsContainer}>
                <Animatable.View animation={dots} iterationCount="infinite" style={styles.Dot1} />
                <Animatable.View animation={dots} iterationCount="infinite" delay={100} style={styles.Dot1} />
                <Animatable.View animation={dots} iterationCount="infinite" delay={300} style={styles.Dot1} />
                <Animatable.View animation={dots} iterationCount="infinite" delay={400} style={styles.Dot1} />
                <Animatable.View animation={dots} iterationCount="infinite" delay={500} style={styles.Dot1} />
            </View>

            <NormalText style={styles.NmText}>{props.Text}</NormalText>
            
        </View>
    )
}

const styles=StyleSheet.create({
    LoaderContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    Camera:{
        height:75,
        width:75
    },
    LoaderDotsContainer:{
        flexDirection:'row',
        width:'100%',
        marginTop:25,
        alignItems:'center',
        justifyContent:'center',
    },
    Dot1:{
        width:10,
        height:10,
        borderRadius:100,
        marginHorizontal:5,
        backgroundColor:"#FED31F"
    },
    NmText:{
        marginVertical:10
    }
})

export default Loader;