import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  GestureDetector,
  Gesture,
  ScrollView,
} from "react-native-gesture-handler";
import CardDetailsModal from "../organisms/CardDetailsModal";
import { useDispatch, useSelector } from "react-redux";

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useTapGesture, usePanGesture } from "../molecules/Gestures";
import {
  MOVIE_IMAGE_BASE_URL,
  SUPPORTED_GENRES,
} from "@/src/constants/Configuration";
import { ImageCardType } from "../atoms/types";
import {
  handleSwipeLeft,
  handleSwipeRight,
  handleSwipeUp,
} from "../molecules/SwipeHandler";
import ActionButtons from "../organisms/ActionButtons";
import { globalStyles } from "@/src/styles";
import { addToWatchlist } from "@/src/state/userSlice";

const screenWidth = Dimensions.get("screen").width;

export const imageCardWidth = screenWidth * 0.9;

const ImageCard = ({
  movie,
  numOfCards,
  index,
  activeIndex,
}: ImageCardType) => {
  const isBlankCard = movie.type === "blank";
  const dispatch = useDispatch();
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovies, setSelectedMovies] = useState<{
    [key: number]: boolean;
  }>({});

  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => {
        const genre = SUPPORTED_GENRES.find((g) => g.id === id);
        return genre ? genre.name : null; // If not found, return null
      })
      .filter(Boolean) // Remove null values
      .join(", "); // Join names with commas
  };
  const { likes, dislikes, alreadyWatched } = useSelector(
    (state: any) => state.user
  );

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

  const handleSelectMovie = (movieId: number) => {
    setSelectedMovies((prev) => ({ ...prev, [movieId]: !prev[movieId] }));
  };

  // Function to add selected movies to watchlist (you need to implement this action)
  const saveToWatchList = () => {
    Object.keys(selectedMovies).forEach((movieId) => {
      if (selectedMovies[movieId]) {
        // Assuming you have an action to add to watchlist in your Redux slice
        dispatch(addToWatchlist(movie)); // Replace with actual movie data
      }
    });
    setSelectedMovies({});
  };

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
  const regenerateRecommendations = () => {
    // Here you would call whatever function or dispatch an action to refresh movie recommendations
    console.log("Regenerating recommendations");
  };
  const buttonTapGesture = Gesture.Tap().onStart(() => {
    console.log("Button pressed");
  });

  if (isBlankCard) {
    return (
      <Animated.View style={[styles.card, animatedCard]}>
        <View style={styles.blankContainer}>
          <ScrollView
            style={{ width: "100%" }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <Text style={[styles.blankText, styles.sectionTitle]}>
              Liked Movies:
            </Text>
            <View style={styles.movieGrid}>
              {likes.map((movie: any, i: number) => (
                <TouchableOpacity
                  key={`liked-${i}`}
                  style={[
                    styles.movieTile,
                    selectedMovies[movie.id] && styles.selectedTile,
                  ]}
                  onPress={() => handleSelectMovie(movie.id)}
                >
                  <Image
                    source={{
                      uri: `${MOVIE_IMAGE_BASE_URL}${movie.poster_path}`,
                    }}
                    style={styles.moviePosterLarge}
                  />
                  {selectedMovies[movie.id] && (
                    <View style={styles.checkmarkOverlay}>
                      <Text style={styles.checkmarkText}>✔</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Render Disliked Movies Section Only If There Are Disliked Movies */}
            {dislikes.length > 0 && (
              <>
                <Text style={[styles.blankText, styles.sectionTitle]}>
                  Disliked Movies:
                </Text>
                <View style={styles.movieGrid}>
                  {dislikes.map((movie: any, i: number) => (
                    <TouchableOpacity
                      key={`disliked-${i}`}
                      style={[
                        styles.movieTile,
                        selectedMovies[movie.id] && styles.selectedTile,
                      ]}
                      onPress={() => handleSelectMovie(movie.id)}
                    >
                      <Image
                        source={{
                          uri: `${MOVIE_IMAGE_BASE_URL}${movie.poster_path}`,
                        }}
                        style={styles.moviePosterLarge}
                      />
                      {selectedMovies[movie.id] && (
                        <View style={styles.checkmarkOverlay}>
                          <Text style={styles.checkmarkText}>✔</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            {/* Render Already Watched Section Only If There Are Watched Movies */}
            {alreadyWatched.length > 0 && (
              <>
                <Text style={[styles.blankText, styles.sectionTitle]}>
                  Already Watched:
                </Text>
                <View style={styles.movieGrid}>
                  {alreadyWatched.map((movie: any, i: number) => (
                    <TouchableOpacity
                      key={`watched-${i}`}
                      style={[
                        styles.movieTile,
                        selectedMovies[movie.id] && styles.selectedTile,
                      ]}
                      onPress={() => handleSelectMovie(movie.id)}
                    >
                      <Image
                        source={{
                          uri: `${MOVIE_IMAGE_BASE_URL}${movie.poster_path}`,
                        }}
                        style={styles.moviePosterLarge}
                      />
                      {selectedMovies[movie.id] && (
                        <View style={styles.checkmarkOverlay}>
                          <Text style={styles.checkmarkText}>✔</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={saveToWatchList}
              style={[
                styles.button,
                !Object.values(selectedMovies).some((value) => value) &&
                  styles.disabledButton,
              ]}
              disabled={!Object.values(selectedMovies).some((value) => value)}
            >
              <Text style={styles.buttonText}>Add to Watchlist</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={regenerateRecommendations}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Regenerate Recommendations</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  }

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
          pointerEvents="none"
        />

        <View style={styles.footer} pointerEvents="box-none">
          <Text style={styles.name}>{movie.title}</Text>
          <Text style={styles.genre}>{getGenreNames(movie.genre_ids)}</Text>
          <Text style={styles.yearAndDuration}>
            {movie.release_date?.split("-")[0]}, {movie.runtime}m
          </Text>
          <GestureDetector gesture={buttonTapGesture}>
            <View style={{ zIndex: 10 }}>
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
                containerStyle={globalStyles.actionButtonStyle}
              />
            </View>
          </GestureDetector>
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
    aspectRatio: 1 / 1.9,
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
  blankContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
  },
  blankText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "gray",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  movieItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  moviePoster: {
    width: 50,
    height: 75,
    resizeMode: "cover",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  movieGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  movieTile: {
    width: "30%", // Three columns
    aspectRatio: 2 / 3, // Adjust for movie poster size
    marginBottom: 10,
    position: "relative",
  },
  moviePosterLarge: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  selectedTile: {
    borderWidth: 2,
    borderColor: "#007BFF",
  },
  checkmarkOverlay: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    padding: 2,
  },
  checkmarkText: {
    color: "white",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#d3d3d3",
  },
});

export default ImageCard;
