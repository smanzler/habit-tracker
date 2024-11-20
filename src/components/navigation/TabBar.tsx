import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutChangeEvent,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "@/src/providers/ThemeProvider";
import { useElevation } from "@/src/constants/Themes";
import { Feather } from "@expo/vector-icons";
import TabBarButton from "./TabBarButton";
import { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { transform } from "@babel/core";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { theme } = useTheme();
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  const buttonWidth = dimensions.width / state.routes.length;

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  useEffect(() => {
    tabPositionX.value = withSpring(buttonWidth * state.index, {
      duration: 1500,
    });
  }, [state.index]);

  return (
    <View
      onLayout={onTabbarLayout}
      style={[
        styles.container,
        { backgroundColor: theme.background },
        useElevation(7, theme),
      ]}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            backgroundColor: theme.primary,
            borderRadius: 30,
            marginHorizontal: 12,
            height: dimensions.height - 15,
            width: buttonWidth - 25,
          },
          animatedStyle,
        ]}
      />
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? theme.background : theme.text}
            label={label}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    width: 250,
    paddingVertical: 12,
    borderRadius: 35,
  },
});
