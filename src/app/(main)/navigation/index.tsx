import React from "react";
import { Pressable, Dimensions, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

// Define prop types
interface NavigationBarProps {
  onSearch?: () => void;
  onFilter?: () => void;
  onDiscover?: () => void;
  onProfile?: () => void;
  style?: ViewStyle; // Allow passing styles to the container
}

export default function NavigationBar({
  onSearch,
  onFilter,
  onDiscover,
  onProfile,
  style,
}) {
  return (
    <SafeAreaView
      style={[
        {
          paddingBottom: height * 0.03, // Dynamic padding bottom
        },
        style,
      ]}
      className="absolute px-16 bottom-1 w-full  flex-row justify-between items-center"
    >
      {/* Search Button */}
      <Pressable onPress={onSearch}>
        <Ionicons name="search" size={30} color="white" />
      </Pressable>
      {/* Filter Button */}
      <Pressable onPress={onFilter}>
        <Ionicons name="filter" size={30} color="white" />
      </Pressable>
      {/* Discover Button */}
      <Pressable onPress={onDiscover}>
        <Ionicons name="compass" size={30} color="white" />
      </Pressable>
      {/* Profile Button */}
      <Pressable onPress={onProfile}>
        <Ionicons name="person" size={30} color="white" />
      </Pressable>
    </SafeAreaView>
  );
}
