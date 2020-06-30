import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainLayout from './MainLayout/MainLayout'
import * as Fonts from 'expo-font'
import {AppLoading} from 'expo'
import {Provider} from 'react-redux'
import {createStore,combineReducers} from 'redux';
import JoinReducer from './Store/Reducers/Join'
import DashboardReducer from './Store/Reducers/Dashboard'
import SPReducer from './Store/Reducers/SinglePlayer'
import { init,insertUser } from './Database/Helper'
import MPReducer from './Store/Reducers/MultiPlayer';


init().then(()=>{
  console.log("Initialize Database")

  // insertUser("Hello").then((result)=>{  
  //     console.log("Write Result Successfull",result)
   
  // }).catch((err)=>{
  //   console.log("Write Failed",err)
  // })

  // fetch().then((result)=>{  
  //       console.log("Fetch Successfull",result)
  //   }).catch((err)=>{
  //     console.log("Fetch Failed",err)
  //   })

}).catch((err)=>{
  console.log("DB Failed",err)
})



 const rootReducer=combineReducers({
  FB:JoinReducer,
  Dashboard:DashboardReducer,
  SP:SPReducer,
  MP:MPReducer
})

const store=createStore(rootReducer)

const LoadFonts=()=>{
  return Fonts.loadAsync({
    'Roboto':require('./assets/Fonts/Badaboom.ttf'),
    'Roboto-bold':require('./assets/Fonts/Badaboom.ttf'),
    'Comic':require('./assets/Fonts/Comic.ttf'),
    'Niagara':require('./assets/Fonts/Niagara.ttf'),
    'Budmo':require('./assets/Fonts/budmo.ttf')
  })
}

export default function App() {
  
  const[Loading,setLoading]=useState(false)

  if(!Loading)
  {
    return <AppLoading startAsync={LoadFonts} onFinish={()=>setLoading(true)}/>
  }

  return (
    <Provider store={store}>
       <MainLayout/>  
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
