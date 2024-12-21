import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
  SafeAreaView,
  StyleSheet
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PrimaryGradient, YouTubeGradient } from "@/src/components/atoms/CustomGradients";
 
const movieGenres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Drama" },
  { id: 4, name: "Horror" },
  { id: 5, name: "Romance" },
  { id: 6, name: "Sci-Fi" },
  { id: 7, name: "Documentary" },
  { id: 8, name: "Thriller" },
  { id: 9, name: "Adventure" },
  { id: 10, name: "Fantasy" },
  { id: 11, name: "Animation" },
  { id: 12, name: "Mystery" },
];

const GenreSelection = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const doneScale = useSharedValue(1);
  const router = useRouter();

  const toggleSelection = (id: number) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres(
        selectedGenres.filter((genreId) => genreId !== id)
      );
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
  };

  const filteredGenres = movieGenres.filter((genre) =>
    genre.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDonePress = () => {
    doneScale.value = withSpring(1.2, {}, () => {
      doneScale.value = withSpring(1);
    });
    console.log("Selected Movie Genre IDs:", selectedGenres);
    router.navigate("/ArtistSelection");
  };

  return (
    <PrimaryGradient  style={styles.gradientContainer}>
    <SafeAreaView className="flex-1 ">
      {/* Header */}
      <View className="px-4 pt-6 pb-10">
        <Text className="text-[#EAECEE]  text-2xl font-bold text-center mb-3">
          Choose 2 or more movie genres you like.
        </Text>
        {/* Search Bar */}
        <View className="mt-1 bg-gray-700 rounded-full flex-row items-center px-4 py-2">
          <TextInput
            placeholder="Search"
            placeholderTextColor="#EAECEE"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-white py-2"
          />
        </View>
      </View>

      {/* Genre List */}
      <FlatList
        data={filteredGenres}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 30 }}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            key={item.id}
            onPress={() => toggleSelection(item.id)}
            className="relative items-center mb-6"
          >
            {/* Genre Initial */}
            <View
              className={`w-32 h-32 rounded-full items-center justify-center text-center bg-gray-300 ${
                selectedGenres.includes(item.id)
                  ? "border-4 border-gray-500"
                  : "border-2 border-white"
              }`}
            >
              <Text className="text-black text-4xl font-bold">
                {item.name[0]}
              </Text>
            </View>

            {/* Tick Mark */}
            {selectedGenres.includes(item.id) && (
              <View className="absolute top-2 right-2 w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                <Text className="text-white font-bold text-lg">✓</Text>
              </View>
            )}

            {/* Genre Name */}
            <Text className="text-[#EAECEE] text-xl mt-2">{item.name}</Text>
          </Pressable>
        )}
      />

      {/* Navigation Arrows */}
      <View className="absolute bottom-10 left-0 right-0 flex-row justify-between px-10">
        {/* Backward Arrow */}
        <Pressable
          className="bg-orange-500 rounded-full w-12 h-12 items-center justify-center"
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back-sharp" size={24} color="black" />
        </Pressable>

        {/* Forward Arrow */}
        <Pressable
          className={`rounded-full w-12 h-12 items-center justify-center ${
            selectedGenres.length >= 2 ? "bg-green-500" : "bg-gray-300"
          }`}
          disabled={selectedGenres.length < 2}
          onPress={handleDonePress}
        >
          <Ionicons name="chevron-forward-sharp" size={24} color="black" />
        </Pressable>
      </View>
    </SafeAreaView>
    </PrimaryGradient>
  );
};


const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%", // Full-screen gradient
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});


export default GenreSelection;
