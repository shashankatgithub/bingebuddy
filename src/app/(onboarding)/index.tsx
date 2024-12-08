import { View, Text } from 'react-native'
import { Link } from 'expo-router';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const Onboarding = () => {
  return (
    <SafeAreaView className='flex-1 justify-center items-center'>
      <Text className="text-6xl font-bold">Onboarding</Text>
      <Link className='absolute bottom-4 right-4 py-10 px-10 text-5xl font-bold' href='/feature1'>Next</Link>
    </SafeAreaView>
  )
}

export default Onboarding