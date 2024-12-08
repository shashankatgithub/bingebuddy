import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Main = () => {
  return (
    <SafeAreaProvider className='flex-1'>
    <View className='flex-1 justify-center items-center'>
      <Text className='text-9xl font-bold'>Home</Text>
    </View>
    </SafeAreaProvider>
  )
}

export default Main