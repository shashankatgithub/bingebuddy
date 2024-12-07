import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';

const Feature2 = () => {
  return (
    <View className='flex-1 justify-center items-center'>
    <Text className='text-5xl'>Feature2</Text>
    <Link className='absolute bottom-4 right-4 py-10 px-10 text-5xl color-blue-400 font-bold' href='/feature3'>Next</Link>
  </View>
  )
}

export default Feature2