import { GestureHandlerRootView } from "react-native-gesture-handler";
import 'react-native-gesture-handler'; // Must be at the very top
import 'react-native-reanimated';
import React from "react";
import { Provider } from "react-redux";
import store from "../state/store";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
      <Slot />
    </Provider>
    </GestureHandlerRootView>
  );
}
