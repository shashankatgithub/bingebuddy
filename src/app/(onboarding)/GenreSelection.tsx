import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  AppGradient,
  PrimaryGradient,
} from "@/src/components/atoms/CustomGradients";
import { SUPPORTED_GENRES } from "@/src/constants/Configuration";
import { getFromMMKV, saveToMMKV } from "@/src/utils/mmkv";
import { StorageKeys } from "@/src/utils/StorageKeys";
import { useDispatch } from "react-redux";
import { setPerson } from "@/src/state/userSlice";
import { useLazyGetActorsQuery } from "@/src/api/bingeService";

const movieGenres = SUPPORTED_GENRES;

const GenreSelection = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [fetchActors, { isFetching }] = useLazyGetActorsQuery();
  const doneScale = useSharedValue(1);
  const dispatch = useDispatch();
  const router = useRouter();

  const toggleSelection = (id: number) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres(selectedGenres.filter((genreId) => genreId !== id));
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
  };

  const filteredGenres = movieGenres.filter((genre) =>
    genre.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDonePress = async () => {
    doneScale.value = withSpring(1.2, {}, () => {
      doneScale.value = withSpring(1);
    });
    console.log("Selected Movie Genre IDs:", selectedGenres);
    saveToMMKV(StorageKeys.GENRES, selectedGenres);
    const languages = getFromMMKV(StorageKeys.LANGUAGES);
    if (!languages || selectedGenres.length === 0) {
      console.log("Languages not selected yet");
      return;
    }
    try {
      const artistsData = await fetchActors({
        genres: selectedGenres.join("|"),
        languages: languages.join("|"),
      }).unwrap();
      dispatch(setPerson(artistsData));
      router.navigate("/ArtistSelection");
    } catch (error) {
      console.error("Error fetching actors:", error);
    }
  };

  const handleClearQuery = () => {
    setSearchQuery("");
  };

  return (
    <AppGradient style={undefined}>
      <SafeAreaView className="flex-1 ">
        {/* Header */}
        <View className="px-4 pb-10 w-full">
          <Text className="text-[#EAECEE]  text-2xl font-bold text-center mb-3">
            Choose 2 or more movie genres of the content you prefer.
          </Text>
          {/* Search Bar */}
          <View className="mt-1 bg-gray-700 rounded-full flex-row items-center py-2 w-full">
            <TextInput
              placeholder="Search"
              placeholderTextColor="#EAECEE"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 text-white py-2 text-lg px-10"
            />
            {searchQuery.trim().length > 0 && (
              <Pressable onPress={handleClearQuery} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>✕</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Genre List */}
        {isFetching ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text className="text-white mt-2">Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredGenres}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
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
                  style={[
                    styles.circleContainer,
                    selectedGenres.includes(item.id)
                      ? styles.selectedBorder
                      : styles.defaultBorder,
                  ]}
                >
                  <Text className="text-black text-xl font-bold">
                    {item.name.slice(0, 2).toUpperCase()}
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
        )}

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
    </AppGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circleContainer: {
    width: 96, // Equivalent to "w-32" (32 * 4 = 128)
    height: 96, // Equivalent to "h-32" (32 * 4 = 128)
    borderRadius: 48, // Half of the width/height for a perfect circle
    backgroundColor: "#D1D5DB", // Equivalent to "bg-gray-300"
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    textAlign: "center", // For text alignment inside
  },
  selectedBorder: {
    borderWidth: 4, // Equivalent to "border-4"
    borderColor: "#6B7280", // Equivalent to "border-gray-500"
  },
  defaultBorder: {
    borderWidth: 2, // Equivalent to "border-2"
    borderColor: "#FFFFFF", // Equivalent to "border-white"
  },
  clearButton: {
    marginRight: 20,
    marginTop: 11,
  },
  clearButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default GenreSelection;
