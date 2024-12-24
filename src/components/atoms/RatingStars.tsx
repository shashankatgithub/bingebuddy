import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Using FontAwesome icons from Expo
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
const RatingStars = ({ rating, maxRating = 5 }) => {
  const showPopup = useSharedValue(0);
  const handleRatingPress = () => {
    showPopup.value = 1; // Show the popup
    setTimeout(() => {
      showPopup.value = 0; // Fade out after 1 second
    }, 1000);
  };
  const animatedPopupStyle = useAnimatedStyle(() => ({
    opacity: withTiming(showPopup.value, { duration: 500 }), // Fade in/out
    transform: [
      {
        scale: withTiming(showPopup.value === 1 ? 1 : 0.8, { duration: 500 }),
      },
    ],
  }));

  return (
    <TouchableWithoutFeedback onPress={handleRatingPress}>
      <View style={styles.container}>
        {Array.from({ length: maxRating }, (_, index) => {
          const iconName =
            index + 1 <= Math.floor(rating)
              ? "star" // Full star
              : index + 1 === Math.ceil(rating)
              ? "star-half-full" // Half star
              : "star-o"; // Empty star

          return (
            <FontAwesome
              key={index}
              name={iconName}
              size={24}
              color="#FFD700" // Gold color for stars
              style={styles.star}
            />
          );
        })}
        <Animated.View
          style={[
            styles.popup,
            animatedPopupStyle,
            { left: maxRating * 24 - 24 / 2 }, // Adjust left based on stars
          ]}
        >
          <Text style={styles.popupText}>{rating} Stars</Text>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RatingStars;
const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      position: "relative",
    },
    star: {
      marginHorizontal: 2,
    },
    popup: {
      position: "absolute",
      top: -30, // Position above the stars
      backgroundColor: "black",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 8,
      zIndex: 1,
    },
    popupText: {
      color: "white",
      fontSize: 14,
      fontWeight: "bold",
    },
  });