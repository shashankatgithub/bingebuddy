import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { MMKV } from "react-native-mmkv";
import { useSelector } from "react-redux";
import { Redirect, Stack } from "expo-router";
import "../../global.css";

const storage = new MMKV();

SplashScreen.preventAutoHideAsync();
const RootNavigation = () => {
  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
  return (
    <>
      {user.isFirstLaunch ? (
       // <Redirect href={"/(onboarding)/Onboarding"} />
        <Redirect href={"/(main)/home/homeScreen"}/>
      ) : user.isLogin ? (
        <Redirect href={"/(main)"} />
      ) : (
        <Redirect href={"/(auth)"} />
      )}
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
};

export default RootNavigation;
