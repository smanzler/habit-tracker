import { FlatList, View } from "react-native";
import TaskListItem from "./TaskListItem";
import { useEffect, useState } from "react";
import { tasksCollection } from "../db";
import Task from "../models/Task";

import { withObservables } from "@nozbe/watermelondb/react";
import { useAuth } from "../providers/AuthProvider";

function TasksList({ tasks }: { tasks: Task[] }) {
  const { user } = useAuth();

  return (
    <View>
      {tasks
        .filter(
          (task) =>
            task.userId === user?.id ||
            (task.userId === null && user?.id === undefined)
        )
        .sort((a, b) => {
          const dateA = a.dueAt ? new Date(a.dueAt).getTime() : 0;
          const dateB = b.dueAt ? new Date(b.dueAt).getTime() : 0;

          // if (dateA === 0 && dateB === 0) return 0;

          // if (dateA === 0) return 1;

          // if (dateB === 0) return -1;

          return dateA - dateB;
        })
        .map((task) => (
          <TaskListItem key={task.id} task={task} />
        ))}
    </View>
  );
}

const enhance = withObservables([], () => ({
  tasks: tasksCollection.query(),
}));

export default enhance(TasksList);
