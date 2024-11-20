import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://wwvegtqhiduflgvekfxq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3dmVndHFoaWR1ZmxndmVrZnhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzODQ5MDcsImV4cCI6MjAzODk2MDkwN30.UmNd571VMsTqrnAxlJKkN8buhmwz0PXlHOMh_5KSUhs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true, 
        persistSession: true,
        detectSessionInUrl: false,
    },
});