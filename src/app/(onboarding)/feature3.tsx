import React, { useEffect , useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router';
import Buttons from '@/src/components/atoms/buttons';
import { useSelector, useDispatch } from 'react-redux';
import { setIsFirstLaunch } from '@/src/state/userSlice';
import { RootState } from '@/src/state/store';

const Feature3 = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isFirstLaunch = useSelector((state: RootState) => state.user.isFirstLaunch);
  const [isLoading, setIsLoading] = useState(false); // State for ActivityIndicator
  useEffect(() => {
    console.log("Updated isFirstLaunch:", isFirstLaunch); // Logs the updated state
    if (!isFirstLaunch) {
     router.navigate("/(main)");
    }
  }, [isFirstLaunch]); // Run when isFirstLaunch changes
  const onPress = async () => {
    console.log("Before Dispatch:", isFirstLaunch);
    setIsLoading(true); // Show ActivityIndicator
    await sleep(2000); // Wait for 2 seconds
    dispatch(setIsFirstLaunch(false)); // Update state in Redux
    setIsLoading(false); // Hide ActivityIndicator

    router.push("/(main)"); // Navigate to main page
  }
  return (
    <View className="flex-1 justify-center items-center">
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Show ActivityIndicator
      ) : (
        <>
          <Text className="text-5xl">Feature3</Text>
          <Buttons title={"Lets Binge"} onPress={onPress} />
        </>
      )}
    </View>
  );
};
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default Feature3