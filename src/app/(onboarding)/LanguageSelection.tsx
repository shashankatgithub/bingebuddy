import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PrimaryGradient } from "@/src/components/atoms/CustomGradients";
import { SUPPORTED_LANGUAGES } from "@/src/constants/Configuration";
import { saveToMMKV } from "@/src/utils/mmkv";
import { StorageKeys } from "@/src/utils/StorageKeys";

const languages = SUPPORTED_LANGUAGES;

const LanguageSelection = () => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const doneScale = useSharedValue(1);
  const router = useRouter();

  const toggleSelection = (iso_639_1: string) => {
    if (selectedLanguages.includes(iso_639_1)) {
      setSelectedLanguages(
        selectedLanguages.filter((languageId) => languageId !== iso_639_1)
      );
    } else {
      setSelectedLanguages([...selectedLanguages, iso_639_1]);
    }
  };

  const filteredLanguages = languages.filter((language) =>
    language.english_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDonePress = () => {
    doneScale.value = withSpring(1.2, {}, () => {
      doneScale.value = withSpring(1);
    });
    console.log("Selected Language Codes:", selectedLanguages);
    saveToMMKV(StorageKeys.LANGUAGES, selectedLanguages);
    router.navigate("/GenreSelection");
  };

  return (
    <PrimaryGradient style={styles.gradientContainer}>
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="px-6 pb-10">
          <Text className="text-[#EAECEE] text-2xl font-bold text-center mb-3">
            Choose 2 or more languages you prefer the content in.
          </Text>
          {/* Search Bar */}
          <View className="mt-1 bg-gray-700 rounded-full flex-row items-center px-4 py-2">
            <TextInput
              placeholder="Search"
              placeholderTextColor="#EAECEE"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 text-white py-2 text-lg"
            />
          </View>
        </View>

        {/* Language List */}
        <FlatList
          data={filteredLanguages}
          keyExtractor={(item) => item.iso_639_1.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "space-evenly",
            paddingHorizontal: 1,
          }}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              key={item.iso_639_1}
              onPress={() => toggleSelection(item.iso_639_1)}
              className="relative items-center mb-6"
            >
              {/* Language Initial */}
              <View
                style={[
                  styles.circleContainer,
                  selectedLanguages.includes(item.iso_639_1)
                    ? styles.selectedBorder
                    : styles.defaultBorder,
                ]}
              >
                <Text className="text-black text-xl font-bold">
                  {item.english_name.slice(0, 2).toUpperCase()}
                </Text>
              </View>

              {/* Tick Mark */}
              {selectedLanguages.includes(item.iso_639_1) && (
                <View className="absolute top-2 right-2 w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                  <Text className="text-white font-bold text-lg">✓</Text>
                </View>
              )}

              {/* Language Name */}
              <Text className="text-[#EAECEE] text-xl mt-2">
                {item.english_name}
              </Text>
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
              selectedLanguages.length >= 2 ? "bg-green-500" : "bg-gray-300"
            }`}
            disabled={selectedLanguages.length < 2}
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
  circleContainer: {
    width: 96, // Equivalent to "w-32" (32 * 4 = 128)
    height: 96, // Equivalent to "h-32" (32 * 4 = 128)
    borderRadius: 48, // Half of the width/height for a perfect circle
    backgroundColor: "#D1D5DB", // Equivalent to "bg-gray-300"
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    textAlign: "center", // For text alignment inside
  },
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
  selectedBorder: {
    borderWidth: 4, // Equivalent to "border-4"
    borderColor: "#6B7280", // Equivalent to "border-gray-500"
  },
  defaultBorder: {
    borderWidth: 2, // Equivalent to "border-2"
    borderColor: "#FFFFFF", // Equivalent to "border-white"
  },
});

export default LanguageSelection;
