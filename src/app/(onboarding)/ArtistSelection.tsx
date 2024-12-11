import React, { useState } from "react";
import {
  View,
  Text,
  Image,
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
import imagePath from "@/src/constants/imagePath";
import { useRouter } from 'expo-router';
const artists = [
  { id: 1, name: "Eminem", image: imagePath.artist_img },
  { id: 2, name: "Drake", image: imagePath.artist_img },
  { id: 3, name: "Kanye West", image: imagePath.artist_img },
  { id: 4, name: "Post Malone", image: imagePath.artist_img },
  { id: 5, name: "Travis Scott", image: imagePath.artist_img },
  { id: 6, name: "Kendrick Lamar", image: imagePath.artist_img },
  { id: 7, name: "Mac Miller", image: imagePath.artist_img },
  { id: 8, name: "J. Cole", image: imagePath.artist_img },
  { id: 9, name: "Childish Gambino", image: imagePath.artist_img },
  { id: 10, name: "Logic", image: imagePath.artist_img },
  { id: 11, name: "Lil Wayne", image: imagePath.artist_img },
  { id: 12, name: "Nicki Minaj", image: imagePath.artist_img },
  { id: 13, name: "Cardi B", image: imagePath.artist_img },
  { id: 14, name: "Tyler, The Creator", image: imagePath.artist_img },
  { id: 15, name: "Juice WRLD", image: imagePath.artist_img },
  { id: 16, name: "XXXTentacion", image: imagePath.artist_img },
  { id: 17, name: "Lil Uzi Vert", image: imagePath.artist_img },
  { id: 18, name: "A$AP Rocky", image: imagePath.artist_img },
  { id: 19, name: "Future", image: imagePath.artist_img },
  { id: 20, name: "Jay-Z", image: imagePath.artist_img },
];

const ArtistSelection = () => {
  const [selectedArtists, setSelectedArtists] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const doneScale = useSharedValue(1);
  const router = useRouter();

  const toggleSelection = (id: number) => {
    if (selectedArtists.includes(id)) {
      setSelectedArtists(selectedArtists.filter((artistId) => artistId !== id));
    } else {
      setSelectedArtists([...selectedArtists, id]);
    }
  };

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDonePress = () => {
    doneScale.value = withSpring(1.2, {}, () => {
      doneScale.value = withSpring(1);
    });
    console.log("Selected Artist IDs:", selectedArtists);
    router.navigate('SignUp');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-6 pb-10">
        <Text className="text-black text-2xl font-bold text-center mb-3">
          Choose 3 or more artists you like.
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

      {/* Artist List */}
      <FlatList
        data={filteredArtists}
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
            {/* Artist Image */}
            <Image
              source={item.image}
              className={`w-32 h-32 rounded-full ${
                selectedArtists.includes(item.id)
                  ? "border-4 border-gray-500"
                  : "border-2 border-white"
              }`}
            />
            {/* Tick Mark */}
            {selectedArtists.includes(item.id) && (
              <View className="absolute top-2 right-2 w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                <Text className="text-white font-bold text-lg">✓</Text>
              </View>
            )}
            {/* Artist Name */}
            <Text className="text-black text-sm mt-2">{item.name}</Text>
          </Pressable>
        )}
      />

      {/* Done Button */}
      {selectedArtists.length >= 3 && (
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

export default ArtistSelection;
