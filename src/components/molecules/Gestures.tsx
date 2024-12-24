import { Gesture } from "react-native-gesture-handler";
import { interpolate, runOnJS, withSpring } from "react-native-reanimated";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

// Tap Gesture Hook
export const useTapGesture = (onTapCallback) => {
  return Gesture.Tap().onEnd(() => {
    runOnJS(onTapCallback)();
  });
};

// Pan Gesture Hook
export const usePanGesture = (
  translationX,
  translationY,
  activeIndex,
  index,
  handleSwipeRight,
  handleSwipeLeft,
  handleSwipeUp
) => {
  return Gesture.Pan()
    .onChange((event) => {
      translationX.value = event.translationX;
      translationY.value = event.translationY;
      activeIndex.value = interpolate(
        Math.abs(translationX.value),
        [0, 500],
        [index, index + 0.8]
      );
    })
    .onEnd((event) => {
      const { velocityX, velocityY } = event;
      if (Math.abs(velocityX) > 400) {
        translationX.value = withSpring(
          Math.sign(velocityX) * screenWidth * 1.5,
          {
            velocity: velocityX,
          }
        );
        activeIndex.value = withSpring(index + 1);
        if (velocityX > 400) {
          runOnJS(handleSwipeRight)();
        } else if (velocityX < -400) {
          runOnJS(handleSwipeLeft)();
        }
      } else if (velocityY < -400 || event.translationY < -150) {
        translationY.value = withSpring(-screenHeight * 1);
        activeIndex.value = withSpring(index + 1); 
        runOnJS(handleSwipeUp)();
      } else {
        translationX.value = withSpring(0);
        translationY.value = withSpring(0);
      }
    });
};
