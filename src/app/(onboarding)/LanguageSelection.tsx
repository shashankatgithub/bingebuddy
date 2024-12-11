import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
  SafeAreaView,
} from "react-native";
import { TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useRouter } from 'expo-router';

const languages = [
  { id: 1, name: "English" },
  { id: 2, name: "Spanish" },
  { id: 3, name: "French" },
  { id: 4, name: "German" },
  { id: 5, name: "Chinese" },
  { id: 6, name: "Japanese" },
  { id: 7, name: "Korean" },
  { id: 8, name: "Hindi" },
  { id: 9, name: "Russian" },
  { id: 10, name: "Arabic" },
  { id: 11, name: "Portuguese" },
  { id: 12, name: "Italian" },
];

const LanguageSelection = () => {
  const [selectedLanguages, setSelectedLanguages] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const doneScale = useSharedValue(1);
  const router = useRouter();

  const toggleSelection = (id: number) => {
    if (selectedLanguages.includes(id)) {
      setSelectedLanguages(
        selectedLanguages.filter((languageId) => languageId !== id)
      );
    } else {
      setSelectedLanguages([...selectedLanguages, id]);
    }
  };

  const filteredLanguages = languages.filter((language) =>
    language.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDonePress = () => {
    doneScale.value = withSpring(1.2, {}, () => {
      doneScale.value = withSpring(1);
    });
    console.log("Selected Language IDs:", selectedLanguages);
    router.navigate("GenreSelection");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-6 pb-10">
        <Text className="text-black text-2xl font-bold text-center mb-3">
          Choose 2 or more languages you prefer the content in.
        </Text>
        {/* Search Bar */}
        <View className="mt-1 bg-gray-700 rounded-full flex-row items-center px-4 py-2">
          <TextInput
            placeholder="Search"
            placeholderTextColor="gray"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-white py-2"
          />
        </View>
      </View>

      {/* Language List */}
      <FlatList
        data={filteredLanguages}
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
            {/* Language Initial */}
            <View
              className={`w-32 h-32 rounded-full items-center justify-center text-center bg-gray-300 ${
                selectedLanguages.includes(item.id)
                  ? "border-4 border-gray-500"
                  : "border-2 border-white"
              }`}
            >
              <Text className="text-black text-4xl font-bold">
                {item.name[0]}
              </Text>
            </View>

            {/* Tick Mark */}
            {selectedLanguages.includes(item.id) && (
              <View className="absolute top-2 right-2 w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                <Text className="text-white font-bold text-lg">✓</Text>
              </View>
            )}

            {/* Language Name */}
            <Text className="text-black text-sm mt-2">{item.name}</Text>
          </Pressable>
        )}
      />

      {/* Done Button */}
      {selectedLanguages.length >= 2 && (
        <View className="absolute bottom-10 left-0 right-0 items-center">
          <TouchableOpacity
            className="bg-gray-500 rounded-full px-10 py-3"
            onPress={handleDonePress}
          >
            <Text className="text-white font-bold text-lg">DONE</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default LanguageSelection;
