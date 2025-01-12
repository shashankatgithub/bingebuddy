import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import CardDetailsModal from "../organisms/CardDetailsModal";
import { useDispatch } from "react-redux";

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useTapGesture, usePanGesture } from "../molecules/Gestures";
import { MOVIE_IMAGE_BASE_URL, SUPPORTED_GENRES } from "@/src/constants/Configuration";
import { ImageCardType } from "../atoms/types";
import { handleSwipeLeft, handleSwipeRight, handleSwipeUp } from "../molecules/SwipeHandler";

const screenWidth = Dimensions.get("screen").width;

export const imageCardWidth = screenWidth * 0.9;

const ImageCard = ({ movie, numOfCards, index, activeIndex }: ImageCardType) => {
  const dispatch = useDispatch();
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const [modalVisible, setModalVisible] = useState(false);

  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => {
        const genre = SUPPORTED_GENRES.find((g) => g.id === id);
        return genre ? genre.name : null; // If not found, return null
      })
      .filter(Boolean) // Remove null values
      .join(", "); // Join names with commas
  };

  const animatedCard = useAnimatedStyle(() => ({
    opacity: interpolate(
      activeIndex.value,
      [index - 1, index, index + 1],
      [1 - 1 / 5, 1, 1]
    ),
    transform: [
      {
        scale: interpolate(
          activeIndex.value,
          [index - 1, index, index + 1],
          [0.95, 1, 1]
        ),
      },
      { translateY: translationY.value },
      {
        translateX: translationX.value,
      },
      {
        rotateZ: `${interpolate(
          translationX.value,
          [-screenWidth / 2, 0, screenWidth / 2],
          [-20, 0, 20]
        )}deg`,
      },
    ],
  }));

  const tapGesture = useTapGesture(() => {
    console.log("Tapped");
    setModalVisible(true);
  });

  const panGesture = usePanGesture(
    translationX,
    translationY,
    activeIndex,
    index,
    movie,
    handleSwipeRight,
    handleSwipeLeft,
    handleSwipeUp,
    dispatch
  );

  return (
    <GestureDetector gesture={Gesture.Race(tapGesture, panGesture)}>
      <Animated.View
        style={[
          styles.card,
          animatedCard,
          {
            zIndex: numOfCards - index,
          },
        ]}
      >
        <Image
          style={[StyleSheet.absoluteFillObject, styles.image]}
          source={{ 
            uri: `${MOVIE_IMAGE_BASE_URL}${movie.poster_path}`,
                        method: "POST",
                        headers: {
                          Pragma: "no-cache",
                        },
                        body: "Your Body goes here",
                      
            
            //uri: movie.poster_path 
          }}
        />
        <LinearGradient
          colors={[
            "transparent", // Start fully transparent
            "rgba(0,0,0,0.6)", // Midpoint is semi-transparent black
            "rgba(0,0,0,1)", // End fully opaque black
          ]}
          style={[StyleSheet.absoluteFillObject, styles.overlay]}
        />

        <View style={styles.footer}>
          <Text style={styles.name}>{movie.title}</Text>
          <Text style={styles.genre}>{getGenreNames(movie.genre_ids)}</Text>
          <Text style={styles.yearAndDuration}>{movie.release_date?.split("-")[0]}, {movie.runtime}m</Text>
        </View>
        <CardDetailsModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          movie={movie}
        />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  card: {
    width: imageCardWidth,
    aspectRatio: 1 / 1.87,
    borderRadius: 15,
    justifyContent: "flex-end",

    position: "absolute",

    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  image: {
    borderRadius: 15,
  },
  overlay: {
    top: "50%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  footer: {
    padding: 10,
  },
  name: {
    padding: 5,
    fontWeight: "bold",
    fontVariant: ["small-caps"],
    fontSize: 30,
    color: "white",
    fontFamily: "InterBold",
  },
  genre: {
    padding: 5,
    fontSize: 20,
    color: "white",
    fontFamily: "InterBold",
  },
  yearAndDuration: {
    padding: 5,
    fontSize: 20,
    color: "white",
    fontFamily: "InterBold",
  },
});

export default ImageCard;
