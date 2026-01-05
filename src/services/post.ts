import type { CreatePostData } from "@/schemas/post";
import { supabase } from "../lib/supabase";
import type { PostWithAuthor } from "../types/post";

interface getPostsProps {
  page: number;
}

export const PAGE_SIZE: number = 14;
export const PROFILE_POSTS_PAGE_SIZE: number = 3;

export async function getPosts({ page }: getPostsProps) {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from("posts")
    .select("*, profiles(username, bio)", { count: "exact" })
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
    .select("*, profiles(username, bio)")
    .eq("id", id)
    .single();

  if (error) throw error;
  if (!data) throw new Error("Post not found");

  return data;
}

interface getPostsByAuthorProps {
  authorId: string;
  page: number;
}

export async function getPostsByAuthor({
  authorId,
  page,
}: getPostsByAuthorProps) {
  const from = (page - 1) * PROFILE_POSTS_PAGE_SIZE;
  const to = from + PROFILE_POSTS_PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from("posts")
    .select("*, profiles(username, bio)", { count: "exact" })
    .eq("author_id", authorId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  if (!data) throw new Error("Post not found");

  return {
    data: data as PostWithAuthor[],
    count,
  };
}

export async function createPost(postData: CreatePostData) {
  const { data, error } = await supabase
    .from("posts")
    .insert([postData])
    .select();

  if (error) {
    throw new Error(error.message || "Falha ao criar a postagem.");
  }

  return data;
}

export async function deletePost(postId: string) {
  const { error } = await supabase.from("posts").delete().eq("id", postId);

  if (error) {
    throw new Error(error.message || "Falha ao deletar a postagem");
  }
}
