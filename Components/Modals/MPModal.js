import React from 'react'
import {View,StyleSheet,TouchableOpacity,TextInput } from 'react-native';
import NextButton from '../NextButton';
import NormalText from '../NormalText';

class MPModal extends React.Component{
    constructor()
    {
        super();
        this.state={
            JoinLobby:false
        }
    }
    render()
    {
        return(
            <View style={styles.Modal}>
                <View style={styles.ModalHeader} />
                <View style={styles.ModalContent}>
                    <View style={styles.ModalOverView}>
                        <View style={styles.ModalGameStyleButtonSelected}>
                            <TouchableOpacity onPress={()=>this.setState({JoinLobby:false})}>
                                <NormalText style={styles.ModalButtonTextStyleSelected}>Create Lobby</NormalText>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ModalGameStyleButtonUnselected}>
                            <TouchableOpacity onPress={()=>this.setState({JoinLobby:true})}>
                                <NormalText style={styles.ModalButtonTextStyleUnselected}>Join Lobby</NormalText>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        !this.state.JoinLobby ? 
                        <View style={{width:'80%',alignItems:'center'}}>
                            <TextInput placeholder="Enter Lobby Name" placeholderTextColor="#BAC1C9" style={styles.Input} />
                        </View>:
                        <View style={styles.JoinLobby}>
                            <View style={styles.Heading}>
                                <View style={{width:'50%',alignItems:'center'}}>
                                    <NormalText>Lobby Name</NormalText>
                                </View>
                                <View style={{width:'50%',alignItems:'center'}}>
                                    <NormalText>Players Joined</NormalText>
                                </View>
                            </View>
                            <View style={styles.Lobby}>
                                <View style={{width:'50%',alignItems:'center'}}>
                                    <NormalText>Lobby 1</NormalText>
                                </View>
                                <View style={{width:'50%',alignItems:'center'}}>
                                    <NormalText>5</NormalText>
                                </View>
                            </View>
                            <View style={styles.Lobby}>
                                <View style={{width:'50%',alignItems:'center'}}>
                                    <NormalText>Lobby 2</NormalText>
                                </View>
                                <View style={{width:'50%',alignItems:'center'}}>
                                    <NormalText>15</NormalText>
                                </View>
                            </View>
                            <View style={styles.Lobby}>
                                <View style={{width:'50%',alignItems:'center'}}>
                                    <NormalText>Lobby 3</NormalText>
                                </View>
                                <View style={{width:'50%',alignItems:'center'}}>
                                    <NormalText>20</NormalText>
                                </View>
                            </View>
                        </View>
                    }
                    
                </View>
                <View style={styles.ModalFooter}>
                    <TouchableOpacity style={{width:'100%',alignItems:'center'}} onPress={()=>{}}>
                        <NextButton style={{marginTop:10}}>
                            <NormalText style={{fontSize:16}}>{this.state.JoinLobby ? "Join Game" : "Create Lobby"}</NormalText>
                        </NextButton>
                    </TouchableOpacity>
                </View>    
            </View>
        )
    }
}


const styles=StyleSheet.create({
    Modal:{
        backgroundColor:'white',
        margin:40,
        borderRadius:25
    },
    ModalHeader:{
        height:30,
        backgroundColor:'#23ABDD',
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        paddingRight:10
    },
    ModalFooter:{
        height:30,
        width:'100%',
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25,
        backgroundColor:'#23ABDD',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:20
    },
    ModalContent:{
        backgroundColor:'#34495E',
        alignItems:'center',
        justifyContent:'space-around',
        paddingVertical:30,
    },
    ModalButtonTextStyleSelected:{
        fontSize:14,
        color:"white"
    },
    ModalOverView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginVertical:10
    },
    ModalGameStyleButtonSelected:{
        backgroundColor:'#00C0E4',
        borderWidth:1,
        borderColor:"#00C0E4",
        paddingHorizontal:15,
        paddingVertical:7,
        marginHorizontal:5,
        borderRadius:5
    },
    ModalButtonTextStyleUnselected:{
        fontSize:14,
        color:"#00C0E4"
    },
    ModalGameStyleButtonUnselected:{
        borderColor:'#00C0E4',
        borderWidth:1,
        paddingHorizontal:15,
        paddingVertical:6,
        marginHorizontal:5,
        borderRadius:5
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
    JoinLobby:{
        width:'90%',
        borderRadius:10,
        backgroundColor:"#203756",
        overflow:'hidden'
    },
    Heading:{
        width:'100%',
        height:20,
        backgroundColor:"#4E515A",
        flexDirection:'row'
    },
    Lobby:{
        width:'100%',
        height:20,
        backgroundColor:"#172C46",
        flexDirection:'row'
    }
})

export default MPModal