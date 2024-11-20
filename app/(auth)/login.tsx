import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import { supabase } from "@/src/lib/supabase";
import { ThemedView } from "@/src/components/ThemedView";
import { router } from "expo-router";
import { addTint, useElevation } from "@/src/constants/Themes";
import { useTheme } from "@/src/providers/ThemeProvider";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();

  async function signInWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (session) router.navigate("/");
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);

    if (session) router.navigate("/");
    setLoading(false);
  }

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholderTextColor={addTint(theme.text, !theme.useShadow, 40)}
          placeholder="email@address.com"
          autoCapitalize={"none"}
          style={[
            styles.textInput,
            useElevation(5, theme),
            { color: theme.text },
          ]}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholderTextColor={addTint(theme.text, !theme.useShadow, 40)}
          placeholder="Password"
          autoCapitalize={"none"}
          style={[
            styles.textInput,
            useElevation(5, theme),
            { color: theme.text },
          ]}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 52,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  textInput: {
    padding: 12,
    borderRadius: 10,
  },
});
