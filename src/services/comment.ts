import { supabase } from "@/lib/supabase";
import type { CommentWithAutor } from "@/types/comment";

export interface GetCommentsParams {
  postId: string;
}

export interface CreateCommentData {
  postId: string;
  authorId: string;
  content: string;
}

export interface DeleteCommentParams {
  commentId: string;
}

export interface UpdateCommentData {
  commentId: string;
  content: string;
}

export async function getComments(
  params: GetCommentsParams,
): Promise<CommentWithAutor[]> {
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
        *,
        author:profiles (
          username
        )
      `,
    )
    .eq("post_id", params.postId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createComment(data: CreateCommentData) {
  const { data: comment, error } = await supabase
    .from("comments")
    .insert([
      { post_id: data.postId, author_id: data.authorId, content: data.content },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return comment;
}

export async function deleteComment(params: DeleteCommentParams) {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", params.commentId);

  if (error) {
    throw new Error(error.message || "Falha ao excluir comentário");
  }
}

export async function updateComment(data: UpdateCommentData) {
  const { data: comment, error } = await supabase
    .from("comments")
    .update({ content: data.content })
    .eq("id", data.commentId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return comment;
}
