import React from 'react'
import { View,Text,Image, StyleSheet,Button,TouchableOpacity } from 'react-native';
import AppContiner from '../../Components/AppContainer';
import BoldText from '../../Components/BoldText'
import NormalText from '../../Components/NormalText'
import NextButton from '../../Components/NextButton'
import { TextInput, ScrollView } from 'react-native-gesture-handler';

class WelcomeScreen extends React.Component{
    constructor()
    {
        super();
        this.state={

        }
    }

    render()
    {
        return(
            <AppContiner>
                <ScrollView>
                    <View style={styles.WelcomeView}>
                        <View style={styles.BackImageContainer}>
                            <Image style={styles.BackImage} source={require('../../assets/moviebuffback.png')}  />
                        </View>
                        <View style={styles.JoiningView}>
                            <BoldText style={styles.WelcomeText}>Welcome</BoldText>
                            <NormalText style={styles.WelcomeNormalText}>Welcome To Movie Buff</NormalText> 
                        </View>
                        <View style={styles.InputContainer}>
                            <TextInput placeholder="Enter Screen Name" placeholderTextColor="#BAC1C9" style={styles.Input} />
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Avatar')}>
                               <NextButton >
                                    <NormalText style={styles.NormalText}>Join Now</NormalText>
                                </NextButton>
                            </TouchableOpacity>

                            <NormalText>OR</NormalText>
                            <View style={styles.FacebookContainer}>
                                <View style={styles.FacebookIconContainer}>
                                    <Image source={require('../../assets/facebook.png')}/>
                                </View>
                                <Button title="Log-in with Facebook" color="#4c5f87"/>
                            </View>
                        </View>
                        <View style={styles.Terms}>
                            <NormalText style={styles.TermsText}>By Pressing 'Join' You Agree To Our <Text style={{borderBottomColor:'blue',color:'blue'}}>Terms and Conditions</Text></NormalText>
                        </View>
                    </View>  
                </ScrollView>              
            </AppContiner>
        )
    }
}

const styles=StyleSheet.create({
    WelcomeView:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    BackImageContainer:{
       height:325,
       width:325,
       maxWidth:'90%',
       maxHeight:'90%',
       overflow:'hidden'
    },
    Scroll:{
        flex:1
    },
    BackImage:{
        flex:1,
        width:null,
        height:null,
        resizeMode:'contain'
    },
    NormalText:{
        fontSize:16,
        color:'#00C08A'
    },
    WelcomeText:{
        fontSize:25,
    },
    WelcomeNormalText:{
        marginHorizontal:'10%',
        marginVertical:10,
        color:'#BAC1C9'
    },
    JoiningView:{
        alignItems:'center'
    },
    Input:{
        borderRadius:20,
        borderColor:'#BAC1C9',
        borderWidth:1,
        width:'90%',
        paddingVertical:5,
        paddingHorizontal:15,
        marginVertical:7,
        color:'#BAC1C9',
        textAlign:'center'
    },
    InputContainer:{
        width:'80%',
        alignItems:'center'
    },
    ButtonContainer:{
        width:'60%',
        marginVertical:10,
        overflow:'hidden',
        borderRadius:20
    },
    FacebookContainer:{
        // width:'60%',
        flexDirection:'row',
        marginVertical:10,
        backgroundColor:"#4c5f87",
        alignItems:'center'
    },
    FacebookIconContainer:{
        paddingHorizontal:5
    },
    Terms:{
        width:'100%',
        alignItems:'center',
        marginVertical:10
    },
    TermsText:{
        fontSize:10
    }

})

export default WelcomeScreen;