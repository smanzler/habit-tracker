import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useElevation } from "../constants/Themes";
import { useTheme } from "../providers/ThemeProvider";
import { router } from "expo-router";

export type Setting = {
  name: string;
  route?: "theme" | "about" | "profile";
  rightIcon?: () => JSX.Element;
};

const SettingsListView = ({ settings }: { settings: Setting[] }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, useElevation(10, theme)]}>
      {settings.map((setting, index) =>
        setting.route ? (
          // Render TouchableOpacity if route exists
          <TouchableOpacity
            key={index}
            style={styles.row}
            onPress={() => {
              if (setting.route)
                router.navigate(`/(settings)/${setting.route}`);
            }}
          >
            <View style={styles.flex}>
              <Text style={[styles.text, { color: theme.text }]}>
                {setting.name.charAt(0).toUpperCase() + setting.name.slice(1)}
              </Text>
              {setting.rightIcon && setting.rightIcon()}
            </View>
          </TouchableOpacity>
        ) : (
          <View key={index} style={styles.row}>
            <View style={styles.flex}>
              <Text style={[styles.text, { color: theme.text }]}>
                {setting.name.charAt(0).toUpperCase() + setting.name.slice(1)}
              </Text>
              {setting.rightIcon && setting.rightIcon()}
            </View>
          </View>
        )
      )}
    </View>
  );
};

export default SettingsListView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    justifyContent: "center",
    height: 50,
    paddingHorizontal: 20,
  },
  border: {
    position: "absolute",
    bottom: 0,
    marginHorizontal: 20,
    width: "100%",
    height: 1,
  },
  text: {
    fontSize: 18,
  },
});
