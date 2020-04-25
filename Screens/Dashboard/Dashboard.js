import React from 'react'
import { View, StyleSheet,Image } from 'react-native'
import AppContainer from '../../Components/AppContainer';
import NormalText from '../../Components/NormalText';
import SinglePlayer from '../../Components/SinglePlayerBtn'
import Coop from '../../Components/CoopButton'
import { TouchableOpacity } from 'react-native-gesture-handler';
import SmallBtn from '../../Components/SmallButton';

class Dashboard extends React.Component{
    constructor()
    {
        super();
    }

    render()
    {
        return(
            <AppContainer style={styles.AppContainer}>
                <View style={styles.InfoContainer}>
                    <View style={styles.PicContainer}>
                        <Image style={styles.ProfilePic} source={require('../../assets/Temp/User1.png')}></Image>
                    </View>
                    <View style={styles.BriefContainer}>
                        <View style={styles.Brief}>
                            <View style={styles.BriefPic}>
                                <Image style={styles.Coins} source={require('../../assets/coins.png')}/>
                            </View>
                            <View style={styles.BriefNumbers}>
                                <NormalText style={styles.NormalText}>7200</NormalText>
                            </View>
                        </View>
                        <View style={styles.Brief}>
                            
                        </View>
                    </View>
                </View>
                <View style={styles.ImageView}>
                    <View style={styles.BackImageContainer}>
                        <Image style={styles.BackImage} source={require('../../assets/moviebuffback.png')}  />
                    </View>
                </View>

                <View style={styles.Container}>
                    <View style={styles.SPContainer}>
                        <TouchableOpacity>
                            <SinglePlayer>
                                <NormalText style={styles.NormalTextSP}>Single Player</NormalText>
                            </SinglePlayer>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.SPContainer}>
                        <TouchableOpacity>
                            <Coop>
                                <NormalText style={styles.NormalTextCo}>Play With Friends</NormalText>
                            </Coop>
                        </TouchableOpacity>
                    </View>

                   
                </View>
                <View style={styles.ToolsContainer}>
                   <View style={styles.Tools}>
                    <TouchableOpacity>
                        <SmallBtn color1="#009BE7" color2="#009DB2" color3="#00DF9B" color4="#00F57E">
                            <Image style={styles.Podium} source={require('../../assets/podium.png')}/>
                        </SmallBtn>
                    </TouchableOpacity>
                   </View>

                   <View style={styles.Tools}>
                    <TouchableOpacity>
                        <SmallBtn color1="#052CB5" color2="#0077E9" color3="#00C0E4" color4="#00EEEF">
                            <Image style={styles.Podium} source={require('../../assets/wheel.png')}/>
                        </SmallBtn>
                    </TouchableOpacity>
                   </View>

                   <View style={styles.Tools}>
                    <TouchableOpacity>
                        <SmallBtn color1="#FF8300" color2="#FF9F00" color3="#FFC700" color4="#FFDE00">
                            <Image style={styles.Podium} source={require('../../assets/earn.png')}/>
                        </SmallBtn>
                    </TouchableOpacity>
                   </View>
                   
                </View>
               
            </AppContainer>
        )
    }
}

const styles=StyleSheet.create({
    AppContainer:{
        flex:1,
        alignItems:'flex-start',
        justifyContent:'flex-start',
        paddingTop:20
    },
    InfoContainer:{
        flexDirection:'row',
        width:'100%',
        height:75
    },
    PicContainer:{
        width:"20%",
        backgroundColor:"#11233A",
        opacity:0.8,
        alignItems:'center',
        justifyContent:'center',
        borderBottomRightRadius:25
    },
    BriefContainer:{
        flexDirection:'row',
        width:"80%",
        height:45,
        backgroundColor:"#11233A",
        opacity:0.8,
        padding:10,
        marginBottom:15,
        borderBottomRightRadius:15,
        borderTopRightRadius:15
    },
    ProfilePic:{
        height:50,
        width:50
    },
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
    BackImageContainer:{
        height:250,
        width:250,
        maxWidth:'90%',
        maxHeight:'90%',
        overflow:'hidden'
     },
     BackImage:{
        flex:1,
        width:null,
        height:null,
        resizeMode:'contain'
    },
    ImageView:{
        width:'100%',
        alignItems:'center'
    },
    Container:{
        width:'100%',
        flexDirection:'row',
        
    },
    SPContainer:{
        width:'50%',
        flexDirection:'row',
        justifyContent:'center'
    },
    NormalTextSP:{
        fontSize:15,
        color:'#00C08A'
    },
    NormalTextCo:{
        fontSize:15,
        color:"#FF5D60"
    },
    ToolsContainer:{
        flexDirection:'row',
        width:'100%'
    },
    Tools:{
        width:'33.33%',
        flexDirection:'row',
        justifyContent:'center'
    },
    Podium:{
        width:30,
        height:30
    }
})

export default Dashboard