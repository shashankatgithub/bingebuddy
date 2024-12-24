import { View, Text } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { globalStyles, gradients } from "@/src/styles";

const FilterScreen = () => {
  return (
    <SafeAreaProvider className="flex-1 justify-center items-center">
      <LinearGradient
        colors={gradients.appGradient.colors}
        start={gradients.appGradient.start}
        end={gradients.appGradient.end}
        style={globalStyles.gradientContainer}
      >
        <View className="flex-1 justify-center items-center">
          <Text className="text-6xl font-bold text-white">Filter</Text>
        </View>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

export default FilterScreen;
