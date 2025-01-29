import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AppGradient } from "@/src/components/atoms/CustomGradients";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;

const friendsData = [
  { id: "1", name: "Person1", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdcOfOAWBLZQ5cqbV35mcvwYREWejFuCmnlw&s" },
  { id: "2", name: "Person2", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdcOfOAWBLZQ5cqbV35mcvwYREWejFuCmnlw&s" },
  { id: "3", name: "Person3", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdcOfOAWBLZQ5cqbV35mcvwYREWejFuCmnlw&s" },
  { id: "4", name: "Person4", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdcOfOAWBLZQ5cqbV35mcvwYREWejFuCmnlw&s" },
  { id: "5", name: "Person5", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdcOfOAWBLZQ5cqbV35mcvwYREWejFuCmnlw&s" },
  { id: "6", name: "Person6", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdcOfOAWBLZQ5cqbV35mcvwYREWejFuCmnlw&s" },
  { id: "7", name: "Person7", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdcOfOAWBLZQ5cqbV35mcvwYREWejFuCmnlw&s" },
  { id: "8", name: "Person8", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdcOfOAWBLZQ5cqbV35mcvwYREWejFuCmnlw&s" },
  { id: "9", name: "Person9", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdcOfOAWBLZQ5cqbV35mcvwYREWejFuCmnlw&s" },
  { id: "10", name: "Person10", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdcOfOAWBLZQ5cqbV35mcvwYREWejFuCmnlw&s" },
  { id: "11", name: "Person11", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdcOfOAWBLZQ5cqbV35mcvwYREWejFuCmnlw&s" },
];

const discoverData = [
  {
    id: "1",
    title: "Bollywood Mayhem",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwqL6Jc5K_uXmW5HPbs66wmbDVzrAu8fr8HArEEJbDwf80ByPMzBunTGXVNn1Ip-yU_cw&usqp=CAU",
  },
  {
    id: "2",
    title: "Animal",
    image: "https://m.media-amazon.com/images/I/91zTlD7AY1L.jpg",
  },
  {
    id: "3",
    title: "The Bollywood Show",
    image: "https://m.media-amazon.com/images/M/MV5BMjQ2ODIyMjY4MF5BMl5BanBnXkFtZTgwNzY4ODI2NzM@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: "4",
    title: "Wow Things",
    image: "https://akhilnanda.com/wp-content/uploads/2019/12/7ad4c38f-9496-4705-97cc-7220c2e3b326.jpg",
  },
  {
    id: "5",
    title: "Bollywood Mayhem",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwqL6Jc5K_uXmW5HPbs66wmbDVzrAu8fr8HArEEJbDwf80ByPMzBunTGXVNn1Ip-yU_cw&usqp=CAU",
  },
  {
    id: "6",
    title: "Zepto Pass at just ₹1",
    image: "https://timesofindia.indiatimes.com/thumb.cms?msid=88016176&width=200&height=281",
  },
  {
    id: "7",
    title: "The Bollywood Show",
    image: "https://stat4.bollywoodhungama.in/wp-content/uploads/2019/11/Yeh-Saali-Aashiqui-306x393.jpg",
  },
  {
    id: "8",
    title: "Wow Things",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT66nuRLZOSck10-WGf9T4CZENzfH0nQ135Xg&s",
  },
];

const SocialScreen = () => {
  return (
    <AppGradient style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Stories Header */}
        <Text style={styles.header}>Stories</Text>

        {/* Friends Section */}
        <View>
          <Text style={styles.sectionHeader}>Friends</Text>
          <FlatList
            data={friendsData}
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.friendsList}
            renderItem={({ item }) => (
              <View style={styles.friendItem}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.friendImage}
                />
                <Text style={styles.friendName}>{item.name}</Text>
              </View>
            )}
          />
        </View>
        {/* Discover Section */}
        <View style={{ flex:1, paddingTop:10 , paddingBottom:35}}>
          <Text style={styles.sectionHeader}>Discover</Text>
          <ScrollView style={{ paddingTop: 10 }}>
            <View style={styles.discoverGrid}>
              {discoverData.map((item) => (
                <View key={item.id} style={styles.discoverItem}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.discoverImage}
                  />
                  {/* <Text style={styles.discoverTitle}>{item.title}</Text> */}
                  {/* {item.title.includes("Zepto") && (
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionButtonText}>Order Now</Text>
                    </TouchableOpacity>
                  )} */}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </AppGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 16,
    marginVertical: 10,
  },
  friendsList: {
    paddingHorizontal: 10,
  },
  friendItem: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  friendImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "purple",
  },
  friendName: {
    marginTop: 5,
    color: "white",
    fontSize: 14,
  },
  discoverGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  discoverItem: {
    width: (screenWidth - 40) / 2,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
  },
  discoverImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  // discoverTitle: {
  //   fontSize: 14,
  //   fontWeight: "bold",
  //   backgroundColor:"red"
  // },
  actionButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 8,
    marginBottom: 10,
  },
  actionButtonText: {
    color: "white",
    fontSize: 14,
  },
  scrollContent: {
    paddingBottom: 500, // Adds spacing above the bottom navigation bar
  },
});

export default SocialScreen;
