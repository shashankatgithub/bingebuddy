import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Dimensions,
} from "react-native";
import { Movie } from "../atoms/types";
import ActionButtons from "./ActionButtons";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "expo-image";
import {
  ARTIST_IMAGE_BASE_URL,
  LOGO_IMAGE_BASE_URL,
  MOVIE_IMAGE_BASE_URL,
} from "@/src/constants/Configuration";
import { AppGradient } from "../atoms/CustomGradients";
import { BlurView } from "expo-blur";
import { FontAwesome } from "@expo/vector-icons";
import imagePath from "@/src/constants/imagePath";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

type CardDetailsModalProps = {
  isVisible: boolean;
  onClose: () => void;
  movie: Movie;
};

const CardDetailsModal: React.FC<CardDetailsModalProps> = ({
  isVisible,
  onClose,
  movie,
}) => {
  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <BlurView
          style={StyleSheet.absoluteFill}
          tint="dark"
          intensity={50}
        />
        <AppGradient style={styles.modalContent}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </Pressable>
          <ScrollView>
            {/* Movie Title and Year */}
            <Text style={styles.movieTitle}>
              {movie.title} (
              {movie.release_date
                ? new Date(movie.release_date).getFullYear()
                : ""}
              )
            </Text>

            {/* Poster Image */}
            <Image
              source={{
                uri: `${MOVIE_IMAGE_BASE_URL}${movie.backdrop_path}`,
                method: "POST",
                headers: {
                  Pragma: "no-cache",
                },
              }}
              style={styles.posterImage}
              contentFit="cover"
            />

            {/* Ratings, Duration, and Watch Options */}
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>
                {" "}
                Rating : {movie.vote_average}
              </Text>
              <Text style={styles.infoText}>Runtime : {movie.runtime} min</Text>
              {movie.watch_providers?.flatrate?.[0]?.logo_path && (
                <Image
                  source={{
                    uri: `${LOGO_IMAGE_BASE_URL}${movie.watch_providers.flatrate[0].logo_path}`,
                  }}
                  style={styles.providerLogo}
                  contentFit="contain"
                />
              )}
            </View>

            {/* Synopsis */}
            <Text style={styles.sectionTitle}>Synopsis</Text>
            <Text style={styles.description}>{movie.overview}</Text>

            {/* Cast & Crew */}
            <Text style={styles.sectionTitle}>Cast & Crew</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {movie.credits?.cast?.length ? (
                movie.credits.cast.map((actor, index) => (
                  <View key={index} style={styles.castCard}>
                    <Image
                      source={
                        actor.profile_path &&
                        typeof actor.profile_path === "string" &&
                        actor.profile_path.trim() !== ""
                          ? {
                              uri: `${ARTIST_IMAGE_BASE_URL}${actor.profile_path}`,
                              method: "POST",
                              headers: {
                                Pragma: "no-cache",
                              },
                              body: "Your Body goes here",
                            } // Remote image
                          : imagePath.artist_img // Local fallback image (should be imported or required)
                      }
                      style={styles.castImage}
                      contentFit="cover"
                      contentPosition={"center"}
                    />
                    <Text style={styles.castName}>{actor.name}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.infoText}>No cast available</Text>
              )}
            </ScrollView>

            {/* More like this */}
            <Text style={styles.sectionTitle}>More like this:</Text>
          </ScrollView>

          <View style={styles.moreLikeThis}>
          <ActionButtons
                buttons={[
                  {
                    icon: "times",
                    onPress: () => console.log("Pressed on the left button"),
                  },
                  {
                    icon: "star",
                    onPress: () => console.log("Pressed on the up button"),
                  },
                  {
                    icon: "heart",
                    onPress: () => console.log("Pressed on the right button"),
                  },
                ]}
                //containerStyle={globalStyles.actionButtonStyle}
              />
          </View>
          {/* Action Buttons */}
          <View style={styles.bottomButtons}>
            <Pressable style={styles.iconButton} onPress={onClose}>
              <FontAwesome name="arrow-left" size={24} color="white" />
            </Pressable>
            <Pressable style={styles.iconButton}>
              <FontAwesome name="bookmark" size={24} color="white" />
            </Pressable>
          </View>
        </AppGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.85,
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#ccc",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 20,
    color: "white",
  },
  movieTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "white",
  },
  posterImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "white",
  },
  providerLogo: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "white",
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: "white",
  },
  castCard: {
    alignItems: "center",
    marginRight: 10,
    width: 80,
  },
  castImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  castName: {
    fontSize: 12,
    textAlign: "center",
    color: "white",
  },
  moreLikeThis: {
    alignItems: "center",
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
    paddingLeft: 20,
    paddingRight: 20,
  },
  iconButton: {
    padding: 10,
    alignItems: "center",
  },
});

export default CardDetailsModal;
