import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Slider from "@react-native-community/slider";
import * as Location from "expo-location";
import {
  setFilterGenres,
  setFilterLanguage,
  setFilterDuration,
  setFilterAvailableOn,
  setFilterLocation,
  clearFilters,
} from "@/src/state/filterSlice";
import { Ionicons } from "@expo/vector-icons";
import { AppGradient } from "@/src/components/atoms/CustomGradients";

const SUPPORTED_GENRES = [
  { id: "1", name: "Action" },
  { id: "2", name: "Comedy" },
  { id: "3", name: "Drama" },
];

const SUPPORTED_LANGUAGES = [
  { id: "en", name: "English" },
  { id: "hi", name: "Hindi" },
  { id: "ta", name: "Tamil" },
];

const SUPPORTED_PLATFORMS = [
  { id: "amazon", name: "Amazon Prime" },
  { id: "netflix", name: "Netflix" },
  { id: "hotstar", name: "Hotstar" },
  { id: "jio", name: "Jio Cinema" },
  { id: "youtube", name: "YouTube" },
];

const FilterScreen = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters); // Redux state
  const [expandedSection, setExpandedSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationError, setLocationError] = useState("");

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationError("Permission to access location was denied");
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync({});
      const userLocation = `Lat: ${coords.latitude}, Lon: ${coords.longitude}`;
      dispatch(setFilterLocation(userLocation));
      setLocationError("");
    } catch (error) {
      setLocationError("Failed to fetch location");
      console.error(error);
    }
  };

  const renderCheckbox = (data, selected, onSelectChange) => (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          style={styles.checkboxRow}
          onPress={() => {
            if (selected.includes(item.id)) {
              onSelectChange(selected.filter((id) => id !== item.id));
            } else {
              onSelectChange([...selected, item.id]);
            }
          }}
        >
          <Ionicons
            name={selected.includes(item.id) ? "checkbox" : "square-outline"}
            size={24}
            color="white"
          />
          <Text style={styles.checkboxText}>{item.name}</Text>
        </Pressable>
      )}
    />
  );

  return (
    <AppGradient style={undefined}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TextInput
            placeholder="Search filters"
            placeholderTextColor="#EAECEE"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
          <Pressable onPress={() => dispatch(clearFilters())} style={styles.clearAllButton}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </Pressable>
        </View>

        {/* Filter Sections */}
        <FlatList
          data={[
            { id: "location", title: "Popular Around You" },
            { id: "genres", title: "Genre" },
            { id: "languages", title: "Original Language" },
            { id: "duration", title: "Duration" },
            { id: "available", title: "Available On" },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <>
              {/* Section Header */}
              <Pressable
                style={styles.filterHeader}
                onPress={() => toggleSection(item.id)}
              >
                <Text style={styles.filterTitle}>{item.title}</Text>
                <Ionicons
                  name={expandedSection === item.id ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="white"
                />
              </Pressable>

              {/* Section Content */}
              {expandedSection === item.id && (
                <View style={styles.filterContent}>
                  {item.id === "location" && (
                    <View>
                      <Pressable
                        style={styles.locationButton}
                        onPress={getLocation}
                      >
                        <Text style={styles.locationButtonText}>Get Location</Text>
                      </Pressable>
                      {filters.filterLocation && (
                        <Text style={styles.locationText}>
                          Your Location: {filters.filterLocation}
                        </Text>
                      )}
                      {locationError && (
                        <Text style={styles.errorText}>{locationError}</Text>
                      )}
                    </View>
                  )}

                  {item.id === "genres" &&
                    renderCheckbox(
                      SUPPORTED_GENRES,
                      filters.filterGenres || [],
                      (selected) => dispatch(setFilterGenres(selected))
                    )}

                  {item.id === "languages" &&
                    renderCheckbox(
                      SUPPORTED_LANGUAGES,
                      filters.filterLanguage || [],
                      (selected) => dispatch(setFilterLanguage(selected))
                    )}

                  {item.id === "duration" && (
                    <Slider
                      value={filters.filterDuration || [0, 300]}
                      onValueChange={(value) => dispatch(setFilterDuration(value))}
                      minimumValue={0}
                      maximumValue={300}
                      step={10}
                      style={styles.slider}
                    />
                  )}

                  {item.id === "available" &&
                    renderCheckbox(
                      SUPPORTED_PLATFORMS,
                      filters.filterAvailableOn || [],
                      (selected) => dispatch(setFilterAvailableOn(selected))
                    )}
                </View>
              )}
            </>
          )}
        />
      </SafeAreaView>
    </AppGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 10,
    borderRadius: 8,
    color: "white",
  },
  clearAllButton: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  clearAllText: {
    color: "red",
    fontSize: 16,
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    marginBottom: 5,
  },
  filterTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  filterContent: {
    padding: 15,
    marginHorizontal: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 8,
    marginBottom: 10,
  },
  slider: {
    marginHorizontal: 10,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  checkboxText: {
    marginLeft: 10,
    color: "white",
  },
  locationButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  locationButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  locationText: {
    color: "white",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default FilterScreen;
