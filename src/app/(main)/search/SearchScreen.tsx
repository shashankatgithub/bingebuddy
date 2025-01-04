import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { AppGradient } from "@/src/components/atoms/CustomGradients";
import {
  useLazyGetSearchPageDataQuery,
  useLazySearchQuery,
} from "@/src/api/bingeService";
import {
  useLazyNewDiscoverMoviesQuery,
} from "@/src/api/bingeService";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList, Category } from "@/src/components/atoms/types";
import { Image } from "expo-image";
import { SEARCH_IMAGE_BASE_URL } from "@/src/constants/Configuration";

type SearchScreenProps = BottomTabScreenProps<BottomTabParamList, "Search">;


const getDynamicColor = (id: number): string =>
  ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"][(id - 1) % 4];

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchSearchPageData, { isLoading, isError }] =
    useLazyGetSearchPageDataQuery();
  const [fetchSearch, { isLoading: isSearchLoading }] = useLazySearchQuery();
  const [discoverMovies, { isFetching }] = useLazyNewDiscoverMoviesQuery();

  const fetchSearchResults = async (searchQuery: string) => {
    try {
      const response = await fetchSearch({
        query: searchQuery,
        page: 1,
      }).unwrap();
      console.log("API Response:", response.results); // Log response.results
      setSearchResults(response || []); // Update directly if results are missing
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  const handleClearQuery = () => {
    setQuery("");
    setSearchResults([]);
  };

  const handleInputChange = (text: string) => {
    setQuery(text);

    // Debounce API call
    if (debounceTimeout) clearTimeout(debounceTimeout);
    const timeout = setTimeout(() => {
      if (text.trim().length > 0) {
        fetchSearchResults(text);
      } else {
        setSearchResults([]);
      }
    }, 500);
    setDebounceTimeout(timeout);
  };
  const renderSearchItem = ({ item }: { item: any }) => (
    <Pressable onPress={() => console.log("Item clicked", item)}>
      <View style={styles.searchItem}>
        {/* Text Content */}
        <View style={styles.searchTextContainer}>
          <Text style={styles.searchTitle}>
            {item.title || item.name || "No title"}
          </Text>
          <Text style={styles.searchSubtitle}>
            {item.media_type || "Unknown"}
          </Text>
        </View>
  
        {/* Image */}
        {(item.media_type === "movie" || item.media_type === "tv" ? item.poster_path : item.profile_path) && (
          <Image
            source={{
              uri: `${SEARCH_IMAGE_BASE_URL}${
                item.media_type === "person" ? item.profile_path : item.poster_path
              }`,
            }}
            style={styles.posterImage}
          />
        )}
      </View>
    </Pressable>
  );
  const renderCategoryItem = ({ item }: { item: Category }) => (
    <Pressable
      style={[
        styles.categoryBox,
        { backgroundColor: getDynamicColor(item.id) },
      ]}
      onPress={async () => handleCategoryPress(item)}
    >
      <Text style={styles.categoryText}>{item.name}</Text>
    </Pressable>
  );

  const handleCategoryPress = async (category: Category) => {
    try {
      console.log("Selected category:", category.name);

      // Prepare API parameters
      const params: Record<string, any> = {
        page: 1, // Default page
      };

      // Iterate through category.params and add them to the params object
      category.params.forEach((paramObj) => {
        Object.entries(paramObj).forEach(([key, value]) => {
          if (value) {
            params[key] = value; // Assign arrays directly
          } else {
            console.warn(`Unexpected or undefined value for ${key}:`, value);
          }
        });
      });

      console.log("Final Params:", params);

      const result = await discoverMovies(params).unwrap();
      console.log("Discover movies result for category:", result);

      // Use router.push to navigate to the home screen
      // router.push({
      //   pathname: "/(main)/home/homeScreen",
      //   params: { result },
      // });
      navigation.navigate("Home", { initialCards: result });
    } catch (error) {
      console.error("Error fetching movies for category:", error);
    }
  };

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchSearchPageData(undefined);
        setCategories(response.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#EAECEE" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.text}>Failed to load categories</Text>
      </View>
    );
  }

  return (
    <AppGradient style={undefined}>
      <SafeAreaView className="flex-1">
        <View className="px-6 pb-10 w-full">
          <Text className="text-[#EAECEE] text-2xl font-bold text-center mb-3">
            Search Movies, Series, Artists and Creators
          </Text>
          <View className="mt-1 bg-gray-700 rounded-full flex-row items-center py-2 w-full">
            <TextInput
              value={query}
              onChangeText={handleInputChange}
              placeholder="Search"
              placeholderTextColor="#EAECEE"
              className="flex-1 text-white py-2 text-lg px-10"
            />
            {query.trim().length > 0 && (
              <Pressable onPress={handleClearQuery} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>✕</Text>
              </Pressable>
            )}
          </View>
        </View>

        {query.trim().length > 0 && (
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            {isSearchLoading ? (
              <ActivityIndicator size="large" color="#EAECEE" />
            ) : searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderSearchItem}
              />
            ) : (
              <Text style={styles.noResultsText}>No results found</Text>
            )}
          </View>
        )}

        {query.trim().length === 0 && (
          <View className="flex-1 px-6">
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id.toString()} // TypeScript now recognizes `id`
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              renderItem={renderCategoryItem}
            />
          </View>
        )}
      </SafeAreaView>
    </AppGradient>
  );
};

// Dynamic styles for categories
const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchItem: {
    flexDirection: "row", // Ensures image and text are in the same row
    alignItems: "center",
    justifyContent: "space-between", // Pushes image to the right
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  searchTextContainer: {
    flex: 1, // Ensures the text container takes available space
    paddingRight: 10, // Adds space between text and image
  },
  searchTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  searchSubtitle: {
    color: "#888",
    fontSize: 18,
  },
  posterImage: {
    width: 30, // Adjust width as needed
    height: 45, // Adjust height to maintain aspect ratio
    borderRadius: 5, // Optional: gives a rounded corner to the image
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  categoryBox: {
    width: "48%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  searchInput: {
    color: "#FFF",
    fontSize: 16,
  },
  noResultsText: {
    color: "#888",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
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

export default SearchScreen;
