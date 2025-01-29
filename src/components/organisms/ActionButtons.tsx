// import { Pressable, View, ViewStyle } from "react-native";
// import React from "react";
// import { FontAwesome } from "@expo/vector-icons";

// interface ActionButtonsProps {
//     times?: () => void;
//     star?: () => void;
//     heart?: () => void;
//     style?: ViewStyle;
//   }

// const ActionButtons: React.FC<ActionButtonsProps> = ({ times, star, heart, style }) => {
//     return (
//         <View style={style}className="relative flex-row justify-between w-full px-16 py-1">
//             <Pressable
//                 onPress={() => {
//                     times;
//                     console.log("Pressed on the left button");
//                 }}
//                 className="p-4  rounded-full"
//             >
//                 <FontAwesome name="times" size={30} color="white" />
//             </Pressable>
//             <Pressable
//                 onPress={() => {
//                     star;
//                     console.log("Pressed on the up button");
//                 }}
//                 className="p-4  rounded-full"
//             >
//                 <FontAwesome name="star" size={30} color="white" />
//             </Pressable>
//             <Pressable
//                 onPress={() => {
//                     heart;
//                     console.log("Pressed on the right button");
//                 }}
//                 className="p-4  rounded-full"
//             >
//                 <FontAwesome name="heart" size={30} color="white" />
//             </Pressable>
//         </View>
//     );
// };

// export default ActionButtons;


import { Pressable, View, ViewStyle } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

interface ActionButtonConfig {
  icon: keyof typeof FontAwesome.glyphMap; // Icon name from FontAwesome
  onPress: () => void; // Callback function
  style?: ViewStyle; // Optional style for the button
}

interface ActionButtonsProps {
  buttons: ActionButtonConfig[]; // Array of button configurations
  containerStyle?: ViewStyle; // Style for the container
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ buttons, containerStyle }) => {
  return (
    <View style={[{ flexDirection: "row", justifyContent: "space-between" }, containerStyle]}>
      {buttons.map((button, index) => (
        <Pressable
          key={index}
          onPress={button.onPress}
          style={[
            {
              padding: 16,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            },
            button.style,
          ]}
        >
          <FontAwesome name={button.icon} size={30} color="white" />
        </Pressable>
      ))}
    </View>
  );
};

export default ActionButtons;
