import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { StyleSheet, Dimensions } from "react-native";
import { Easing } from "react-native-reanimated";

const Tab = createBottomTabNavigator();

interface Screen {
  name: string;
  component: React.ComponentType<any>;
  icon: string;
}

interface BottomTabNavigatorProps {
  screens: Screen[];
}
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({ screens }) => {
  return (
    <Tab.Navigator
      initialRouteName={"Home"} // This can be passed as a prop
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const screen = screens.find((screen) => screen.name === route.name);
          const iconName = screen ? screen.icon : "help";
          return <Ionicons name={iconName} size={28} color={color} />;
        },
        tabBarActiveTintColor: "#ff0000",
        tabBarInactiveTintColor: "white",
        headerShown: false,
        lazy: false,
        tabBarShowLabel: false,
        transitionSpec: {
          animation: "timing",
          config: {
            duration: 200,
            easing: Easing.inOut(Easing.ease),
          },
        },
        tabBarBackground: () => (
          <BlurView
            tint="light"
            intensity={30}
            style={StyleSheet.absoluteFill}
          />
        ),
        tabBarStyle: {
          position: "absolute",
          height: screenHeight * 0.07,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: screenHeight * 0.02,
          paddingTop: screenHeight * 0.01,
        },
      })}
    >
      {screens.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
