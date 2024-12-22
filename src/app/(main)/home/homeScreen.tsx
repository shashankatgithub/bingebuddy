import React from "react";
import ImageCard from "@/src/components/pages/TinderCard";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import NavigationBar from "../../../navigation";


import BottomTabNavigator from "@/src/navigation/BottomTabNavigator";
import {
  interpolate,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { globalStyles, gradients } from "@/src/styles";
import ActionButtons from "@/src/components/organisms/ActionButtons";
import CardDetails from "@/src/components/organisms/CardDetails";

const profiles = [
  {
    id: 1,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg",
    name: "Dani",
  },
  {
    id: 2,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/2.jpg",
    name: "Jon",
  },
  {
    id: 3,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/3.jpg",
    name: "Dani",
  },
  {
    id: 4,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/4.jpeg",
    name: "Alice",
  },
  {
    id: 5,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/5.jpg",
    name: "Dani",
  },
  {
    id: 6,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/6.jpg",
    name: "Kelsey",
  },
];

const HomeScreen = () => {
  const [users, setUsers] = useState(profiles);
  const activeIndex = useSharedValue(0);
  const [index, setIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [blurredProfile, setBlurredProfile] = useState(null);

  useAnimatedReaction(
    () => activeIndex.value,
    (value, prevValue) => {
      if (Math.floor(value) !== index) {
        runOnJS(setIndex)(Math.floor(value));
      }
    }
  );

  useEffect(() => {
    if (index > users.length - 3) {
      //TODO Here equate with last profile index and show some card that suggestion are over.
      console.warn("Last 2 cards remaining. Fetch more!");
      setUsers((profile) => [...profile, ...profiles.reverse()]);
    }
  }, [index]);

  const onResponse = (res: boolean) => {
    console.log("on Response: ", res);
  };

  return (
    <LinearGradient
      colors={gradients.appGradient.colors}
      start={gradients.appGradient.start}
      end={gradients.appGradient.end}
      style={globalStyles.gradientContainer}
    >
      <View className="flex-1 items-center justify-center">
        <Stack.Screen options={{ headerShown: false }} />
        {users.map((user, index) => (
          <ImageCard
            key={`${user.id}-${index}`}
            user={user}
            numOfCards={users.length}
            index={index}
            activeIndex={activeIndex}
            onResponse={onResponse}
          />
        ))}
        <ActionButtons times={undefined} star={undefined} heart={undefined} style={globalStyles.actionButtonStyle}></ActionButtons>
        <CardDetails modalVisible={false} setModalVisible={setModalVisible} blurredProfile={blurredProfile}></CardDetails>
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;
