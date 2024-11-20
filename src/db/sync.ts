import { synchronize } from "@nozbe/watermelondb/sync";
import database from ".";
import { supabase } from "../lib/supabase";
import { useAuth } from "../providers/AuthProvider";
import { User } from "@supabase/supabase-js";

export async function mySync(
  user: User | undefined,
  setSyncing: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (!user) {
    console.log("no user");
    return;
  }

  setSyncing(true);

  await synchronize({
    database,
    sendCreatedAsUpdated: true,
    pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
      console.log(lastPulledAt);
      const { data, error } = await supabase.rpc("pull", {
        last_pulled_at: lastPulledAt,
        schemaversion: schemaVersion,
        migration,
      });

      console.log("pull", JSON.stringify(data));
      if (error) console.log(error);

      return { changes: data.changes, timestamp: data.timestamp };
    },
    pushChanges: async ({ changes }) => {
      console.log("pushing changes:", JSON.stringify(changes));

      const { error } = await supabase.rpc("push", { changes });

      if (error) console.log(error);
    },
  });

  setSyncing(false);
}
