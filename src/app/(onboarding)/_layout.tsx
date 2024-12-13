import React from "react";
import { Stack } from "expo-router";

const OnboardingStack = () => {
  return (
    <React.Fragment>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" />
        <Stack.Screen name="LanguageSelection" />
        <Stack.Screen name="GenreSelection" />
        <Stack.Screen name="ArtistSelection" />
        <Stack.Screen name="SignUp" />
        <Stack.Screen name="SignIn" />
      </Stack>
    </React.Fragment>
  );
};

export default OnboardingStack;
