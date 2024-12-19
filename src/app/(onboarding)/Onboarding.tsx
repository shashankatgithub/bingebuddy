import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link, router } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrimaryGradient } from "@/src/components/atoms/CustomGradients";

const Onboarding = () => {
  return (
    <PrimaryGradient style={styles.gradientContainer}>
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

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%", // Full-screen gradient
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
