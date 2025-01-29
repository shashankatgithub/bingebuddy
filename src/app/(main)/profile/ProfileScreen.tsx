import React, { useState, useCallback, useRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import { MOVIE_IMAGE_BASE_URL } from "@/src/constants/Configuration";
import { AppGradient } from "@/src/components/atoms/CustomGradients";
import imagePath from "@/src/constants/imagePath";
import BottomSheet, {
  BottomSheetView,
  useBottomSheetSpringConfigs,
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { HeaderHandle } from "@/src/components/molecules/HeaderHandle";
import { CustomBackground } from "@/src/components/molecules/CustomBackground";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BingeScreen from "./BingeScreen";
import SocialScreen from "./ActivityScreen";
import { BlurView } from "expo-blur";
import ActivityScreen from "./ActivityScreen";

const generateFunnyName = () => {
  const funnyNames = [
    "Captain Popcorn",
    "Ticket Taster",
    "Cinematic Genius",
    "Movie Buff Extraordinaire",
  ];
  return funnyNames[Math.floor(Math.random() * funnyNames.length)];
};

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = () => {
  const reduxCurrentCards = useSelector(
    (state: any) => state.user.currentCards
  );
  const snapPoints = useMemo(() => ["50%", "70%"], []);
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  const UserInfoHeader = () => {
    const userLoggedIn = false;
    const userName = userLoggedIn ? "John Doe" : generateFunnyName();
    const userLikes = 120;
    const userWatchlist = 193;
    const userWatched = 34;
    const badgeData = 34;

    return (
      <View style={styles.userInfoContainer}>
          <Image source={imagePath.artist_img} style={styles.userImage} />
          <Text style={styles.userName}>{userName}</Text>
          <View style={styles.userStatsContainer}>
            {/* Custom stats layout */}
            <View style={styles.statsWrapper}>
              <TouchableOpacity style={styles.statBox} onPress={() => {}}>
                <Text style={styles.statsCount}>{userLikes}</Text>
                <Text style={styles.statsLabel}>Likes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.statBox} onPress={() => {}}>
                <Text style={styles.statsCount}>{userWatchlist}</Text>
                <Text style={styles.statsLabel}>Watchlist</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.statBox} onPress={() => {}}>
                <Text style={styles.statsCount}>{userWatched}</Text>
                <Text style={styles.statsLabel}>Watched</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.statBox}
                onPress={handleBadgeClick}
              >
                <Text style={styles.statsCount}>{badgeData}</Text>
                <Text style={styles.statsLabel}>Badges</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

    );
  };

  const bottomSheetRef = useRef<BottomSheet>(null);

  const renderItem = useCallback(({ item }) => {
    return (
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{item}</Text>
      </View>
    );
  }, []);

  const renderHeaderHandle = useCallback(
    (props) => <HeaderHandle {...props} children="Badges" />,
    []
  );

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={1}
        disappearsOnIndex={-1}
      />
    ),
    []
  );
  const handleBadgeClick = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const sheetSections = useMemo(
    () => [
      "Verified",
      "Newbie",
      "Talented",
      "Expert",
      "Student",
      "Scientist",
      "Friendly",
      "Social",
      "Wildfire",
      "Inferno",
      "Addict",
      "Collector",
      "Organizer",
      "Favourite",
      "Explosive",
      "Wildfire",
      "Addict",
      "Verified",
      "Newbie",
      "Talented",
      "Expert",
      "Student",
      "Scientist",
      "Friendly",
      "Social",
      "Wildfire",
      "Inferno",
      "Addict",
      "Collector",
      "Organizer",
      "Favourite",
      "Explosive",
      "Wildfire",
      "Addict",
    ],
    []
  );

  const sections = [
    { id: "1", title: "Watchlist", movies: reduxCurrentCards },
    { id: "2", title: "Liked", movies: reduxCurrentCards },
    { id: "3", title: "Already Watched", movies: reduxCurrentCards },
  ];

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <AppGradient style={{ flex: 1 }}>
        <UserInfoHeader />
        <Tab.Navigator
          backBehavior="firstRoute"
          tabBarPosition="top"
          screenOptions={{
            tabBarStyle: { backgroundColor: "transparent" },
            tabBarLabelStyle: { color: "white", fontWeight: "bold",fontSize:16 },
            tabBarIndicatorStyle: { backgroundColor: "white" },
            tabBarBounces:true,
          }}
          
        >
          <Tab.Screen
            name="Binge"
            children={() => <BingeScreen movies={reduxCurrentCards} />}
          />
          <Tab.Screen name="Activity" component={ActivityScreen} />
        </Tab.Navigator>
        {/* Bottom Sheet to show badges */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1} // Bottom sheet starts closed
          snapPoints={snapPoints}
          animationConfigs={animationConfigs}
          enableContentPanningGesture={true}
          enableHandlePanningGesture={true}
          enableDynamicSizing={false}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          handleComponent={renderHeaderHandle}
          animateOnMount={true}
          backgroundComponent={CustomBackground}
        >
          <BottomSheetView style={styles.contentContainer}>
            <BottomSheetFlatList
              style={styles.sheetSectionContainer}
              data={sheetSections}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.sheetContentContainer}
              numColumns={3}
              bounces={true}
              focusHook={useFocusEffect}
              removeClippedSubviews={
                Platform.OS === "android" && sections.length > 0
              }
            />
          </BottomSheetView>
        </BottomSheet>
      </AppGradient>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 70,
    position: "relative",
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  userStatsContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  statsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 10,
  },
  statBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  statsCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  statsLabel: {
    fontSize: 14,
    color: "white",
    marginTop: 5,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  movieCard: {
    margin: 0, // No margin between images when expanded
    alignItems: "center",
  },
  movieCardHorizontal: {
    marginRight: 0, // No margin between images when expanded
    alignItems: "center",
  },
  movieImage: {
    width: 80,
    height: 135,
    borderRadius: 10,
    marginBottom: 5,
  },
  matchContainer: {
    position: "absolute",
    bottom: 5,
    left: 5,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  matchText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  badgeItem: {
    margin: 10,
    alignItems: "center",
  },
  customBackgroundText: {
    fontSize: 18,
    color: "white",
  },
  badgeContainer: {
    backgroundColor: "#4A90E2",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
  sheetSectionContainer: {
    flex: 1,
  },
  sheetContentContainer: {
    paddingHorizontal: 16,
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly", // Equal spacing for tabs
    height: 50, // Consistent height for tab container
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fallback color
  },
  tabLabelContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  tabLabel: {
    fontSize: 14, // Standard font size
    color: "white",
  },
  tabLabelFocused: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16, // Slightly larger font for focused tab
  },
  separator: {
    width: 1, // Thin separator width
    height: "70%", // Separator height covering 70% of the container
    backgroundColor: "white", // Separator color
    marginHorizontal: -1, // Adjust margin for precise alignment
    alignSelf: "center", // Center the separator vertically
  },
});

export default ProfileScreen;

