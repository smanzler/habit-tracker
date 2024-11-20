import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export const useImage = (id: string | null | undefined, profile?: boolean) => {
  return useQuery({
    queryKey: ["image", id],
    queryFn: async () => {
      if (!id) return null;

      if (profile) {
        console.log("getting pic");
      }

      const { data, error } = await supabase.storage
        .from(!profile ? "task" : "avatars")
        .download(id);

      if (error) {
        console.log(error);
      }

      if (data) {
        try {
          const result = await readFileAsDataURL(data);
          return result;
        } catch (error) {
          console.error("Failed to read file:", error);
          return null;
        }
      } else {
        return null;
      }
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
  });
};

async function readFileAsDataURL(data: any) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.readAsDataURL(data);

    fr.onload = () => {
      resolve(fr.result);
    };

    fr.onerror = (error) => {
      console.error(error);
      reject(null);
    };
  });
}
