import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { AppGradient } from "@/src/components/atoms/CustomGradients";
import imagePath from "@/src/constants/imagePath";
import { useSelector } from "react-redux";
import { MOVIE_IMAGE_BASE_URL } from "@/src/constants/Configuration";

const generateFunnyName = () => {
  const funnyNames = [
    "Captain Popcorn",
    "Ticket Taster",
    "Cinematic Genius",
    "Movie Buff Extraordinaire",
  ];
  return funnyNames[Math.floor(Math.random() * funnyNames.length)];
};
const MovieSection = ({ title, movies }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.sectionContainer}>
      {/* Section Header */}
      <Pressable
        style={styles.sectionHeader}
        onPress={() => setExpanded((prev) => !prev)}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color="white"
        />
      </Pressable>

      {/* Movie List */}
      <FlatList
        key={expanded ? "vertical" : "horizontal"} // Force re-render when layout changes
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={expanded ? styles.movieCard : styles.movieCardHorizontal}
          >
            <Image
              source={{
                uri: `${MOVIE_IMAGE_BASE_URL}${item.poster_path}`,
                method: "POST",
                headers: {
                  Pragma: "no-cache",
                },
                body: "Your Body goes here",

                //uri: movie.poster_path
              }}
              style={styles.movieImage}
            />
            <Text style={styles.movieTitle}>{item.title}</Text>
          </View>
        )}
        horizontal={!expanded}
        numColumns={expanded ? 3 : 1} // Show columns when expanded
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
const ProfileScreen = () => {
  const reduxCurrentCards = useSelector(
    (state: any) => state.user.currentCards
  );
  console.log(reduxCurrentCards);
  const userLoggedIn = false; // Replace with actual login state
  const userName = userLoggedIn ? "John Doe" : generateFunnyName();

  const sections = [
    { id: "1", title: "Watchlist", movies: reduxCurrentCards },
    { id: "2", title: "Liked", movies: reduxCurrentCards },
    { id: "3", title: "Already Watched", movies: reduxCurrentCards },
  ];

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <AppGradient style={undefined}>
        <FlatList
          data={sections}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View style={styles.userInfoContainer}>
              <Image source={imagePath.artist_img} style={styles.userImage} />
              <Text style={styles.userName}>{userName}</Text>
            </View>
          }
          renderItem={({ item }) => (
            <MovieSection title={item.title} movies={item.movies} />
          )}
        />
      </AppGradient>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userInfoContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 70,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  movieCard: {
    margin: 5,
    alignItems: "center",
    width: "30%", // Adjust for 3 columns
  },
  movieCardHorizontal: {
    marginRight: 10,
    alignItems: "center",
  },
  movieImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  movieTitle: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
  },
});

export default ProfileScreen;
