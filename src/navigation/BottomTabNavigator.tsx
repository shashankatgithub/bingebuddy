import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from 'expo-blur';
import StyleSheet, { Dimensions } from 'react-native';


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
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const screen = screens.find((screen) => screen.name === route.name);
          const iconName = screen ? screen.icon : "help";

          return <Ionicons name={iconName} size="30" color={color}/>;
        },
        tabBarActiveTintColor: "#ff0000",
        tabBarInactiveTintColor: "white",
        headerShown: false,
        lazy: false,
        animation:"shift",
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
        ),
        tabBarStyle: {
          position: "absolute",
          height: screenHeight * 0.08,
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
