import type { CreatePostData } from "@/schemas/post";
import { supabase } from "../lib/supabase";
import type { PostWithAuthor } from "../types/post";

export interface GetPostsParams {
  page: number;
}

export interface GetPostByIdParams {
  id: string;
}

export interface GetPostsByAuthorParams {
  authorId: string;
  page: number;
}

export interface GetPostsBySearchParams {
  search: string;
}

export interface DeletePostParams {
  postId: string;
}

export interface UpdatePostData {
  postId: string;
  title: string;
  content: string;
}

export const PAGE_SIZE: number = 14;
export const PROFILE_POSTS_PAGE_SIZE: number = 3;

export async function getPosts(params: GetPostsParams) {
  const from = (params.page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from("posts")
    .select("*, profiles(username, bio, display_name, avatar_url)", {
      count: "exact",
    })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    data: data as PostWithAuthor[],
    count,
  };
}

export async function getPostById(
  params: GetPostByIdParams,
): Promise<PostWithAuthor> {
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(username, bio, display_name, avatar_url)")
    .eq("id", params.id)
    .single();

  if (error) throw error;
  if (!data) throw new Error("Post not found");

  return data;
}

export async function getPostsByAuthor(params: GetPostsByAuthorParams) {
  const from = (params.page - 1) * PROFILE_POSTS_PAGE_SIZE;
  const to = from + PROFILE_POSTS_PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from("posts")
    .select("*, profiles(username, bio, display_name, avatar_url)", {
      count: "exact",
    })
    .eq("author_id", params.authorId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  if (!data) throw new Error("Post not found");

  return {
    data: data as PostWithAuthor[],
    count,
  };
}

export async function getPostsBySearch(
  params: GetPostsBySearchParams,
): Promise<PostWithAuthor[]> {
  let query = supabase
    .from("posts")
    .select("*, profiles(username, bio, display_name, avatar_url)")
    .order("created_at", { ascending: false });

  if (params.search) {
    query = query.ilike("title", `%${params.search}%`);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
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

export async function deletePost(params: DeletePostParams) {
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", params.postId);

  if (error) {
    throw new Error(error.message || "Falha ao deletar a postagem");
  }
}

export async function updatePost(data: UpdatePostData) {
  const { data: post, error } = await supabase
    .from("posts")
    .update({
      title: data.title,
      content: data.content,
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.postId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return post;
}
