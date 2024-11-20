import { StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../providers/ThemeProvider";
import tinycolor from "tinycolor2";

export type ThemeName = "light" | "dark" | "system";

export type Theme = {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  useShadow: boolean;
};

export const lightTheme: Theme = {
  background: "#FFFFFF",
  text: "#000000",
  primary: "#1E90FF",
  secondary: "#FF6347",
  useShadow: true,
};

export const darkTheme: Theme = {
  background: "#000000",
  text: "#FFFFFF",
  primary: "#1E90FF",
  secondary: "#FF6347",
  useShadow: false,
};

export const useElevation = (
  elevation: number,
  theme: Theme
): StyleProp<ViewStyle> => {
  const shadowStyles = {
    backgroundColor: theme.background,
    shadowColor: "black",
    shadowOpacity: Math.min(elevation * 0.05, 0.5),
    shadowRadius: 7,
    shadowOffset: {
      width: Math.min(elevation * 0.5, 5),
      height: Math.min(elevation * 0.5, 5),
    },
  };

  const blendedBackground = {
    backgroundColor: tinycolor(theme.background)
      .lighten(elevation * 2)
      .toHexString(),
  };

  return theme.useShadow ? shadowStyles : blendedBackground;
};

export const addTint = (color: string, useShadow: boolean, amount: number) => {
  return useShadow
    ? tinycolor(color).darken(amount).toHexString()
    : tinycolor(color).lighten(amount).toHexString();
};
