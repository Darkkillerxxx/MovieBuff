import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainLayout from './MainLayout/MainLayout'
import * as Fonts from 'expo-font'
import {AppLoading} from 'expo'

const LoadFonts=()=>{
  return Fonts.loadAsync({
    'Roboto':require('./assets/Fonts/Roboto-Light.ttf'),
    'Roboto-bold':require('./assets/Fonts/Roboto-Bold.ttf')
  })
}

export default function App() {
  
  const[Loading,setLoading]=useState(false)

  if(!Loading)
  {
    return <AppLoading startAsync={LoadFonts} onFinish={()=>setLoading(true)}/>
  }

  return (
      <MainLayout/>    
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
