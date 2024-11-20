import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import { useTheme } from "../providers/ThemeProvider";
import { useElevation } from "../constants/Themes";
import tinycolor from "tinycolor2";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";
import database from "../db";
import { TaskListItem } from "./TaskListItem";


export default function HiddenItemWithActions({ task }: TaskListItem) {

    const onDelete = async () => {
        await database.write(async () => {
            await task.markAsDeleted();
        });
    };

    return (
        <ThemedView style={[styles.container, { backgroundColor: 'red' }]}>
            <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
                <Ionicons name='trash-outline' color={'white'} size={24} />
            </TouchableOpacity>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
        borderRadius: 10,
        overflow: 'hidden'
    },
    text: {
        color: 'white'
    },
    deleteBtn: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: 70,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    }
});