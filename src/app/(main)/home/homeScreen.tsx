import React from "react";
import ImageCard from "@/src/components/pages/ImageCard";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import {
  useAnimatedReaction,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";
import { globalStyles, gradients } from "@/src/styles";
import ActionButtons from "@/src/components/organisms/ActionButtons";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "@/src/components/atoms/types";

type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, "Home">;


const HomeScreen: React.FC<HomeScreenProps> = ({ route }) => {
  const { initialCards = [] } = route.params || {};
  console.log("Initial Cards:", initialCards);
  //const dispatch = useDispatch();
  const reduxCurrentCards = useSelector(
    (state: any) => state.user.currentCards
  );
  //const currentCards = useSelector((state: any) => state.user.currentCards);
  const currentCards =
    initialCards && initialCards.length > 0 ? initialCards : reduxCurrentCards;

  //const nextCards = useSelector((state: any) => state.user.nextCards);
  const [movies, setMovies] = useState(currentCards);
  const activeIndex = useSharedValue(0);
  const [index, setIndex] = useState(0);

  useAnimatedReaction(
    () => activeIndex.value,
    (value, prevValue) => {
      if (Math.floor(value) !== index) {
        runOnJS(setIndex)(Math.floor(value));
      }
    }
  );
  useEffect(() => {
    //console.log("Current Cards:", currentCards);
    setMovies(currentCards);
  }, [currentCards]);

  useEffect(() => {
    if (index > movies.length - 3) {
      //TODO Here equate with last profile index and show some card that suggestion are over.
      console.warn("Last 2 cards remaining. Fetch more!");
      //setMovies((currentCard) => [...currentCard, ...currentCards.reverse()]);
      setMovies((currentMovies) => [
        ...currentMovies,
        ...[...currentCards].reverse(),
      ]);
    }
  }, [index]);

  return (
    <LinearGradient
      colors={gradients.appGradient.colors}
      start={gradients.appGradient.start}
      end={gradients.appGradient.end}
      style={globalStyles.gradientContainer}
    >
      <View className="flex-1 items-center justify-center">
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
        <ActionButtons
          times={undefined}
          star={undefined}
          heart={undefined}
          style={globalStyles.actionButtonStyle}
        ></ActionButtons>
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;
