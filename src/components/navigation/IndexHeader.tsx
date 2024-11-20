import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { ThemedText } from "../ThemedText";
import { router } from "expo-router";
import { useTheme } from "@/src/providers/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, Ionicons } from "@expo/vector-icons";
import tinycolor from "tinycolor2";
import Animated, {
  Easing,
  interpolate,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const IndexHeader = ({ syncing }: { syncing: boolean }) => {
  const { theme } = useTheme();

  const rotation = useSharedValue(0);

  useEffect(() => {
    if (syncing) {
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 2000,
          easing: Easing.linear,
          reduceMotion: ReduceMotion.System,
        }),
        -1
      );
    }
  }, [syncing]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value}deg`,
        },
      ],
    };
  });

  return (
    <>
      <View style={styles.titleContainer}>
        <View
          style={[styles.titleContent, { backgroundColor: theme.background }]}
        >
          <View style={styles.titleWithSync}>
            <ThemedText type="title">Tasks for the day</ThemedText>
            {syncing && (
              <Animated.View style={[{ alignSelf: "center" }, animatedStyles]}>
                <Ionicons name="sync" size={24} color={theme.primary} />
              </Animated.View>
            )}
          </View>
          <TouchableOpacity
            style={{
              width: 35,
              aspectRatio: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => router.push("/(modals)/task")}
          >
            <Entypo name="plus" size={30} color={theme.primary} />
          </TouchableOpacity>
        </View>
        <LinearGradient
          colors={[
            theme.background,
            tinycolor(theme.background).setAlpha(0).toRgbString(),
          ]}
          style={{ height: 30 }}
        />
      </View>
    </>
  );
};

export default IndexHeader;

const styles = StyleSheet.create({
  titleContainer: {},
  titleWithSync: {
    flexDirection: "row",
    gap: 5,
  },
  titleContent: {
    paddingTop: 50,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
