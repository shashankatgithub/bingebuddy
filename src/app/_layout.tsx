import React from "react";
import { Provider } from "react-redux";
import store from "../state/store";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
      <Slot />
    </Provider>
    </GestureHandlerRootView>
  );
}
