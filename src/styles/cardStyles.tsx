import { useAnimatedStyle, interpolate } from "react-native-reanimated";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

export const useLikeStyle = (translationX: any) => {
  return useAnimatedStyle(() => ({
    position: "absolute",
    top: 40,
    left: 20,
    transform: [{ rotate: "-15deg" }],
    opacity:
      translationX.value > 0
        ? interpolate(translationX.value, [0, screenWidth / 3], [0, 1])
        : 0,
    color: "#77FF00",
    fontSize: 32,
    fontWeight: "bold",
  }));
};

export const usePassStyle = (translationX: any) => {
  return useAnimatedStyle(() => ({
    position: "absolute",
    top: 40,
    right: 20,
    transform: [{ rotate: "15deg" }],
    opacity:
      translationX.value < 0
        ? interpolate(translationX.value, [-screenWidth / 3, 0], [1, 0])
        : 0,
    color: "#FF0000",
    fontSize: 32,
    fontWeight: "bold",
  }));
};

export const useSuperLikeStyle = (translationY: any) => {
  return useAnimatedStyle(() => ({
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    opacity:
      translationY.value < -100
        ? interpolate(translationY.value, [-screenHeight / 3, -100], [1, 0])
        : 0,
    transform: [
      {
        scale:
          translationY.value < -100
            ? interpolate(translationY.value, [-screenHeight / 3, -100], [1.2, 1])
            : 1,
      },
    ],
    color: "#FFD700",
    fontSize: 32,
    fontWeight: "bold",
  }));
};
