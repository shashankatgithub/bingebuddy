import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Dimensions,
} from "react-native";
import RatingStars from "../atoms/RatingStars";

const screenWidth = Dimensions.get("window").width;

type User = {
  image: string;
  name: string;
  genre: Array<string>;
  year: number;
  description: string;
  rating: number;
  duration: string;
  watchOptions: Array<string>;
};

type CardDetailsModalProps = {
  isVisible: boolean; // Change from `SharedValue<boolean>` to `boolean`
  onClose: () => void; // Callback to close the modal
  user: User;
};
const convertToFivePointScale = (rating: number): number => {
  const scaledRating = (rating / 10) * 5;
  return Math.round(scaledRating * 2) / 2; // Round to nearest 0.5
};

const CardDetailsModal: React.FC<CardDetailsModalProps> = ({
  isVisible,
  onClose,
  user,
}) => {
  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="fade" // Fade animation for modal appearance
      onRequestClose={onClose} // Close modal when back button is pressed on Android
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </Pressable>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userDescription}>{user.description}</Text>{}
          <RatingStars rating={convertToFivePointScale(user.rating)} />
          <Text style={styles.userDetails}>Duration: {user.duration}</Text>
          <Text style={styles.watchOptionsTitle}>Watch Options:</Text>
          {user.watchOptions &&
            user.watchOptions.map((option, index) => (
              <Text key={index} style={styles.watchOption}>
                • {option}
              </Text>
            ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: screenWidth * 0.85,
    padding: 20,
    borderRadius: 15,
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
    color: "gray",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: "gray",
  },
  userDetails: {
    fontSize: 16,
    marginBottom: 5,
  },
  watchOptionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  watchOption: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default CardDetailsModal;