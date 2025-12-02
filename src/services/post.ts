import { supabase } from "../lib/supabase";
import type { PostWithAuthor } from "../types/post";

interface getPostsProps {
  page: number;
}

export const PAGE_SIZE: number = 14;

export async function getPosts({ page }: getPostsProps) {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from("posts")
    .select("*, profiles(username)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    data: data as PostWithAuthor[],
    count,
  };
}

export async function getPost(id: string): Promise<PostWithAuthor> {
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(username)")
    .eq("id", id)
    .single();

  if (error) throw error;
  if (!data) throw new Error("Post not found");

  return data;
}
