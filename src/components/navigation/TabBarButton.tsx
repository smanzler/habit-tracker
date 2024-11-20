import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { icon } from "@/src/constants/icon";
import { useTheme } from "@/src/providers/ThemeProvider";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
}: {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  routeName: string;
  color: string;
  label: string;
}) => {
  const { theme } = useTheme();
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity,
    };
  });

  const animatedIconStyle = useAnimatedStyle<any>(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);

    const top = interpolate(scale.value, [0, 1], [0, 9]);

    return {
      transform: [
        {
          scale: scaleValue,
        },
      ],
      top,
    };
  });

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} style={styles.item}>
      <Animated.View style={animatedIconStyle}>
        {icon[routeName]({
          color,
        })}
      </Animated.View>
      <Animated.Text style={[{ color, fontSize: 12 }, animatedTextStyle]}>
        {label}
      </Animated.Text>
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
