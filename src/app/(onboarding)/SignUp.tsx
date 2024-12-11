import React from 'react';
import { View, Text, ImageBackground, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import imagePath from '@/src/constants/imagePath';
import { useRouter } from 'expo-router';



const SignUp = () => {
  const router = useRouter();

  const handleDonePress = () => {
    router.navigate('SignIn');
  };
  return (
    <ImageBackground
      source={imagePath.onboarding_bg} 
      style={{ flex: 1 }}
      resizeMode="cover"
      blurRadius={2}
    >
      <SafeAreaView className="flex-1 items-center justify-between">
        {/* Top Section with Logo */}
        <View className="mt-10 items-center">
          <Image
            source={imagePath.main_logo} // Replace with your logo image path
            style={{ width: 50, height: 50 }}
          />
          <Text className="text-white text-2xl font-bold mt-2">Binge Buddy</Text>
        </View>

        {/* Middle Section with Title and Subtitle */}
        <View className="px-10">
          <Text className="text-white text-3xl font-bold text-center mb-2">
            Effortlessly Discover {'\n'} Your Ideal Match
          </Text>
          <Text className="text-white text-base text-center">
            Experience a seamless journey uncovering the ideal watch that aligns
            with your preferences and aspirations.
          </Text>
        </View>

        {/* Bottom Section with Buttons */}
        <View className="mb-10 w-full px-6">
        <Pressable className="flex-row items-center justify-center bg-white rounded-full py-5 mb-5" onPress={handleDonePress}>
            <Text className="text-blue-500 font-bold text-xl">
              Continue with Google
            </Text>
          </Pressable>
          <Pressable className="flex-row items-center justify-center bg-white rounded-full py-5 mb-5">
            <Text className="text-black font-bold text-xl">
              Continue with Apple
            </Text>
          </Pressable>
          <Pressable className="flex-row items-center justify-center bg-blue-600 rounded-full py-5 mb-5">
            <Text className="text-white font-bold text-xl">
              Continue with Facebook
            </Text>
          </Pressable>
          <Pressable className="flex-row items-center justify-center bg-gray-700 rounded-full py-5">
            <Text className="text-white font-bold text-xl">
              Use Phone Number
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignUp;