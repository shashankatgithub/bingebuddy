import React, { memo, useMemo } from "react";
import { StyleSheet } from "react-native";
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";

interface CustomBackgroundProps extends BottomSheetBackgroundProps {}

const CustomBackgroundComponent: React.FC<CustomBackgroundProps> = ({
  style,
}) => {
  //#region styles
  const containerStyle = useMemo(
    () => [styles.container, style],
    [style]
  );
  //#endregion

  // render LinearGradient
  return (
    <LinearGradient
      colors={[
        "hsla(169, 19%, 28%, 0.8)", // Lighter shade of hsla(169, 19%, 28%, 1)
        "hsla(225, 55%, 16%, 0.8)", // Darker shade of hsla(225, 55%, 16%, 1)
        "hsla(225, 55%, 16%, 0.8) 100%", // Darkest part of gradient
      ]}
      start={{ x: 0, y: 0 }} // Start the gradient at the top left
      end={{ x: 1, y: 0 }} // End the gradient at the top right
      style={containerStyle}
    />
  );
};

export const CustomBackground = memo(CustomBackgroundComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
