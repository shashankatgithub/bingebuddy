import React, { useEffect, useState } from 'react'
import { Redirect, Stack } from 'expo-router'
import "../../global.css";
import * as SplashScreen from 'expo-splash-screen';
import { MMKV } from 'react-native-mmkv'

SplashScreen.preventAutoHideAsync();
const RootNavigation = () => {
  const storage = new MMKV();
  const [isLogin,setIsLogin] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  useEffect(() => {
    SplashScreen.hideAsync();
  },[]);
  useEffect(() => {
    const checkFirstLaunch = async () => {
      setIsFirstLaunch(true);
    };
    checkFirstLaunch();
  }, []);
  return (
    <>
    <Stack screenOptions={{headerShown: false}}/>
    {isFirstLaunch ? <Redirect href={"/(onboarding)"}/> : isLogin ? <Redirect href={"/(main)"}/> : <Redirect href={"/(auth)"}/>}
    </>
  )
}

export default RootNavigation