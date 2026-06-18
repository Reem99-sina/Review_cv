// import fs from "fs";
// import path from "path";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function saveFile(file: File) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("resumes")
    .upload(fileName, file);

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from("resumes").getPublicUrl(fileName);

  return data.publicUrl;
}
