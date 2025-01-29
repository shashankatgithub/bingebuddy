import React from "react";
import ImageCard from "@/src/components/pages/ImageCard";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  useAnimatedReaction,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";
import { globalStyles } from "@/src/styles";
import ActionButtons from "@/src/components/organisms/ActionButtons";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "@/src/components/atoms/types";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppGradient } from "@/src/components/atoms/CustomGradients";
import {
  MAX_STORAGE_SIZE,
  allKeys,
  manageStorage,
  mmkv,
  totalSize,
} from "@/src/utils/mmkv";
import { setCurrentCards } from "@/src/state/userSlice";

type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, "Home">;

const HomeScreen: React.FC<HomeScreenProps> = ({ route }) => {
  const { initialCards = [] } = route.params || {};
  // TODO The homescreen is redenred multiple times
  //console.log("Initial Cards:", initialCards);
  // console.log(`MMKV total size: ${totalSize} bytes`);
  // allKeys.forEach((key) => {
  //   const value = mmkv.getString(key) || '';
  //   console.log(`Key: ${key}, Size: ${value.length} bytes`);
  //   manageStorage();
  // });

  const reduxCurrentCards = useSelector(
    (state: any) => state.user.currentCards
  );
  const likedMovies = useSelector((state: any) => state.user.likes || []);
  const currentCards =
    initialCards && initialCards.length > 0 ? initialCards : reduxCurrentCards;
  const dispatch = useDispatch();

  //const nextCards = useSelector((state: any) => state.user.nextCards);
  const [movies, setMovies] = useState(currentCards);
  const activeIndex = useSharedValue(0);
  const [index, setIndex] = useState(0);
  const likedCount = likedMovies.length;
  const [lastLikedCount, setLastLikedCount] = useState(0); // Track the last liked count

  useAnimatedReaction(
    () => activeIndex.value,
    (value, prevValue) => {
      if (Math.floor(value) !== index) {
        runOnJS(setIndex)(Math.floor(value));
      }
    }
  );

  useEffect(() => {
    setMovies(currentCards);
    dispatch(setCurrentCards(currentCards || []));
  }, [currentCards]);

  // useEffect(() => {
  //   if (index > movies.length - 3) {
  //     //TODO Here equate with last profile index and show some card that suggestion are over.
  //     console.warn("Last 2 cards remaining. Fetch more!");
  //     setMovies((currentMovies) => [
  //       ...currentMovies,
  //       ...[...currentCards].reverse(),
  //     ]);
  //   }
  // }, [index]);

  useEffect(() => {
    // Fetch more cards if nearing the end but avoid overwriting the blank card
    if (index > movies.length - 3 && !movies.some((m) => m.type === "blank")) {
      console.warn("Last 2 cards remaining. Fetch more!");
      setMovies((currentMovies) => [
        ...currentMovies,
        ...[...currentCards].reverse(),
      ]);
    }
  }, [index]);

  useEffect(() => {
    if (
      likedCount % 5 === 0 &&
      likedCount > 0 &&
      likedCount !== lastLikedCount
    ) {
      console.log(`Adding a blank card after ${likedCount} likes.`);
      const blankCard = {
        id: `blank-card-${likedCount / 5}`,
        type: "blank",
      };

      // Insert the blank card at the beginning of the array
      // setMovies((prevMovies) => [blankCard, ...prevMovies]);

      // // Reset activeIndex to 0 to show the blank card first
      // activeIndex.value = 0;
      // Replace all movies with just the blank card
      setMovies([blankCard]);

      // Reset activeIndex to 0 to show the blank card
      activeIndex.value = 0;
      setLastLikedCount(likedCount);
    }
  }, [likedCount, lastLikedCount]);

  return (
    <SafeAreaProvider className="flex-1 justify-center items-center">
      <AppGradient style={undefined}>
        <View className="flex-1 items-center top-20">
          <Stack.Screen options={{ headerShown: false }} />
          {movies.map((movie, index) => (
            <ImageCard
              key={`${movie.id}-${index}`}
              movie={movie}
              numOfCards={movies.length}
              index={index}
              activeIndex={activeIndex}
            />
          ))}
        </View>
        <ActionButtons
          buttons={[
            {
              icon: "times",
              onPress: () => console.log("Pressed on the left button"),
            },
            {
              icon: "star",
              onPress: () => console.log("Pressed on the up button"),
            },
            {
              icon: "heart",
              onPress: () => console.log("Pressed on the right button"),
            },
          ]}
          containerStyle={globalStyles.dupActionButtonStyle}
        />
      </AppGradient>
    </SafeAreaProvider>
  );
};

export default HomeScreen;
