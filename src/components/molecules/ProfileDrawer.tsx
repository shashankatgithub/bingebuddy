import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "@/src/app/(main)/profile/ProfileScreen";
import Settings from "@/src/app/(main)/settings";

const Drawer = createDrawerNavigator();

function ProfileDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false, // Hide the header
      }}
    >
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          // This ensures that the drawer toggle button appears in the Profile screen
          drawerIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}

export default ProfileDrawer;
