import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Profile = () => {
  return (
    <SafeAreaProvider className='flex-1 justify-center items-center'>
    <View className='flex-1 justify-center items-center'>
      <Text className='text-6xl font-bold'>Profile</Text>
    </View>
    </SafeAreaProvider>
  )
}

export default Profile