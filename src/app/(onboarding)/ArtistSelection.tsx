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
import imagePath from "@/src/constants/imagePath";
import { AppGradient, PrimaryGradient } from "@/src/components/atoms/CustomGradients";
import { useSelector } from "react-redux";
import { ARTIST_IMAGE_BASE_URL } from "@/src/constants/Configuration";
import { Image } from "expo-image";
import { StorageKeys } from "@/src/utils/StorageKeys";
import { saveToMMKV } from "@/src/utils/mmkv";


const ArtistSelection = () => {
  const blurhash = "L87KC-NG01?Ge-fkbbf50gt6~AIo";
  const [selectedPerson, setSelectedPerson] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const doneScale = useSharedValue(1);
  const router = useRouter();
  const artists = useSelector((state: any) => state.user.person);

  const getDisplayName = (name) => {
    if (name.length > 10) {
      const nameParts = name.split(" ");
      if (nameParts.length > 1) {
        const fullName = `${nameParts[0]} ${nameParts[1]}`;
        if (fullName.length > 10) {
          return nameParts[0] + " " + nameParts[1][0]; // Only first name if combined length > 10
        }
        return fullName;
      }
      return nameParts[0]; // Only first name if no middle name exists
    }
    return name; // Full name if less than or equal to 15 characters
  };

  const toggleSelection = (id: number) => {
    if (selectedPerson.includes(id)) {
      setSelectedPerson(selectedPerson.filter((artistId) => artistId !== id));
    } else {
      setSelectedPerson([...selectedPerson, id]);
    }
  };

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDonePress = () => {
    doneScale.value = withSpring(1.2, {}, () => {
      doneScale.value = withSpring(1);
    });
    console.log("Selected Person IDs:", selectedPerson);
    saveToMMKV(StorageKeys.PERSON, selectedPerson);
    router.navigate("/SignUp");
  };

  const handleClearQuery = () => {
    setSearchQuery("");
  };

  return (
    <AppGradient style={undefined}>
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="px-4 pb-10 w-full">
          <Text className="text-[#EAECEE] text-2xl font-bold text-center mb-3">
            Choose 3 or more artists you like.
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
          </View>
        </View>

        {/* Artist List */}
        <FlatList
          data={filteredArtists}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
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
                source={
                  item.profile_path &&
                  typeof item.profile_path === "string" &&
                  item.profile_path.trim() !== ""
                    ? {
                        uri: `${ARTIST_IMAGE_BASE_URL}${item.profile_path}`,
                        method: "POST",
                        headers: {
                          Pragma: "no-cache",
                        },
                        body: "Your Body goes here",
                      } // Remote image
                    : imagePath.artist_img // Local fallback image (should be imported or required)
                }
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={500}
                style={[
                  styles.artistImage, // Base style
                  selectedPerson.includes(item.id)
                    ? styles.selectedBorder // Selected border style
                    : styles.defaultBorder, // Default border style
                ]}
              />
              {/* Tick Mark */}
              {selectedPerson.includes(item.id) && (
                <View className="absolute top-2 right-2 w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                  <Text className="text-white font-bold text-lg">✓</Text>
                </View>
              )}
              {/* Artist Name */}
              <Text className="text-[#EAECEE] text-xl mt-2">{getDisplayName(item.name)}</Text>
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
              selectedPerson.length >= 3 ? "bg-green-500" : "bg-gray-300"
            }`}
            disabled={selectedPerson.length < 3}
            onPress={handleDonePress}
          >
            <Ionicons name="chevron-forward-sharp" size={24} color="black" />
          </Pressable>
        </View>
      </SafeAreaView>
    </AppGradient>
  );
};

export default ArtistSelection;

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
  artistImage: {
    width: 96, // w-32
    height: 96, // h-32
    borderRadius: 48, // rounded-full
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
    borderWidth: 4, // border-4
    borderColor: "#6b7280", // border-gray-500
  },
  defaultBorder: {
    borderWidth: 2, // border-2
    borderColor: "#ffffff", // border-white
  },
});
