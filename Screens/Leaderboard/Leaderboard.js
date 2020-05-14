import React from 'react'
import { StyleSheet,View, Image,ScrollView,FlatList } from 'react-native';
import AppContainer from '../../Components/AppContainer';
import BoldText from '../../Components/BoldText';
import NormalText from '../../Components/NormalText';

class Leaderboard extends React.Component{
    constructor()
    {
        super();
        this.state={
            LB:[],
            UId:null
        }
    }

    componentDidMount()
    {
        const {Leaderboard,UserId}=this.props.navigation.state.params
        this.setState({LB:Leaderboard})
        this.setState({UId:UserId})
    }

    ShowSeperateStanding=()=>{
        let ShowStandings=true
        this.state.LB.forEach(element => {
            if(element.LeaderBoard[0].userId === this.state.UId)
            {
                ShowStandings=false
            }
        });
        return ShowStandings
    }


    render()
    {
        let ShowUsers=this.state.LB.map((result,index)=>{
            return(
                index !== this.state.LB.length - 1 ?
                <View key={index} style={result.UserRank === 1 || result.LeaderBoard[0].userId === this.state.UId  ? style.BoardFirst:style.Board}>
                    <Image style={{height:50,width:50,borderRadius:200,borderColor:'white',borderWidth:1}} source={{uri:result.LeaderBoard[0].URL}}></Image>
                    <View style={style.Info}>
                        <NormalText style={{fontSize:18}}>{result.LeaderBoard[0].NAME}</NormalText>
                        <NormalText style={{fontSize:18,color:"#8B96A6"}}>Level {result.LeaderBoard[0].Level}</NormalText>
                    </View>
                    <View style={result.UserRank === 1 ? style.PositionF:result.UserRank === 2 || result.UserRank === 3 ? style.PositionSF : style.Position}>
                        <NormalText style={{fontSize:18}}>{result.UserRank}</NormalText>
                    </View>
                </View>:
                this.ShowSeperateStanding() ? 
                <View key={index} style={style.BoardFirst}>
                    <Image style={{height:50,width:50,borderRadius:200,borderColor:'white',borderWidth:1}} source={{uri:result.LeaderBoard[0].URL}}></Image>
                    <View style={style.Info}>
                        <NormalText style={{fontSize:18}}>{result.LeaderBoard[0].NAME}</NormalText>
                        <NormalText style={{fontSize:18,color:"#8B96A6"}}>Level {result.LeaderBoard[0].Level}</NormalText>
                    </View>
                    <View style={result.UserRank === 1 ? style.PositionF:result.UserRank === 2 || result.UserRank === 3 ? style.PositionSF : style.Position}>
                        <NormalText style={{fontSize:18}}>{result.UserRank}</NormalText>
                    </View>
                </View>:null
            )
        })
        return(
            <AppContainer style={style.AppContainer}>
                <BoldText style={style.BoldText}>Leaderboard</BoldText>
                <View style={style.TabsContainer}>
                    <View style={style.Tab}>
                        <BoldText style={style.SelectedTab}>All</BoldText>
                    </View>
                    <View style={style.Tab}>
                        <BoldText style={style.BoldTextTab}>State</BoldText>
                    </View>
                    <View style={style.Tab}>
                        <BoldText style={style.BoldTextTab}>Genre</BoldText>
                    </View>
                </View>
                <ScrollView style={style.LeaderboardContainer}>
                    {ShowUsers}
                </ScrollView>
                
            </AppContainer>
        )
    }
}

const style=StyleSheet.create({
    AppContainer:{
        alignItems:'flex-start',
        justifyContent:'flex-start',
        paddingTop:20
    },
    BoldText:{
        fontSize:24,
        marginHorizontal:10
    },
    BoldTextTab:{
        fontSize:20
    },
    TabsContainer:{
        flexDirection:'row',
        width:'100%',
        marginVertical:15
    },
    Tab:{
        width:'33.33%',
        justifyContent:'center',
        alignItems:'center'
    },
    SelectedTab:{
        fontSize:20,
        color:"#1890ff"
    },
    LeaderboardContainer:{

    },
    Board:{
        flexDirection:'row',
        padding:10,
        alignItems:'flex-start',
        justifyContent:'center'
    },
    BoardFirst:{
        flexDirection:'row',
        padding:10,
        alignItems:'flex-start',
        justifyContent:'center',
        backgroundColor:"#172C46"
    },
    PositionF:{
        width:50,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        backgroundColor:"#FDD54F"
    },
    Position:{
        width:50,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        borderColor:"white",
        borderWidth:1
    },
    UserBoard:{
        flexDirection:'row',
        padding:10,
        alignItems:'flex-start',
        justifyContent:'center',
        backgroundColor:"#172C46",
        elevation:10
    },
    PositionSF:{
        width:50,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        borderColor:"#FDD54F",
        borderWidth:1
    },
    Info:{
        alignItems:'flex-start',
        justifyContent:'center',
        paddingHorizontal:10,
        width:'70%'
    }
})

export default Leaderboard