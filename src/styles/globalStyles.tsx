import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  actionButtonStyle: {
    position: "absolute",
    paddingHorizontal: 64,
    bottom: 16*4, // bottom-1
    width: "100%", // w-full
    flexDirection: "row",
    justifyContent: "space-between", // justify-between
    paddingVertical: 16,
  },
  navigationBarStyle: {
    position: "absolute", // absolute positioning
    paddingHorizontal: 64, // px-16
    bottom: 1, // bottom-1
    width: "100%", // w-full
    flexDirection: "row", // flex-row
    justifyContent: "space-between", // justify-between
    alignItems: "center", // items-center
  },
  horizontalSeparator: {
    height: 1, // Thickness of the line
    backgroundColor: "lightgray", // Color of the line
    width: "100%", // Full-width line
    marginBottom: 8, // Space between the separator and the navigation bar
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default globalStyles;
