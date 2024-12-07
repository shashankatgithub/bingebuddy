import { View, Text } from 'react-native'
import React from 'react'
import { Link , useRouter} from 'expo-router';
import Buttons from '@/src/components/atoms/buttons';

/**
 * The third feature of the onboarding flow. This page is a simple screen
 * that displays a button that navigates to the main app when pressed.
 * @returns A component that renders a screen with a button.
 */
const Feature3 = () => {
  const router = useRouter();
  const onPress = () => {
    router.navigate("/(main)");
  }
  return (
    <View className='flex-1 justify-center items-center'>
    <Text className='text-5xl'>Feature3</Text>
    <Buttons title={"Lets Binge"} onPress={onPress}/>
  </View>
  )
}

export default Feature3