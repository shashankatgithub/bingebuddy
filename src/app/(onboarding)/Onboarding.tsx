import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrimaryGradient } from "@/src/components/atoms/CustomGradients";
import { globalStyles } from "@/src/styles";

const Onboarding = () => {
  return (
    <PrimaryGradient style={globalStyles.gradientContainer}>
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-6xl justify-center font-bold text-white">
          Binge Buddy
        </Text>
        <Pressable className="absolute bottom-20 items-center justify-center" onPress={() => {router.navigate('/LanguageSelection')}}>
          <View className="absolute bottom-20 pt-4 pb-4 pr-10 pl-10 bg-primary-button rounded-full flex items-center justify-center">
            <Text className="text-[#EAECEE] items-center padding-20 bottom-15 text-2xl ">
              Next
            </Text>
          </View>
        </Pressable>
      </SafeAreaView>
    </PrimaryGradient>
  );
};

export default Onboarding;