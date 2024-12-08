import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useRouter } from 'expo-router';
import Buttons from '@/src/components/atoms/buttons';
import { useSelector, useDispatch } from 'react-redux';
import { setIsFirstLaunch } from '@/src/state/userSlice';
import { RootState } from '@/src/state/store';

const Feature3 = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isFirstLaunch = useSelector((state: RootState) => state.user.isFirstLaunch);
  useEffect(() => {
    console.log("Updated isFirstLaunch:", isFirstLaunch); // Logs the updated state
    if (!isFirstLaunch) {
      router.navigate("/(main)");
    }
  }, [isFirstLaunch]); // Run when isFirstLaunch changes
  const onPress = () => {
    console.log("Before Dispatch:", isFirstLaunch);
    dispatch(setIsFirstLaunch(false));
  }
  return (
    <View className='flex-1 justify-center items-center'>
      <Text className='text-5xl'>Feature3</Text>
      <Buttons title={"Lets Binge"} onPress={onPress} />
    </View>
  )
}

export default Feature3