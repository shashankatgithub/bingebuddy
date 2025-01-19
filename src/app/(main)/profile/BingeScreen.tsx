import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { MOVIE_IMAGE_BASE_URL } from "@/src/constants/Configuration";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppGradient } from "@/src/components/atoms/CustomGradients";

const MovieSection = ({ title, movies }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setExpanded((prev) => !prev)}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={20}
          color="white"
          style={{ paddingRight: 10 }}
        />
      </TouchableOpacity>

      <FlatList
        key={expanded ? "vertical" : "horizontal"}
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={expanded ? styles.movieCard : styles.movieCardHorizontal}
          >
            <Image
              source={{
                uri: `${MOVIE_IMAGE_BASE_URL}${item.poster_path}`,
              }}
              style={styles.movieImage}
            />
          </View>
        )}
        horizontal={!expanded}
        numColumns={expanded ? 3 : 1}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const BingeScreen = ({ movies }) => {
  const sections = [
    { id: "1", title: "Watchlist", movies },
    { id: "2", title: "Liked", movies },
    { id: "3", title: "Already Watched", movies },
  ];

  return (
    <AppGradient style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 ,paddingTop:5}} edges={["left", "right", "bottom"]}>
        <FlatList
          data={sections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MovieSection title={item.title} movies={item.movies} />
          )}
        />
      </SafeAreaView>
    </AppGradient>
  );
};

const styles = StyleSheet.create({
  sectionContainer: { marginBottom: 10 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    padding: 10,
  },
  movieCard: { alignItems: "center" },
  movieCardHorizontal: { alignItems: "center" },
  movieImage: { width: 140, height: 210 },
});

export default BingeScreen;
