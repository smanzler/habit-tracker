import { Modal, ModalProps, StyleSheet, Text, View } from "react-native";
import React from "react";
import DateTimePicker from "react-native-ui-datepicker";
import { useTheme } from "../providers/ThemeProvider";
import { BlurView } from "expo-blur";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemedText } from "./ThemedText";
import { addTint, useElevation } from "../constants/Themes";

type Props = {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  visible: boolean;
  onExit: () => void | Promise<void>;
};

const DatePickerModal = ({ date, setDate, visible, onExit }: Props) => {
  const { theme } = useTheme();

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <BlurView intensity={50} style={styles.container}>
        <View style={[styles.calendar, useElevation(10, theme)]}>
          <DateTimePicker
            date={date}
            mode="single"
            calendarTextStyle={{ color: theme.text }}
            headerTextStyle={{ color: theme.text }}
            weekDaysTextStyle={{ color: theme.text }}
            headerButtonColor={theme.text}
            monthContainerStyle={{
              borderWidth: 0,
              backgroundColor: theme.useShadow
                ? addTint(theme.background, theme.useShadow, 10)
                : theme.background,
            }}
            timePickerTextStyle={{ color: theme.text }}
            timePickerIndicatorStyle={{
              backgroundColor: theme.useShadow
                ? addTint(theme.background, theme.useShadow, 10)
                : theme.background,
            }}
            yearContainerStyle={{
              borderWidth: 0,
              backgroundColor: theme.useShadow
                ? addTint(theme.background, theme.useShadow, 10)
                : theme.background,
            }}
            todayTextStyle={{ color: theme.text }}
            onChange={({ date }: any) => setDate(date)}
            timePicker
          />
        </View>

        <TouchableOpacity
          onPress={onExit}
          style={[
            styles.btn,
            useElevation(20, theme),
            { backgroundColor: theme.primary },
          ]}
        >
          <ThemedText>Save</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setDate(null);
            onExit();
          }}
          style={[styles.btn, useElevation(10, theme)]}
        >
          <ThemedText>Remove Date</ThemedText>
        </TouchableOpacity>
      </BlurView>
    </Modal>
  );
};

export default DatePickerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  calendar: {
    width: 300,
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
  },
  btn: {
    padding: 10,
    borderRadius: 20,
    width: 300,
    marginBottom: 10,
    alignItems: "center",
  },
});
