import { createClient } from "@supabase/supabase-js";

export function getSupabaseStorageClient() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) throw new Error("Supabase Storage is not configured.");
  return createClient(url, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
}

export function getPrivateStorageBucket() {
  const bucket = process.env.SUPABASE_STORAGE_BUCKET;
  if (!bucket) throw new Error("SUPABASE_STORAGE_BUCKET is not configured.");
  return bucket;
}
