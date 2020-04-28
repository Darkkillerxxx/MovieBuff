import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import WelcomeScreen from  '../Screens/Welcome/WelcomeScreen'
import Avatar from '../Screens/Avatar/Avatar'
import Genre from '../Screens/Genre/Genre'
import Dashboard from '../Screens/Dashboard/Dashboard'
import CustomGame from '../Screens/CustomGame/CustomGame'
import SPGameScreen from '../Screens/GameScreenSP/SPGameScreen'
import Leaderboard from '../Screens/Leaderboard/Leaderboard'
import EarnCoins from '../Screens/EarnCoins/EarnCoins'


const BuffNavigator=createStackNavigator({
    Welcome:{
        screen:WelcomeScreen
    },
    Avatar:{
        screen:Avatar
    },
    Genre:{
        screen:Genre
    },
    Dashboard:{
        screen:Dashboard
    },
    CustomGame:{
        screen:CustomGame
    },
    SPGameScreen:{
        screen:SPGameScreen
    },
    Leaderboard:{
        screen:Leaderboard
    },
    EarnCoins:{
        screen:EarnCoins
    }
},{
    headerMode:'none'
})

export default createAppContainer(BuffNavigator)