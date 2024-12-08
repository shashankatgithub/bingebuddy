import React, { useEffect, useState } from 'react';import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { MMKV } from 'react-native-mmkv'
import { useSelector } from 'react-redux';
import { Redirect, Stack } from 'expo-router'
import "../../global.css";


const storage = new MMKV();

SplashScreen.preventAutoHideAsync();
const RootNavigation = () => {
  const user = useSelector((state:any) => state.user)
//   const [isLogin,setIsLogin] = useState(false);
//   const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  useEffect(() => {
    SplashScreen.hideAsync();
  },[]);
//   useEffect(() => {
//     const checkFirstLaunch = async () => {
//       setIsFirstLaunch(true);
//     };
//     checkFirstLaunch();
//   }, []);
  return (
    <>
    {user.isFirstLaunch ? <Redirect href={"/(onboarding)"}/> : user.isLogin ? <Redirect href={"/(main)"}/> : <Redirect href={"/(auth)"}/>}
    <Stack screenOptions={{headerShown: false}}/>  
    </>
  )
}

export default RootNavigation