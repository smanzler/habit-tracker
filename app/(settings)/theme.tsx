import React, { useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from "reanimated-color-picker";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useTheme } from "@/src/providers/ThemeProvider";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const { theme } = useTheme();
  const color = useSharedValue(theme.primary);

  const onSelectColor = ({ hex }: { hex: string }) => {
    console.log(hex);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: color.value,
    };
  });

  return (
    <View style={styles.container}>
      <Button title="Color Picker" onPress={() => setShowModal(true)} />

      <Modal visible={showModal} animationType="fade">
        <Animated.View
          style={[
            { flex: 1, alignItems: "center", justifyContent: "center" },
            animatedStyle,
          ]}
        >
          <ColorPicker
            style={{ width: 280 }}
            value={theme.primary}
            onComplete={onSelectColor}
            onChange={({ hex }) => (color.value = hex)}
          >
            <Preview hideInitialColor />
            <Panel1 />
            <HueSlider />
            <Swatches />
          </ColorPicker>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowModal(false)}
          >
            <Text style={{ fontSize: 18 }}>Done</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "white",
    marginTop: 20,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
});
