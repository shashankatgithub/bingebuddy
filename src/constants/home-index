import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Modal,
  Dimensions,
  StyleSheet,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { PanGestureHandler } from "react-native-gesture-handler";
import NavigationBar from "../../../navigation"; // Import the reusable navigation bar
import { State } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

// Mock data for profiles
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const cardWidth = screenWidth * 0.9; // Dynamically set card width to 90% of screen width
const cardHeight = screenHeight * 0.7; // Dynamically set card height to 60% of screen height

const profiles = [
  {
    id: "1",
    name: "Liz",
    age: 25,
    bio: "Monogamous",
    image:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC/et00410725-snutlkfrvh-portrait.jpg",
  },
  {
    id: "2",
    name: "Mike",
    age: 28,
    bio: "Adventurer",
    image:
      "https://lumiere-a.akamaihd.net/v1/images/p_encanto_homeent_22359_4892ae1c.jpeg",
  },
];

export default function TinderScreen() {
  const [profileIndex, setProfileIndex] = useState(0); // Current profile index
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [blurredProfile, setBlurredProfile] = useState(null); // Profile data for modal
  const [swiping, setSwiping] = useState(false); // State to track if user is swiping

  const translateX = useSharedValue(0); // Shared value for X-axis gesture
  const translateY = useSharedValue(0); // Shared value for Y-axis gesture

  // Logs for debugging the current profile state
  console.log("Current profile index:", profileIndex);
  console.log("Current profile:", profiles[profileIndex]);

  // const animatedStyle = useAnimatedStyle(() => ({
  //   transform: [
  //     { translateX: translateX.value }, // Horizontal animation
  //     { translateY: translateY.value }, // Vertical animation
  //   ],
  // }));
  const animatedStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      translateX.value,
      [-screenWidth / 2, 0, screenWidth / 2],
      [-15, 0, 15]
    );

    const opacity = interpolate(
      Math.abs(translateX.value),
      [0, screenWidth / 3],
      [1, 0.5] // Reduce opacity as card moves away
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation}deg` },
      ],
      opacity, // Apply interpolated opacity
    };
  });

  const labelStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-screenWidth / 3, 0, screenWidth / 3],
      [1, 0, 1]
    );
    const scale = interpolate(
      translateX.value,
      [-screenWidth / 3, 0, screenWidth / 3],
      [1.2, 1, 1.2]
    );

    return {
      opacity: Math.max(0, opacity), // Ensure opacity is non-negative
      transform: [{ scale }],
    };
  });

  const likeStyle = useAnimatedStyle(() => ({
    zIndex: 10,
    position: "absolute",
    top: 40,
    left: 20,
    transform: [{ rotate: "-15deg" }],
    opacity:
      translateX.value > 0
        ? interpolate(translateX.value, [0, screenWidth / 3], [0, 1])
        : 0,
    color: "#77FF00",
  }));

  const passStyle = useAnimatedStyle(() => ({
    zIndex: 10,
    position: "absolute",
    top: 40,
    right: 20,
    transform: [{ rotate: "15deg" }],
    opacity:
      translateX.value < 0
        ? interpolate(translateX.value, [-screenWidth / 3, 0], [1, 0])
        : 0,
    color: "#FF0000",
  }));

  const bingedStyle = useAnimatedStyle(() => ({
    zIndex: 10,
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    opacity:
      translateY.value < -100
        ? interpolate(translateY.value, [-screenHeight / 3, -100], [1, 0])
        : 0,
    transform: [
      {
        scale:
          translateY.value < -100
            ? interpolate(translateY.value, [-screenHeight / 3, -100], [1.2, 1])
            : 1,
      },
    ],
    color: "#FFEE00",
  }));

  const onHandlerStateChange = (event) => {
    const { state } = event.nativeEvent;
    console.log("Gesture state changed:", state);

    if (state === State.END) {
      console.log("Gesture reached END state");
      onGestureEnd(); // Trigger the gesture end logic
    } else if (state === State.FAILED) {
      console.warn("Gesture failed");
    }
  };

  const handleSwipe = (direction) => {
    try {
      console.log(`handleSwipe triggered with direction: ${direction}`);
      if (profiles.length === 0) {
        console.warn("No profiles available to swipe.");
        return;
      }
      if (direction === "right") console.log("Liked the profile!");
      else if (direction === "left") console.log("Passed on the profile!");
      else if (direction === "up") console.log("Super Liked the profile!");

      setProfileIndex((prev) => {
        const nextIndex = (prev + 1) % profiles.length;
        console.log("Updated profile index to:", nextIndex);
        return nextIndex;
      });
      translateX.value = 0;
      translateY.value = 0;
    } catch (error) {
      console.error("Error in handleSwipe:", error);
    }
  };

  const onGestureEvent = (event) => {
    try {
      const { translationX, translationY } = event.nativeEvent; // Extract values safely
      if (translationX !== undefined && translationY !== undefined) {
        translateX.value = translationX;
        translateY.value = translationY;
        console.log(
          "Gesture update - translateX:",
          translationX,
          "translateY:",
          translationY
        );
        // If the gesture is moving, set swiping to true
        if (Math.abs(translationX) > 10 || Math.abs(translationY) > 10) {
          console.log("Gesture is moving");
          setSwiping(true);
        }
      } else {
        console.warn("Undefined gesture values received in onGestureEvent");
      }
    } catch (error) {
      console.error("Error in onGestureEvent:", error);
    }
  };

  const onGestureEnd = () => {
    console.log(
      "onGestureEnd triggered - translateX:",
      translateX.value,
      "translateY:",
      translateY.value
    );

    if (translateX.value > 100) {
      console.log("Swipe detected: Right");
      handleSwipe("right");
    } else if (translateX.value < -100) {
      console.log("Swipe detected: Left");
      handleSwipe("left");
    } else if (translateY.value < -100) {
      console.log("Swipe detected: Up");
      handleSwipe("up");
    } else {
      console.log("No swipe detected, resetting position");
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    }
    setSwiping(false); // Reset swiping state after gesture ends
  };

  const currentProfile = profiles[profileIndex]; // Current profile to display

  return (
    <LinearGradient
      colors={[
        "hsla(169, 19%, 28%, 1)",
        "hsla(225, 55%, 16%, 1)",
        "hsla(225, 55%, 16%, 1) 100%)",
      ]}
      start={{ x: 0, y: 0 }} // Start point of the gradient
      end={{ x: 1, y: 0 }} // End point of the gradient
      style={styles.gradientContainer}
    >
      <View className="flex-1 justify-center items-center">
        {/* Profile Card */}
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange} // Handles state changes
        >
          <Animated.View
            className="relative  rounded-lg shadow-md justify-center items-center"
            style={[animatedStyle, { width: cardWidth, height: cardHeight }]}
          >
            {/* Like Label */}
            <Animated.Text
              style={[
                likeStyle,
                {
                  fontSize: 60,
                  fontWeight: "bold",
                },
              ]}
            >
              LIKE
            </Animated.Text>
            {/* Pass Label */}
            <Animated.Text
              style={[
                passStyle,
                {
                  fontSize: 60,
                  fontWeight: "bold",
                },
              ]}
            >
              PASS
            </Animated.Text>
            <Animated.Text
              style={[
                bingedStyle,
                {
                  fontSize: 60,
                  fontWeight: "bold",
                },
              ]}
            >
              BINGED
            </Animated.Text>
            <Pressable
              onPress={() => {
                console.log("Profile card pressed");
                if (!swiping) {
                  setBlurredProfile(currentProfile);
                  setModalVisible(true);
                }
              }}
              className="rounded-lg shadow-lg overflow-hidden"
            >
              <Image
                source={{ uri: currentProfile.image }}
                className="w-full h-full"
                onError={(error) => console.error("Image load error:", error)}
                style={[{ width: cardWidth, height: cardHeight }]}
              />
            </Pressable>
          </Animated.View>
        </PanGestureHandler>

        {/* Action Buttons */}
        <View className="relative flex-row justify-between w-full px-16 py-4">
          <Pressable
            onPress={() => handleSwipe("left")}
            className="p-4  rounded-full"
          >
            <FontAwesome name="times" size={30} color="white" />
          </Pressable>
          <Pressable
            onPress={() => handleSwipe("up")}
            className="p-4  rounded-full"
          >
            <FontAwesome name="star" size={30} color="white" />
          </Pressable>
          <Pressable
            onPress={() => handleSwipe("right")}
            className="p-4  rounded-full"
          >
            <FontAwesome name="heart" size={30} color="white" />
          </Pressable>
        </View>

        {/* Modal */}
        <Modal visible={modalVisible} transparent>
          <BlurView intensity={80} className="absolute inset-0">
            <View className="flex-1 justify-center items-center">
              <View className="bg-white w-80 p-4 rounded-lg">
                <Text className="text-xl font-bold">
                  {blurredProfile?.name}
                </Text>
                <Text className="text-gray-500">{blurredProfile?.bio}</Text>
                <Pressable
                  onPress={() => {
                    console.log("Close modal button pressed");
                    setModalVisible(false);
                  }}
                  className="mt-4 bg-red-500 p-2 rounded"
                >
                  <Text className="text-white text-center">Close</Text>
                </Pressable>
              </View>
            </View>
          </BlurView>
        </Modal>

        {/* Reusable Navigation Bar */}
        <NavigationBar
          onSearch={() => console.log("Search button pressed")}
          onFilter={() => console.log("Filter button pressed")}
          onDiscover={() => console.log("Discover button pressed")}
          onProfile={() => console.log("Profile button pressed")}
        />
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%", // Full-screen gradient
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
