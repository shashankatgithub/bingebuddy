import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { View, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
type CustomHeaderProps = {
  navigation: DrawerNavigationProp<any>;
};
const CustomHeader: React.FC<CustomHeaderProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flexDirection: "row", alignItems: "center", padding: 20 }}>
      <TouchableOpacity onPress={navigation.toggleDrawer}>
        <AntDesign name="menu-fold" size={24} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const MainLayout = () => {
  return (
    <GestureHandlerRootView>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            title: "Home",
            drawerLabel: "Home",
            header: ({ navigation }) => <CustomHeader navigation={navigation} />, // Pass navigation prop
            drawerIcon: () => {
              return <AntDesign name="home" size={24} color="black" />;
            },
          }}
        />
        <Drawer.Screen
          name="profile/index"
          options={{
            title: "Profile",
            drawerLabel: "Profile",
            header: ({ navigation }) => <CustomHeader navigation={navigation} />, // Pass navigation prop

            drawerIcon: () => {
              return <AntDesign name="profile" size={24} color="black" />;
            },
          }}
        />
        <Drawer.Screen
          name="settings/index"
          options={{
            title: "Settings",
            drawerLabel: "Settings",
            header: ({ navigation }) => <CustomHeader navigation={navigation} />, // Pass navigation prop

            drawerIcon: () => {
              return <AntDesign name="setting" size={24} color="black" />;
            },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default MainLayout;