import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Feature1 = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="text-6xl font-bold">Feature1</Text>
      <Link
        className="absolute bottom-4 right-4 py-10 px-10 text-5xl font-bold"
        href="/feature2"
      >
        Next
      </Link>
    </SafeAreaView>
  );
};

export default Feature1;
