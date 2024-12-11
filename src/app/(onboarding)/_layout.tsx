import React from "react";
import { Stack } from "expo-router";

const OnboardingStack = () => {
  return (
    <React.Fragment>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="feature1" />
        <Stack.Screen name="feature2" />
        <Stack.Screen name="feature3" />
      </Stack>
    </React.Fragment>
  );
};

export default OnboardingStack;
