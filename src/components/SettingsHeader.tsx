import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useElevation } from "../constants/Themes";
import { useTheme } from "../providers/ThemeProvider";
import { AntDesign } from "@expo/vector-icons";

const SettingsHeader = () => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, useElevation(10, theme)]}>
      <AntDesign name="left" color={theme.primary} size={24} />
    </View>
  );
};

export default SettingsHeader;

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingLeft: 15,
    justifyContent: "center",
  },
});
