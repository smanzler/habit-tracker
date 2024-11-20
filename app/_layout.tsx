import { useFonts } from "expo-font";
import { Redirect, router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import AuthProvider, { useAuth } from "@/src/providers/AuthProvider";
import { ThemeProvider, useTheme } from "@/src/providers/ThemeProvider";
import { useElevation } from "@/src/constants/Themes";
import tinycolor from "tinycolor2";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SettingsHeader from "@/src/components/SettingsHeader";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <ThemeProvider>
          <RootLayoutNav />
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  const { isAuthenticated, isLoading } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.navigate("/(auth)/login");
    }
  }, [isAuthenticated, isLoading]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/task"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(settings)/theme"
        options={{ header: () => <SettingsHeader /> }}
      />
      <Stack.Screen
        name="(settings)/profile"
        options={{ header: () => <SettingsHeader /> }}
      />
      <Stack.Screen
        name="(settings)/about"
        options={{ header: () => <SettingsHeader /> }}
      />
      <Stack.Screen
        name="(auth)/login"
        options={{
          presentation: "modal",
          headerTitle: "Login",
          headerTitleStyle: { color: theme.text },
          headerStyle: {
            backgroundColor: tinycolor(theme.background)
              .lighten(10)
              .toHexString(),
          },
        }}
      />
    </Stack>
  );
}
