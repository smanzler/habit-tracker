import { Tabs } from "expo-router";
import React from "react";

import { useTheme } from "@/src/providers/ThemeProvider";
import { useElevation } from "@/src/constants/Themes";
import { TabBar } from "@/src/components/navigation/TabBar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
