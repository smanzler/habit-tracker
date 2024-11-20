import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import schema from "./schema";
import migrations from "./migrations";
import Task from "../models/Task";
import { setGenerator } from "@nozbe/watermelondb/utils/common/randomId";
import * as Crypto from "expo-crypto";

const adapter = new SQLiteAdapter({
  schema,
  // migrations,
  jsi: true,
  onSetUpError: (error) => {
    console.log(error);
  },
});

const database = new Database({
  adapter,
  modelClasses: [Task],
});

setGenerator(() => Crypto.randomUUID());

export default database;

export const tasksCollection = database.get<Task>("tasks");
