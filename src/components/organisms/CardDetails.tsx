import React from "react";
import { BlurView } from "expo-blur";
import { Modal, View, Pressable, Text } from "react-native";
{
  /* Modal */
}
// Define the props type
interface CardDetailsProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  blurredProfile: { name: string; bio: string } | null;
}

const CardDetails: React.FC<CardDetailsProps> = ({
  modalVisible,
  setModalVisible,
  blurredProfile,
}) => {
  return (
    <Modal visible={modalVisible} transparent>
      <BlurView intensity={80} className="absolute inset-0">
        <View className="flex-1 justify-center items-center">
          <View className="bg-white w-80 p-4 rounded-lg">
            <Text className="text-xl font-bold">{blurredProfile?.name}</Text>
            <Text className="text-gray-500">{blurredProfile?.bio}</Text>
            <Pressable
              onPress={() => {
                console.log("Close modal button pressed");
                setModalVisible(false);
              }}
              className="mt-4 bg-red-500 p-2 rounded"
            >
              <Text className="text-white text-center">Close</Text>
            </Pressable>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default CardDetails;
