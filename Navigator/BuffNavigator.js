import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import WelcomeScreen from  '../Screens/Welcome/WelcomeScreen'
import Avatar from '../Screens/Avatar/Avatar'

const BuffNavigator=createStackNavigator({
    Welcome:{
        screen:WelcomeScreen
    },
    Avatar:{
        screen:Avatar
    }
},{
    headerMode:'none'
})

export default createAppContainer(BuffNavigator)