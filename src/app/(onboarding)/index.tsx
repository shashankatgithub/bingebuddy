import { View, Text } from 'react-native'
import { Link } from 'expo-router';
import React from 'react'

const Onboarding = () => {
  return (
    <View className='flex-1 justify-center items-center'>
      <Text className='text-5xl'>Onboarding</Text>
      <Link className='absolute bottom-4 right-4 py-10 px-10 text-5xl color-blue-400 font-bold' href='/feature1'>Next</Link>
    </View>
  )
}

export default Onboarding