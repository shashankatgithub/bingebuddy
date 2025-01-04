import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imagePath from "@/src/constants/imagePath";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import {
  setIsLoggedIn,
  setIsFirstLaunch,
  setCurrentCards,
} from "@/src/state/userSlice";
import { Image } from "expo-image";
import { useLazyDiscoverMoviesQuery, useLazyNewDiscoverMoviesQuery } from "@/src/api/bingeService";
import { StorageKeys } from "@/src/utils/StorageKeys";
import { getFromMMKV } from "@/src/utils/mmkv";

const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  //const [discoverMovies, { isFetching }] = useLazyDiscoverMoviesQuery();
  const [discoverMovies, { isFetching }] = useLazyNewDiscoverMoviesQuery();

  const handleDonePress = () => {
    router.navigate("/SignIn");
  };

  const handleApplePress = () => {
    dispatch(setIsLoggedIn(true));
    dispatch(setIsFirstLaunch(false));
    router.navigate("/");
  };
  const handleSkipPress = async () => {
    const genres = getFromMMKV(StorageKeys.GENRES) || [];
    const languages = getFromMMKV(StorageKeys.LANGUAGES) || [];
    const artists = getFromMMKV(StorageKeys.ARTISTS) || [];

    const params: Record<string, string[] | number> = {
      genres,
      languages,
      artists,
      page: 1,
    };

    
    try {
      // const result = await discoverMovies({
      //   genres,
      //   languages,
      //   artists,
      //   page: 1,
      // }).unwrap();
      const result = await discoverMovies(params).unwrap();
      console.log("Discover movies response:", result);

      dispatch(setCurrentCards(result || []));
      dispatch(setIsLoggedIn(false));
      dispatch(setIsFirstLaunch(false));
      router.navigate("/");
    } catch (error) {
      console.error("Error fetching discover-movies:", error);
    }
  };
  return (
    <ImageBackground
      source={imagePath.onboarding_bg}
      style={{ flex: 1 }}
      resizeMode="cover"
      blurRadius={5}
    >
      {isFetching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text className="text-white mt-2">Loading...</Text>
        </View>
      ) : (
        <SafeAreaView className="flex-1 items-center justify-between">
          {/* Top Section with Logo */}
          <Pressable
            style={{
              position: "absolute",
              top: 50,
              right: 20,
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 15,
            }}
            onPress={handleSkipPress}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Skip
            </Text>
          </Pressable>
          <View className="mt-10 items-center">
            <Image
              source={imagePath.main_logo} // Replace with your logo image path
              style={{ width: 50, height: 50 }}
            />
            <Text className="text-white text-2xl font-bold mt-2">
              Binge Buddy
            </Text>
          </View>

          {/* Middle Section with Title and Subtitle */}
          <View className="px-10">
            <Text className="text-white text-3xl font-bold text-center mb-2">
              Effortlessly Discover {"\n"} Your Ideal Match
            </Text>
            <Text className="text-white text-base text-center">
              Experience a seamless journey uncovering the ideal watch that
              aligns with your preferences and aspirations.
            </Text>
          </View>

          {/* Bottom Section with Buttons */}
          <View className="mb-10 w-full px-6">
            <Pressable
              className="flex-row items-center justify-center bg-white rounded-full py-5 mb-5"
              onPress={handleDonePress}
            >
              <Text className="text-blue-500 font-bold text-xl">
                Continue with Google
              </Text>
            </Pressable>
            {/* <Pressable className="flex-row items-center justify-center bg-white rounded-full py-5 mb-5" onPress={handleApplePress}>
            <Text className="text-black font-bold text-xl">
              Continue with Apple
            </Text>
          </Pressable> */}
            <Pressable
              className="flex-row items-center justify-center bg-blue-600 rounded-full py-5 mb-5"
              onPress={handleApplePress}
            >
              <Text className="text-white font-bold text-xl">
                Continue with Facebook
              </Text>
            </Pressable>
            <Pressable className="flex-row items-center justify-center bg-gray-700 rounded-full py-5">
              <Text className="text-white font-bold text-xl">
                Use Phone Number
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      )}
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignUp;
