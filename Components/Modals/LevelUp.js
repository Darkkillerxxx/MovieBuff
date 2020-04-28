import React from 'react'
import { StyleSheet,View, Image, FlatList, TouchableOpacity } from 'react-native'
import NormalText from '../NormalText';
import NextButton from '../NextButton';

class LevelUp extends React.Component{
    constructor()
    {
        super();
        this.state={
            LevelRewards:[
                {
                    id:1,
                    Coins:50,
                    Selected:false,
                    Completed:false
                },
                {
                    id:2,
                    Coins:100,
                    Selected:false,
                    Completed:false
                },
                {
                    id:3,
                    Coins:150,
                    Selected:true,
                    Completed:false
                },
                {
                    id:4,
                    Coins:200,
                    Selected:false,
                    Completed:false
                },
                {
                    id:5,
                    Coins:250,
                    Selected:false,
                    Completed:false
                },
                {
                    id:6,
                    Coins:300,
                    Selected:false,
                    Completed:false
                }
            ]
        }
    }

    winContainer=(itemData)=>{
        return(
            <View style={itemData.item.Selected ? styles.WinContainerSelected:styles.WinContainer}>
                 <Image source={require('../../assets/coinbig.png')} style={styles.Coins}/>
                 <NormalText style={{color:"#8B96A6"}}>{itemData.item.Coins} Coins</NormalText>
                 <NormalText style={{color:"#8B96A6"}}>Level {itemData.item.id}</NormalText>
             </View>
        )
    }


    render()
    {
        return(
            <View style={styles.Modal}>
                <View style={styles.ModalHeader} />
                <View style={styles.ModalContent}>
                   <FlatList data={this.state.LevelRewards} renderItem={this.winContainer} numColumns={3}/>
                </View>
                <View style={styles.ModalFooter}>
                    <TouchableOpacity style={{width:'100%',alignItems:'center'}}>
                        <NextButton style={{marginTop:10}}>
                            <NormalText style={{fontSize:16}}>Claim Coins</NormalText>
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
    WinContainer:{
        width:75,
        margin:5,
        padding:5,
        // borderColor:'white',
        // borderWidth:1,
        borderRadius:10,
        backgroundColor:"#4E515A",
        alignItems:'center'
    },
    WinContainerSelected:{
        width:75,
        margin:5,
        padding:5,
        borderColor:'yellow',
        borderWidth:1,
        borderRadius:10,
        backgroundColor:"#4E515A",
        alignItems:'center',
    },
    Coins:{
        width:30,
        height:30,
        margin:5
    }
})

export default LevelUp