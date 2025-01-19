import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { MOVIE_IMAGE_BASE_URL } from "@/src/constants/Configuration";

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
    <FlatList
      data={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MovieSection title={item.title} movies={item.movies} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  sectionContainer: { marginBottom: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "white" },
  movieCard: { margin: 10, alignItems: "center" },
  movieCardHorizontal: { marginRight: 10, alignItems: "center" },
  movieImage: { width: 80, height: 135, borderRadius: 10 },
});

export default BingeScreen;
