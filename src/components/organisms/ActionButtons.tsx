import { Pressable, View, ViewStyle } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

interface ActionButtonsProps {
    times?: () => void;
    star?: () => void;
    heart?: () => void;
    style?: ViewStyle;
  }

const ActionButtons: React.FC<ActionButtonsProps> = ({ times, star, heart, style }) => {
    return (
        <View style={style}className="relative flex-row justify-between w-full px-16 py-1">
            <Pressable
                onPress={() => {
                    times;
                    console.log("Pressed on the left button");
                }}
                className="p-4  rounded-full"
            >
                <FontAwesome name="times" size={30} color="white" />
            </Pressable>
            <Pressable
                onPress={() => {
                    star;
                    console.log("Pressed on the up button");
                }}
                className="p-4  rounded-full"
            >
                <FontAwesome name="star" size={30} color="white" />
            </Pressable>
            <Pressable
                onPress={() => {
                    heart;
                    console.log("Pressed on the right button");
                }}
                className="p-4  rounded-full"
            >
                <FontAwesome name="heart" size={30} color="white" />
            </Pressable>
        </View>
    );
};

export default ActionButtons;
