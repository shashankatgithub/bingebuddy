import { View, Text, Image } from 'react-native'
import React from 'react'
import imagePath from '../constants/imagePath'

const Home = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Home</Text>
      <Image source={imagePath.main_logo} />
    </View>
  )
}

export default Home