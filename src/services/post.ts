import { supabase } from "../lib/supabase";
import type { PostWithAuthor } from "../types/post";

export async function getPosts(): Promise<PostWithAuthor[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(username)")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}
