import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";

const Explore = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Explore</ThemedText>
    </ThemedView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
