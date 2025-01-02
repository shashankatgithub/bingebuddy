import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
//import { MMKV } from "react-native-mmkv";
import { useSelector } from "react-redux";
import { Redirect, Stack } from "expo-router";
import "../../global.css";
import BottomTabNavigator from "@/src/navigation/BottomTabNavigator";
import SearchScreen from "@/src/app/(main)/search/SearchScreen";
import ProfileScreen from "./(main)/profile/ProfileScreen";
import FilterScreen from "@/src/app/(main)/filter/FilterScreen";
import HomeScreen from "./(main)/home/homeScreen";

//const storage = new MMKV();

SplashScreen.preventAutoHideAsync();
const RootNavigation = () => {
  const screens = [
    { name: "Search", component: SearchScreen, icon: "search" },
    { name: "Filter", component: FilterScreen, icon: "filter" },
    { name: "Home", component: HomeScreen, icon: "compass" },
    { name: "Profile", component: ProfileScreen, icon: "person" },
  ];
  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
  if (user.isFirstLaunch) {
    return <Redirect href={"/(onboarding)/Onboarding"} />;
  } else {
    return (
      <>
        <Stack screenOptions={{ headerShown: false }} />
        <BottomTabNavigator screens={screens} />
      </>
    );
  }
  // else {
  //   //console.log("user", user);
  //   return <Redirect href={"/(auth)"} />;
  // }
};

export default RootNavigation;
