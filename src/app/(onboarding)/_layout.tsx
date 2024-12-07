import React from 'react'
import { Stack } from 'expo-router'

const OnboardingStack = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>
    <Stack.Screen name="index"/>
    <Stack.Screen name="feature1"/>
    <Stack.Screen name="feature2"/>
    <Stack.Screen name="feature3"/>
    </Stack>
  )
}

export default OnboardingStack