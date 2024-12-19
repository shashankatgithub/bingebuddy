import React from "react";
import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Reusable NavigationBar component
export default function NavigationBar({ onSearch, onFilter, onDiscover, onProfile }) {
  return (
    <View className="absolute px-16 bottom-1 w-full h-20  flex-row justify-between items-center">
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
    </View>
  );
}
